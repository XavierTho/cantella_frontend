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
        <title>Profiles</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(to bottom, #1a2a6c, #b21f1f, #fdbb2d);
                color: #f9f9f9;
                text-align: center;
            }
            .container {
                max-width: 1000px;
                margin: 0 auto;
                padding: 20px;
            }
            h1 {
                font-size: 2.5em;
                margin-bottom: 20px;
                color: #fff;
            }
            .button-container {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin: 30px 0;
            }
            .button-container button {
                padding: 15px 30px;
                font-size: 1.1em;
                color: #fff;
                background: transparent;
                border: 2px solid #fff;
                border-radius: 10px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .button-container button:hover {
                background: #fff;
                color: #333;
                transform: scale(1.05);
            }
            .profile-container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: center;
            }
            .profile {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 15px;
                padding: 20px;
                width: 300px;
                text-align: left;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s;
            }
            .profile:hover {
                transform: scale(1.05);
            }
            .profile-id {
                font-size: 0.9em;
                color: #ddd;
                text-align: right;
            }
            .form-container {
                display: none;
                margin: 20px auto;
                padding: 20px;
                max-width: 600px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
            }
            form label {
                display: block;
                margin: 10px 0 5px;
                color: #fff;
            }
            form input {
                width: 100%;
                padding: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
                margin-bottom: 15px;
            }
            form button {
                padding: 10px 20px;
                background: #fff;
                color: #333;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                transition: background 0.3s;
            }
            form button:hover {
                background: #eee;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Student Social Media - Profiles</h1>
            <div class="button-container">
                <button onclick="toggleForm('create-profile-form-container')">Create New Profile</button>
                <button onclick="toggleForm('edit-container')">Edit / Delete Profile</button>
            </div>
            <div class="profile-container" id="profile-container">
                <!-- Profiles will be dynamically added here -->
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
                    <button type="submit">Submit</button>
                </form>
            </div>
            <div class="form-container" id="edit-container">
                <h2>Edit Profile</h2>
                <form id="edit-profile-form">
                    <label for="edit-id">Profile ID:</label>
                    <input type="number" id="edit-id" name="edit-id" required>
                    <label for="edit-name">Name:</label>
                    <input type="text" id="edit-name" name="edit-name">
                    <label for="edit-classes">Classes (comma-separated):</label>
                    <input type="text" id="edit-classes" name="edit-classes">
                    <label for="edit-favorite_class">Favorite Class:</label>
                    <input type="text" id="edit-favorite_class" name="edit-favorite_class">
                    <label for="edit-grade">Grade:</label>
                    <input type="text" id="edit-grade" name="edit-grade">
                    <button type="button" onclick="submitEditProfile()">Save Changes</button>
                </form>
                <h2>Delete Profile</h2>
                <form id="delete-profile-form">
                    <label for="delete-id">Profile ID:</label>
                    <input type="number" id="delete-id" name="delete-id" required>
                    <button type="button" onclick="deleteProfile()">Delete</button>
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

            async function submitEditProfile() {
                const id = document.getElementById('edit-id').value;
                const name = document.getElementById('edit-name').value;
                const classes = document.getElementById('edit-classes').value.split(',').map(cls => cls.trim());
                const favorite_class = document.getElementById('edit-favorite_class').value;
                const grade = document.getElementById('edit-grade').value;

                const data = { id: parseInt(id, 10), name, classes, favorite_class, grade };

                await fetch(API_BASE, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                });

                loadProfiles();
                toggleForm('edit-container');
            }

            async function deleteProfile() {
                const id = document.getElementById('delete-id').value;

                await fetch(API_BASE, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: parseInt(id, 10) }),
                });

                loadProfiles();
                toggleForm('edit-container');
            }

            loadProfiles();
        </script>
    </body>
</html>
