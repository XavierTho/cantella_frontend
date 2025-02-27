---
layout: base
title: Study Log
description: Log your study hours
permalink: naviagtion/log
---
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Study Log</title>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/sweetalert2@11/dist/sweetalert2.min.css">
        <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
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
                max-width: 900px;
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
            .log-container ul {
                list-style-type: none;
                padding: 0;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                gap: 20px;
            }
            .log-container li {
                background: rgba(255, 255, 255, 0.15);
                padding: 20px;
                border-radius: 15px;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.2);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .log-container li:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
            }
            .log-container li div {
                margin-bottom: 12px;
                font-size: 0.95rem;
            }
            .log-container li strong {
                color: #a8d0ff;
                font-weight: 500;
            }
            .button-group {
                display: flex;
                gap: 10px;
                margin-top: 10px;
            }
            .edit-btn, .delete-btn, .save-btn {
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
            .save-btn {
                background-color: rgba(33, 150, 243, 0.2);
                color: #2196F3;
            }
            .edit-btn:hover, .delete-btn:hover, .save-btn:hover {
                transform: translateY(-2px);
            }
            .fa-pencil-alt, .fa-trash-alt {
                font-size: 1rem;
            }
            .form-container {
                background: rgba(255, 255, 255, 0.15);
                padding: 30px;
                border-radius: 15px;
                margin-top: 30px;
                backdrop-filter: blur(5px);
                border: 1px solid rgba(255, 255, 255, 0.2);
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
            .form-container input, 
            .form-container textarea {
                width: 100%;
                padding: 12px;
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                background: rgba(255, 255, 255, 0.1);
                color: white;
                font-size: 1rem;
                transition: all 0.3s ease;
            }
            .form-container input:focus, 
            .form-container textarea:focus {
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
            .error {
                color: #ff4757;
                font-size: 0.9rem;
                margin-top: 5px;
            }
            @media (max-width: 768px) {
                .container {
                    padding: 20px;
                    margin: 10px;
                }
                .log-container ul {
                    grid-template-columns: 1fr;
                }
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
            .edit-input:focus {
                outline: none;
                border-color: #4CAF50;
                background: rgba(255, 255, 255, 0.15);
            }
            textarea.edit-input {
                min-height: 60px;
                resize: vertical;
            }
            .save-btn {
                background-color: #4CAF50;
                color: white;
                padding: 8px 15px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                text-transform: uppercase;
                font-size: 0.8rem;
                letter-spacing: 0.5px;
                transition: all 0.3s ease;
            }
            .save-btn:hover {
                background-color: #43a047;
                transform: translateY(-2px);
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

            .swal2-confirm:hover {
                background: #ff7043 !important;
            }

            .swal2-cancel:hover {
                background: #ffab91 !important;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>Study Log</h1>
            <div class="log-container" id="log-container">
                <h2>Your Study Logs</h2>
                <ul id="study-log"></ul>
            </div>
            <div class="form-container">
                <h2>Add New Study Log</h2>
                <form id="study-log-form">
                    <label for="subject">Subject:</label>
                    <input type="text" id="subject" name="subject" required>
                    <label for="hours">Hours Studied:</label>
                    <input type="number" id="hours" name="hours" required>
                    <label for="notes">Notes:</label>
                    <textarea id="notes" name="notes"></textarea>
                    <button type="submit">Add Log</button>
                    <p id="form-messages" class="hidden"></p>
                </form>
            </div>
        </div>
        <footer>
            <p style="text-align: center;">Made by Armaghan Zarak 🍈</p>
        </footer>
<script type="module">
    import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
    // Add this at the top of your script section
    const deleteSound = new Audio('{{site.baseurl}}/images/sounds/delete.mp3');
    // Make functions globally available
    window.deleteLog = async function(logId) {
        const result = await Swal.fire({
            title: 'Delete this log?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it'
        });
        if (result.isConfirmed) {
            try {
                const response = await fetch(`${pythonURI}/api/studylognew`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id: logId }),
                    credentials: 'include',
                });
                if (response.ok) {
                    deleteSound.play();
                    await Swal.fire('Deleted!', 'Your log has been deleted.', 'success');
                    loadStudyLogs();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
    window.editLog = async function(logId) {
        // Get the existing log element to edit
        const logElement = document.querySelector(`li[data-id="${logId}"]`);
        const subjectSpan = logElement.querySelector('[data-field="subject"]');
        const hoursSpan = logElement.querySelector('[data-field="hours"]');
        const notesSpan = logElement.querySelector('[data-field="notes"]');
        // Create input fields
        const subjectInput = document.createElement('input');
        subjectInput.type = 'text';
        subjectInput.value = subjectSpan.textContent;
        subjectInput.className = 'edit-input';
        const hoursInput = document.createElement('input');
        hoursInput.type = 'number';
        hoursInput.step = '0.1';
        hoursInput.value = hoursSpan.textContent;
        hoursInput.className = 'edit-input';
        const notesInput = document.createElement('textarea');
        notesInput.value = notesSpan.textContent;
        notesInput.className = 'edit-input';
        // Replace spans with inputs
        subjectSpan.replaceWith(subjectInput);
        hoursSpan.replaceWith(hoursInput);
        notesSpan.replaceWith(notesInput);
        // Create save button with icon
        const saveButton = document.createElement('button');
        saveButton.innerHTML = '<i class="fas fa-save"></i>';
        saveButton.className = 'save-btn';
        // Replace edit button with save button
        const editButton = logElement.querySelector('.edit-btn');
        editButton.replaceWith(saveButton);
        // Add save functionality
        saveButton.onclick = async function() {
            const data = {
                id: logId,
                subject: subjectInput.value,
                hours_studied: parseFloat(hoursInput.value),
                notes: notesInput.value
            };
            try {
                const response = await fetch(`${pythonURI}/api/studylognew`, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data),
                    credentials: 'include',
                });
                if (response.ok) {
                    await Swal.fire({
                        title: 'Success!',
                        text: 'Study log updated successfully!',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    loadStudyLogs();
                }
            } catch (error) {
                console.error('Error updating study log:', error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to update study log.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        };
    }
    document.getElementById('study-log-form').addEventListener('submit', async function(event) {
        event.preventDefault();
        const formMessages = document.getElementById('form-messages');
        const subject = document.getElementById('subject').value.trim();
        const hours = document.getElementById('hours').value.trim();
        const notes = document.getElementById('notes').value.trim();
        if (!subject || !hours) {
            formMessages.textContent = 'Subject and hours are required!';
            formMessages.className = 'error';
            formMessages.classList.remove('hidden');
            return;
        }
        const data = {
            user_id: 1,
            subject,
            hours_studied: parseFloat(hours),
            notes
        };
        try {
            const response = await fetch(`${pythonURI}/api/studylognew`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
                credentials: 'include',
            });
            if (response.ok) {
                formMessages.textContent = 'Study log added successfully!';
                formMessages.className = '';
                formMessages.classList.remove('hidden');
                loadStudyLogs();
            } else {
                formMessages.textContent = 'Failed to add study log.';
                formMessages.className = 'error';
                formMessages.classList.remove('hidden');
            }
        } catch (error) {
            formMessages.textContent = 'Error adding study log.';
            formMessages.className = 'error';
            formMessages.classList.remove('hidden');
        }
    });
    async function loadStudyLogs() {
        try {
            const response = await fetch(`${pythonURI}/api/studylognew`, {
                credentials: 'include',
            });
            if (response.ok) {
                const data = await response.json();
                const studyLogList = document.getElementById('study-log');
                studyLogList.innerHTML = '';
                data.forEach(log => {
                    const listItem = document.createElement('li');
                    listItem.setAttribute('data-id', log.id);
                    listItem.innerHTML = `
                        <div><strong>Subject:</strong> <span data-field="subject">${log.subject}</span></div>
                        <div><strong>Hours Studied:</strong> <span data-field="hours">${log.hours_studied}</span></div>
                        <div><strong>Notes:</strong> <span data-field="notes">${log.notes || 'No notes'}</span></div>
                        <div><strong>Time:</strong> ${new Date(new Date(log.date || log.timestamp).getTime() - 8 * 60 * 60 * 1000).toLocaleString()}</div>
                        <div class="button-group">
                            <button class="edit-btn" onclick="editLog(${log.id})"><i class="fas fa-pencil-alt"></i></button>
                            <button class="delete-btn" onclick="deleteLog(${log.id})"><i class="fas fa-trash-alt"></i></button>
                        </div>
                    `;
                    studyLogList.appendChild(listItem);
                });
            } else {
                console.error('Failed to load study logs:', response.statusText);
            }
        } catch (error) {
            console.error('Error loading study logs:', error);
        }
    }
    // Load study logs on page load
    loadStudyLogs();
</script>