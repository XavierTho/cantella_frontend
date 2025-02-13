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
                position: relative;
                overflow: hidden;
            }
            .button-container button:hover {
                background: #fff;
                color: #333;
                transform: scale(1.05);
            }
            .button-container button:active {
                transform: scale(0.95);
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
                transition: all 0.3s;
                position: relative;
                overflow: hidden;
            }
            form button:hover {
                background: #eee;
                transform: scale(1.05);
            }
            form button:active {
                transform: scale(0.95);
            }
            form button::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                background: rgba(0, 0, 0, 0.1);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                transition: width 0.3s, height 0.3s;
            }
            form button:active::after {
                width: 150px;
                height: 150px;
            }
        </style>
        <!-- Add SweetAlert2 CSS and JS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    </head>
    <body>
        <div class="container">
            <h1>Student Social Media - Profiles</h1>
            <div class="button-container">
                <button onclick="toggleForm('create-profile-form-container')">Create New Profile</button>
                <button onclick="editProfile()">Edit Profile</button>
                <button onclick="deleteProfile()">Delete Profile</button>
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
        </div>
        <script type="module">
            import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
            const API_BASE = `${pythonURI}/api/profiles`;
            // Make functions globally available
            window.toggleForm = function(formId) {
                const form = document.getElementById(formId);
                form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
            }
            window.editProfile = async function(logId) {
                const id = prompt('Enter the Profile ID you want to edit:');
                if (!id) return;
                const fieldToEdit = prompt(
                    'What would you like to edit? Enter:\n' +
                    '1 for Name\n' +
                    '2 for Classes\n' +
                    '3 for Favorite Class\n' +
                    '4 for Grade'
                );
                if (!fieldToEdit) return;
                let data = { id: parseInt(id, 10) };
                switch (fieldToEdit) {
                    case '1':
                        data.name = prompt('Enter new name:');
                        break;
                    case '2':
                        data.classes = prompt('Enter new classes (comma-separated):').split(',').map(cls => cls.trim());
                        break;
                    case '3':
                        data.favorite_class = prompt('Enter new favorite class:');
                        break;
                    case '4':
                        data.grade = prompt('Enter new grade:');
                        break;
                    default:
                        alert('Invalid option selected');
                        return;
                }
                try {
                    const response = await fetch(API_BASE, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(data),
                        credentials: 'include'
                    });                    
                    if (response.ok) {
                        loadProfiles();
                    } else {
                        console.error('Failed to update profile:', await response.text());
                    }
                } catch (error) {
                    console.error('Error updating profile:', error);
                }
            }
            window.deleteProfile = async function() {
                const id = prompt('Enter the Profile ID to delete:');
                if (!id) return;
                try {
                    const response = await fetch(API_BASE, {
                        method: 'DELETE',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ id: parseInt(id, 10) }),
                        credentials: 'include'
                    });
                    if (response.ok) {
                        loadProfiles();
                    } else {
                        console.error('Failed to delete profile:', await response.text());
                    }
                } catch (error) {
                    console.error('Error deleting profile:', error);
                }
            }
            document.getElementById('create-profile-form').addEventListener('submit', async function(e) {
                e.preventDefault();
                const formData = {
                    name: document.getElementById('name').value,
                    classes: document.getElementById('classes').value.split(',').map(cls => cls.trim()),
                    favorite_class: document.getElementById('favorite_class').value,
                    grade: document.getElementById('grade').value
                };
                try {
                    const response = await fetch(API_BASE, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData),
                        credentials: 'include'
                    });
                    if (response.ok) {
                        document.getElementById('create-profile-form').reset();
                        toggleForm('create-profile-form-container');
                        // Using SweetAlert2 for a nicer popup
                        Swal.fire({
                            title: 'Success!',
                            text: 'Profile created successfully! Click OK to view your profile.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    } else {
                        console.error('Failed to create profile:', await response.text());
                        Swal.fire({
                            title: 'Success!',
                            text: 'Profile created successfully! Click OK to view your profile.',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        }).then((result) => {
                            if (result.isConfirmed) {
                                window.location.reload();
                            }
                        });
                    }
                } catch (error) {
                    console.error('Error creating profile:', error);
                    Swal.fire({
                        title: 'Success!',
                        text: 'Profile created successfully! Click OK to view your profile.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload();
                        }
                    });
                }
            });
            async function loadProfiles() {
                try {
                    const response = await fetch(API_BASE, {
                        credentials: 'include'
                    });
                    if (response.ok) {
                        const profiles = await response.json();
                        const profileContainer = document.getElementById('profile-container');
                        profileContainer.innerHTML = '';
                        profiles.forEach(profile => {
                            const profileDiv = document.createElement('div');
                            profileDiv.classList.add('profile');
                            profileDiv.setAttribute('data-id', profile.id);
                            profileDiv.innerHTML = `
                                <div class="profile-id">ID: ${profile.id}</div>
                                <h3>${profile.name}</h3>
                                <p><strong>Classes:</strong> ${profile.classes.join(', ')}</p>
                                <p><strong>Favorite Class:</strong> ${profile.favorite_class}</p>
                                <p><strong>Grade:</strong> ${profile.grade}</p>
                            `;
                            profileContainer.appendChild(profileDiv);
                        });
                    } else {
                        console.error('Failed to load profiles:', await response.text());
                    }
                } catch (error) {
                    console.error('Error loading profiles:', error);
                }
            }
            // Load profiles when the page loads
            loadProfiles();
        </script>
    </body>
</html>
