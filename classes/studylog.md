---
layout: base
title: Study Log
description: Log your study hours
permalink: classes/log
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
                font-family: 'Arial', sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(to bottom, #ff9966, #ff5e62);
                color: #f9f9f9;
                min-height: 100vh;
            }
            .container {
                max-width: 1000px;
                margin: 0 auto;
                padding: 20px;
            }
            h1, h2 {
                text-align: center;
                color: #ffffff;
                margin-bottom: 30px;
                font-weight: 600;
            }
            #study-log {
                list-style: none;
                padding: 0;
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                justify-content: center;
            }
            #study-log li {
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 15px;
                padding: 20px;
                width: 300px;
                backdrop-filter: blur(10px);
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
                transition: transform 0.3s;
            }
            #study-log li:hover {
                transform: scale(1.05);
            }
            .button-group {
                display: flex;
                justify-content: flex-end;
                gap: 10px;
                margin-top: 15px;
            }
            .edit-btn, .delete-btn {
                padding: 8px;
                border: none;
                border-radius: 50%;
                cursor: pointer;
                transition: all 0.3s;
                width: 35px;
                height: 35px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .edit-btn {
                background: rgba(255, 255, 255, 0.2);
                color: #fff;
            }
            .delete-btn {
                background: rgba(255, 87, 87, 0.2);
                color: #fff;
            }
            .edit-btn:hover, .delete-btn:hover {
                transform: translateY(-2px);
                background: rgba(255, 255, 255, 0.3);
            }
            .edit-input {
                width: 100%;
                padding: 8px;
                margin: 4px 0;
                background: rgba(255, 255, 255, 0.1);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: white;
                font-size: 1rem;
            }
            .edit-input:focus {
                outline: none;
                border-color: #ff9966;
                background: rgba(255, 255, 255, 0.15);
            }
            /* Custom SweetAlert2 styling */
            .swal2-popup {
                background: rgba(255, 255, 255, 0.95) !important;
                backdrop-filter: blur(10px) !important;
                border-radius: 15px !important;
            }
            .swal2-title {
                color: #ff5e62 !important;
            }
            .swal2-confirm {
                background: #ff9966 !important;
                border-radius: 8px !important;
            }
            .swal2-confirm:hover {
                background: #ff5e62 !important;
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
            title: 'Delete Study Log?',
            text: 'Are you sure you want to delete this log?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            background: 'rgba(255, 255, 255, 0.95)',
            backdrop: `
                rgba(255, 153, 102, 0.4)
                url("{{site.baseurl}}/assets/sounds/delete.mp3")
                left top
                no-repeat
            `
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
                    await Swal.fire({
                        title: 'Deleted!',
                        text: 'Your study log has been deleted.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                    loadStudyLogs();
                }
            } catch (error) {
                console.error('Error deleting study log:', error);
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
        // Create save button
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
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
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                    credentials: 'include',
                });
                if (response.ok) {
                    // Update the display with new values
                    const newSubjectSpan = document.createElement('span');
                    newSubjectSpan.textContent = data.subject;
                    newSubjectSpan.setAttribute('data-field', 'subject');
                    const newHoursSpan = document.createElement('span');
                    newHoursSpan.textContent = data.hours_studied;
                    newHoursSpan.setAttribute('data-field', 'hours');
                    const newNotesSpan = document.createElement('span');
                    newNotesSpan.textContent = data.notes;
                    newNotesSpan.setAttribute('data-field', 'notes');
                    // Replace inputs with new spans
                    subjectInput.replaceWith(newSubjectSpan);
                    hoursInput.replaceWith(newHoursSpan);
                    notesInput.replaceWith(newNotesSpan);
                    // Restore edit button
                    const newEditButton = document.createElement('button');
                    newEditButton.textContent = 'Edit';
                    newEditButton.className = 'edit-btn';
                    newEditButton.onclick = () => editLog(logId);
                    saveButton.replaceWith(newEditButton);
                    // Show success message
                    await showSuccessMessage();
                }
            } catch (error) {
                console.error('Error updating study log:', error);
                alert('Error updating study log. Please try again.');
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
                        <div><strong>Time:</strong> ${new Date(log.date || log.timestamp).toLocaleString()}</div>
                        <div class="button-group">
                            <button class="edit-btn" onclick="editLog(${log.id})">
                                <i class="fas fa-pencil-alt"></i>
                            </button>
                            <button class="delete-btn" onclick="deleteLog(${log.id})">
                                <i class="fas fa-trash-alt"></i>
                            </button>
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
    // Update success message for editing
    const showSuccessMessage = async () => {
        await Swal.fire({
            title: 'Success!',
            text: 'Study log updated successfully!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
            background: 'rgba(255, 255, 255, 0.95)',
            backdrop: 'rgba(255, 153, 102, 0.4)'
        });
    }
</script>