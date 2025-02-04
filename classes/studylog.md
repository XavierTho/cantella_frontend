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
                margin-top: 15px;
            }
            .log-container li button {
                flex: 1;
                padding: 8px 15px;
                border: none;
                border-radius: 8px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                text-transform: uppercase;
                font-size: 0.8rem;
                letter-spacing: 0.5px;
            }
            .edit-btn {
                background-color: #4CAF50;
                color: white;
            }
            .delete-btn {
                background-color: #ff4757;
                color: white;
            }
            .edit-btn:hover {
                background-color: #43a047;
            }
            .delete-btn:hover {
                background-color: #ff3748;
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
    // Make functions globally available
    window.deleteLog = async function(logId) {
        try {
            const response = await fetch(`${pythonURI}/api/studylognew`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: logId }),
                credentials: 'include',
            });
            if (response.ok) {
                loadStudyLogs();
            } else {
                console.error('Failed to delete study log:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting study log:', error);
        }
    }
    window.editLog = async function(logId) {
        // Get the existing log element to pre-fill current values
        const logElement = document.querySelector(`li[data-id="${logId}"]`);
        const currentSubject = logElement.querySelector('[data-field="subject"]').textContent;
        const currentHours = logElement.querySelector('[data-field="hours"]').textContent;
        const currentNotes = logElement.querySelector('[data-field="notes"]').textContent;
        // Ask user which field to edit
        const fieldToEdit = prompt(
            'What would you like to edit? Enter:\n' +
            '1 for Subject\n' +
            '2 for Hours\n' +
            '3 for Notes'
        );
        if (!fieldToEdit) return;
        let data = { id: logId };
        switch (fieldToEdit) {
            case '1':
                const newSubject = prompt('Enter new subject:', currentSubject);
                if (!newSubject) return;
                data.subject = newSubject;
                break;
            case '2':
                const newHours = prompt('Enter new hours:', currentHours);
                if (!newHours) return;
                data.hours_studied = parseFloat(newHours);
                break;
            case '3':
                const newNotes = prompt('Enter new notes:', currentNotes);
                if (newNotes === null) return; // Allow empty notes, but not cancelled prompt
                data.notes = newNotes;
                break;
            default:
                alert('Invalid option selected');
                return;
        }
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
                loadStudyLogs();
            } else {
                console.error('Failed to update study log:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating study log:', error);
        }
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
                            <button class="edit-btn" onclick="editLog(${log.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteLog(${log.id})">Delete</button>
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