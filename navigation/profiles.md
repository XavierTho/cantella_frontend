---
layout: base
title: Profiles
description: Manage user profiles
permalink: profiles/manage
---

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Profile Management</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(to bottom, #1e3c72, #2a5298);
                color: #f9f9f9;
            }
            .container {
                max-width: 1000px;
                margin: 0 auto;
                padding: 20px;
            }
            h1 {
                text-align: center;
                margin-bottom: 30px;
                font-size: 2.5em;
            }
            .profile-container {
                display: flex;
                flex-wrap: wrap;
                gap: 30px;
                margin-top: 20px;
                justify-content: center;
            }
            .profile {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.3);
                border-radius: 15px;
                padding: 20px;
                width: 300px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                position: relative;
                transition: transform 0.2s;
            }
            .profile:hover {
                transform: scale(1.05);
            }
            .profile-id {
                position: absolute;
                top: 10px;
                right: 10px;
                font-size: 0.9em;
                color: #aaa;
            }
            .profile h3 {
                margin: 10px 0;
                color: #fff;
            }
            .profile p {
                margin: 5px 0;
                font-size: 1em;
                color: #ddd;
            }
            .button-container {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-top: 40px;
            }
            .button-container button {
                padding: 10px 20px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 1.1em;
                cursor: pointer;
                transition: background 0.2s;
            }
            .button-container button:hover {
                background: #45A049;
            }
            .form-container {
                display: none;
                margin-top: 20px;
                background: rgba(255, 255, 255, 0.1);
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
            }
            .form-container h2 {
                text-align: center;
                margin-bottom: 20px;
                color: white;
            }
            form {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            form label {
                font-size: 1em;
                color: #ccc;
            }
            form input {
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                font-size: 1em;
            }
            form button {
                padding: 10px;
                background: #4CAF50;
                color: white;
                border: none;
                border-radius: 5px;
                font-size: 1em;
                cursor: pointer;
            }
            form button:hover {
                background: #45A049;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Profile Management</h1>

            <div class="profile-container" id="profile-container">
                <!-- Profiles will be loaded dynamically here -->
            </div>

            <div class="button-container">
                <button onclick="toggleForm('create-profile-form-container')">Create New Profile</button>
                <button onclick="toggleForm('edit-delete-form-container')">Edit / Delete Profile</button>
            </div>

            <div class="form-container" id="create-profile-form-container">
                <h2>Create New Profile</h2>
                <form id="create-profile-form">
                    <label for="name">Name:</label>
                    <input type="text" id="name" name="name" required>
                    <label for="classes">Classes (comma-separated):</label>
                    <input type="text" id="classes" name="classes" required>
                    <label for="favorite_class">Favorite Class:</label>
                    <input type="text" id="favorite_class" name="favorite_class" required>
                    <label for="grade">Grade:</label>
                    <input type="text" id="grade" name="grade" required>
                    <button type="submit">Create Profile</button>
                </form>
            </div>

            <div class="form-container" id="edit-delete-form-container">
                <h2>Edit / Delete Profile</h2>
                <form id="edit-delete-form">
                    <label for="profile-id">Profile ID:</label>
                    <input type="number" id="profile-id" name="profile-id" required>
                    <button type="button" onclick="editProfile()">Edit Profile</button>
                    <button type="button" onclick="deleteProfile()">Delete Profile</button>
                </form>
            </div>
        </div>

        <script>
            const API_BASE = 'http://127.0.0.1:8887/api/profiles';

            function toggleForm(formId) {
                const form = document.getElementById(formId);
                form.style.display = form.style.display === 'block' ? 'none' : 'block';
            }

            async function loadProfiles() {
                const response = await fetch(API_BASE);
                const profiles = await response.json();
                const profileContainer = document.getElementById('profile-container');
                profileContainer.innerHTML = '';

                profiles.forEach(profile => {
                    const profileDiv = document.createElement('div');
                    profileDiv.classList.add('profile');
                    profileDiv.innerHTML = `
                        <div class="profile-id">ID: ${profile.id}</div>
                        <h3>${profile.name}</h3>
                        <p><strong>Classes:</strong> ${profile.classes.join(', ')}</p>
                        <p><strong>Favorite Class:</strong> ${profile.favorite_class}</p>
                        <p><strong>Grade:</strong> ${profile.grade}</p>
                    `;
                    profileContainer.appendChild(profileDiv);
                });
            }

            document.getElementById('create-profile-form').addEventListener('submit', async (event) => {
                event.preventDefault();

                const name = document.getElementById('name').value;
                const classes = document.getElementById('classes').value.split(',').map(cls => cls.trim());
                const favorite_class = document.getElementById('favorite_class').value;
                const grade = document.getElementById('grade').value;

                const data = { name, classes, favorite_class, grade };

                await fetch(API_BASE, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                loadProfiles();
                document.getElementById('create-profile-form').reset();
                toggleForm('create-profile-form-container');
            });

            async function editProfile() {
                const id = document.getElementById('profile-id').value;
                const name = prompt('Enter new name:');
                const classes = prompt('Enter new classes (comma-separated):');
                const favorite_class = prompt('Enter new favorite class:');
                const grade = prompt('Enter new grade:');

                if (!name || !classes || !favorite_class || !grade) {
                    alert('All fields are required!');
                    return;
                }

                const data = {
                    id: parseInt(id, 10),
                    name,
                    classes: classes.split(',').map(cls => cls.trim()),
                    favorite_class,
                    grade,
                };

                await fetch(API_BASE, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });

                loadProfiles();
                toggleForm('edit-delete-form-container');
            }

            async function deleteProfile() {
                const id = document.getElementById('profile-id').value;

                await fetch(API_BASE, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: parseInt(id, 10) }),
                });

                loadProfiles();
                toggleForm('edit-delete-form-container');
            }

            loadProfiles();
        </script>
    </body>
</html>
