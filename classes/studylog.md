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
                font-family: 'Verdana', sans-serif;
                margin: 0;
                padding: 20px;
                background: linear-gradient(to bottom, #141e30, #243b55);
                color: #eeeeee;
            }
            .container {
                max-width: 800px;
                margin: 0 auto;
                padding: 20px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 10px;
            }
            h1, h2 {
                text-align: center;
                color: #ffffff;
            }
            .log-container ul {
                list-style-type: none;
                padding: 0;
            }
            .log-container li {
                background: rgba(255, 255, 255, 0.2);
                margin: 10px 0;
                padding: 15px;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: flex-start;
            }
            .log-container li div {
                margin-bottom: 10px;
            }
            .log-container li button {
                background-color: #ff4c4c;
                color: white;
                padding: 5px 10px;
                margin: 5px;
                border: none;
                border-radius: 5px;
                cursor: pointer;
            }
            .log-container li button:hover {
                background-color: #ff1c1c;
            }
            .form-container {
                margin-top: 20px;
            }
            .form-container form {
                display: flex;
                flex-direction: column;
            }
            .form-container label {
                margin: 10px 0 5px;
            }
            .form-container input, .form-container textarea, .form-container button {
                padding: 10px;
                margin-bottom: 10px;
                border: none;
                border-radius: 5px;
            }
            .form-container button {
                background-color: #4CAF50;
                color: white;
                cursor: pointer;
            }
            .form-container button:hover {
                background-color: #45a049;
            }
            .error {
                color: red;
            }
            .hidden {
                display: none;
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
        <script>
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
                    user_id: 1, // Replace with actual user ID
                    subject,
                    hours_studied: parseFloat(hours),
                    notes
                };
                try {
                    const response = await fetch('http://127.0.0.1:8887/api/studylognew', {
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
                    const response = await fetch('http://127.0.0.1:8887/api/studylognew', {
                        credentials: 'include',
                    });
                    if (response.ok) {
                        const data = await response.json();
                        const studyLogList = document.getElementById('study-log');
                        studyLogList.innerHTML = '';
                        data.forEach(log => {
                            const listItem = document.createElement('li');
                            listItem.innerHTML = `
                                <div><strong>Subject:</strong> ${log.subject}</div>
                                <div><strong>Hours Studied:</strong> ${log.hours_studied}</div>
                                <div><strong>Notes:</strong> ${log.notes}</div>
                                <div><strong>Time:</strong> ${new Date(log.timestamp).toLocaleString()}</div>
                                <div>
                                    <button onclick="deleteLog(${log.id})">Delete</button>
                                    <button onclick="editLog(${log.id})">Edit</button>
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
            async function deleteLog(logId) {
                try {
                    const response = await fetch(`http://127.0.0.1:8887/api/studylognew`, {
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
            async function editLog(logId) {
                const subject = prompt('Enter new subject:');
                const hours = prompt('Enter new hours studied:');
                const notes = prompt('Enter new notes:');
                if (!subject || !hours) {
                    alert('Subject and hours are required!');
                    return;
                }
                const data = {
                    id: logId,
                    subject,
                    hours_studied: parseFloat(hours),
                    notes
                };
                try {
                    const response = await fetch(`http://127.0.0.1:8887/api/studylognew`, {
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
            // Load study logs on page load
            loadStudyLogs();
        </script>
    </body>
</html>