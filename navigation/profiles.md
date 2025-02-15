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
                font-family: 'Inter', sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
                color: #ffffff;
                min-height: 100vh;
            }
            .container {
                max-width: 1000px;
                margin: 20px auto;
                padding: 30px;
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
                border-radius: 20px;
                box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
                border: 1px solid rgba(255, 255, 255, 0.18);
            }
            h1, h2 {
                text-align: center;
                color: #ffffff;
                margin-bottom: 30px;
                font-weight: 600;
            }
            .button-container {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin: 30px 0;
            }
            .button-container button {
                background-color: #4CAF50;
                color: white;
                padding: 12px 24px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.3s ease;
            }
            .button-container button:hover {
                background-color: #43a047;
                transform: translateY(-2px);
            }
            .profile-container {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                padding: 20px;
                max-width: 900px;
                margin: 0 auto;
                justify-content: center;
            }
            .profile {
                background: rgba(255, 255, 255, 0.15);
                padding: 20px;
                border-radius: 15px;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                width: calc(50% - 10px); /* 50% width minus half the gap */
                min-width: 280px;
                box-sizing: border-box;
            }
            .profile:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }
            .profile h3 {
                color: #a8d0ff;
                margin-bottom: 15px;
            }
            .profile p {
                margin: 10px 0;
                font-size: 0.95rem;
            }
            .profile strong {
                color: #a8d0ff;
            }
            .form-container {
                display: none; /* Hide by default */
                background: rgba(255, 255, 255, 0.15);
                padding: 30px;
                border-radius: 15px;
                margin: 30px auto;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                max-width: 600px;
            }
            .form-container form {
                display: grid;
                gap: 15px;
            }
            .form-container label {
                font-size: 0.9rem;
                color: #a8d0ff;
                margin-bottom: 5px;
            }
            .form-container input {
                width: 100%;
                padding: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            .form-container input:focus {
                outline: none;
                border-color: #4CAF50;
                background: rgba(255, 255, 255, 0.15);
            }
            .form-container button {
                background-color: #4CAF50;
                color: white;
                padding: 12px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                text-transform: uppercase;
                letter-spacing: 1px;
                transition: all 0.3s ease;
            }
            .form-container button:hover {
                background-color: #43a047;
                transform: translateY(-2px);
            }
            .edit-btn, .delete-btn {
                background: none;
                border: none;
                padding: 8px;
                cursor: pointer;
                border-radius: 50%;
                transition: all 0.3s ease;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .edit-btn {
                background-color: rgba(76, 175, 80, 0.2);
                color: #4CAF50;
            }
            .delete-btn {
                background-color: rgba(244, 67, 54, 0.2);
                color: #f44336;
            }
            .edit-btn:hover, .delete-btn:hover {
                transform: translateY(-2px);
            }
            .edit-input {
                width: 100%;
                padding: 8px;
                margin: 4px 0;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                font-size: 1rem;
            }
            /* Custom SweetAlert2 styling */
            .swal2-popup {
                background: rgba(255, 243, 224, 0.95) !important;
                border-radius: 15px !important;
            }
            .swal2-title {
                color: #ff7043 !important;
            }
            .swal2-html-container {
                color: #ff8a65 !important;
            }
            .swal2-confirm {
                background: #ff9966 !important;
                border-radius: 8px !important;
            }
            .swal2-cancel {
                background: #ffccbc !important;
                color: #ff7043 !important;
                border-radius: 8px !important;
            }
            .button-group {
                display: flex;
                gap: 10px;
                justify-content: flex-end;
                margin-top: 15px;
            }
            /* Update mobile view */
            @media (max-width: 768px) {
                .container {
                    padding: 20px;
                    margin: 10px;
                }
                .profile {
                    width: 100%;
                }
            }
        </style>
        <!-- Add SweetAlert2 CSS and JS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
    </head>
    <body>
        <div class="container">
            <h1>Student Profiles</h1>
            <div class="button-container">
                <button onclick="toggleForm('create-profile-form-container')">Create New Profile</button>
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
            const deleteSound = new Audio('{{site.baseurl}}/images/sounds/delete.mp3');

            // Make functions globally available
            window.toggleForm = function(formId) {
                const form = document.getElementById(formId);
                form.style.display = form.style.display === 'none' || form.style.display === '' ? 'block' : 'none';
            }
            window.editProfile = async function(profileId) {
                const profileElement = document.querySelector(`div[data-id="${profileId}"]`);
                const nameSpan = profileElement.querySelector('[data-field="name"]');
                const classesSpan = profileElement.querySelector('[data-field="classes"]');
                const favoriteClassSpan = profileElement.querySelector('[data-field="favorite_class"]');
                const gradeSpan = profileElement.querySelector('[data-field="grade"]');

                // Create input fields
                const nameInput = document.createElement('input');
                nameInput.type = 'text';
                nameInput.value = nameSpan.textContent;
                nameInput.className = 'edit-input';

                const classesInput = document.createElement('input');
                classesInput.type = 'text';
                classesInput.value = classesSpan.textContent;
                classesInput.className = 'edit-input';

                const favoriteClassInput = document.createElement('input');
                favoriteClassInput.type = 'text';
                favoriteClassInput.value = favoriteClassSpan.textContent;
                favoriteClassInput.className = 'edit-input';

                const gradeInput = document.createElement('input');
                gradeInput.type = 'text';
                gradeInput.value = gradeSpan.textContent;
                gradeInput.className = 'edit-input';

                // Replace spans with inputs
                nameSpan.replaceWith(nameInput);
                classesSpan.replaceWith(classesInput);
                favoriteClassSpan.replaceWith(favoriteClassInput);
                gradeSpan.replaceWith(gradeInput);

                // Create save button
                const saveButton = document.createElement('button');
                saveButton.innerHTML = '<i class="fas fa-save"></i>';
                saveButton.className = 'save-btn';

                // Replace edit button with save button
                const editButton = profileElement.querySelector('.edit-btn');
                editButton.replaceWith(saveButton);

                // Add save functionality
                saveButton.onclick = async function() {
                    const data = {
                        id: profileId,
                        name: nameInput.value,
                        classes: classesInput.value.split(',').map(cls => cls.trim()),
                        favorite_class: favoriteClassInput.value,
                        grade: gradeInput.value
                    };

                    try {
                        const response = await fetch(`${API_BASE}`, {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data),
                            credentials: 'include'
                        });

                        if (!response.ok) {
                            throw new Error('Failed to update profile');
                        }

                        // Update the display with new values
                        const newNameSpan = document.createElement('span');
                        newNameSpan.textContent = data.name;
                        newNameSpan.setAttribute('data-field', 'name');

                        const newClassesSpan = document.createElement('span');
                        newClassesSpan.textContent = data.classes.join(', ');
                        newClassesSpan.setAttribute('data-field', 'classes');

                        const newFavoriteClassSpan = document.createElement('span');
                        newFavoriteClassSpan.textContent = data.favorite_class;
                        newFavoriteClassSpan.setAttribute('data-field', 'favorite_class');

                        const newGradeSpan = document.createElement('span');
                        newGradeSpan.textContent = data.grade;
                        newGradeSpan.setAttribute('data-field', 'grade');

                        // Replace inputs with new spans
                        nameInput.replaceWith(newNameSpan);
                        classesInput.replaceWith(newClassesSpan);
                        favoriteClassInput.replaceWith(newFavoriteClassSpan);
                        gradeInput.replaceWith(newGradeSpan);

                        // Restore edit button
                        const newEditButton = document.createElement('button');
                        newEditButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
                        newEditButton.className = 'edit-btn';
                        newEditButton.onclick = () => editProfile(profileId);
                        saveButton.replaceWith(newEditButton);

                        // Show success message
                        await Swal.fire({
                            title: 'Success!',
                            text: 'Profile updated successfully!',
                            icon: 'success',
                            confirmButtonText: 'OK'
                        });

                    } catch (error) {
                        console.error('Error updating profile:', error);
                        await Swal.fire({
                            title: 'Error!',
                            text: 'Failed to update profile. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    }
                };
            }
            window.deleteProfile = async function(profileId) {
                try {
                    const result = await Swal.fire({
                        title: 'Are you sure?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    });

                    if (result.isConfirmed) {
                        const response = await fetch(`${API_BASE}`, {
                            method: 'DELETE',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ id: profileId }),
                            credentials: 'include'
                        });

                        if (response.ok) {
                            deleteSound.play();
                            // Remove the profile element from the DOM
                            const profileElement = document.querySelector(`div[data-id="${profileId}"]`);
                            if (profileElement) {
                                profileElement.remove();
                            }
                            Swal.fire(
                                'Deleted!',
                                'Your profile has been deleted.',
                                'success'
                            );
                        } else {
                            throw new Error('Failed to delete profile');
                        }
                    }
                } catch (error) {
                    console.error('Error deleting profile:', error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete profile. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
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
                                <h3><span data-field="name">${profile.name}</span></h3>
                                <p><strong>Classes:</strong> <span data-field="classes">${profile.classes.join(', ')}</span></p>
                                <p><strong>Favorite Class:</strong> <span data-field="favorite_class">${profile.favorite_class}</span></p>
                                <p><strong>Grade:</strong> <span data-field="grade">${profile.grade}</span></p>
                                <div class="button-group">
                                    <button class="edit-btn" onclick="editProfile(${profile.id})">
                                        <i class="fas fa-pencil-alt"></i>
                                    </button>
                                    <button class="delete-btn" onclick="deleteProfile(${profile.id})">
                                        <i class="fas fa-trash-alt"></i>
                                    </button>
                                </div>
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
