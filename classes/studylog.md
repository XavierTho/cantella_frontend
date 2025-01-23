---
layout: base
title: Study Log Tracker
description: Study Log Tracker
permalink: classes/log
---

<style>
  .study-log-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  .study-log {
    width: 300px;
    border-radius: 8px;
    padding: 15px;
    background-color: #f6f6f6;
    border: 2px solid #444;
    text-align: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    color: #000;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }

  .study-log:hover {
    transform: scale(1.05);
    background-color: #e0e0e0;
  }

  .hidden {
    display: none;
  }

  #study-log-form {
    margin-bottom: 20px;
  }

  #study-log-form input,
  #study-log-form textarea,
  #study-log-form button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #000;
  }

  #study-log-form button {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
    cursor: pointer;
  }

  #study-log-form button:hover {
    background-color: #45a049;
  }

  .error {
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
  }

  .success {
    color: green;
    font-size: 14px;
    margin-bottom: 10px;
  }
</style>

<div id="study-log-app">
  <h2>Study Log Tracker</h2>
  <button id="create-log-btn">Add Study Log</button>

  <div id="study-log-form-container" class="hidden">
    <form id="study-log-form">
      <div id="form-messages" class="hidden"></div>
      <input type="text" id="subject" placeholder="Subject" required>
      <input type="number" step="0.1" id="hours" placeholder="Hours Studied" required>
      <textarea id="notes" placeholder="Notes (Optional)"></textarea>
      <button type="submit">Submit Study Log</button>
    </form>
  </div>

  <div class="study-log-container" id="study-log-container"></div>
</div>

<script>
  const createLogBtn = document.getElementById('create-log-btn');
  const studyLogFormContainer = document.getElementById('study-log-form-container');
  const studyLogForm = document.getElementById('study-log-form');
  const studyLogContainer = document.getElementById('study-log-container');
  const formMessages = document.getElementById('form-messages');

  const userId = 1; // Replace this with actual dynamic user ID if needed

  createLogBtn.addEventListener('click', () => {
    studyLogFormContainer.classList.toggle('hidden');
    formMessages.classList.add('hidden');
  });

  studyLogForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formMessages.innerHTML = '';
    formMessages.classList.add('hidden');

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
      user_id: userId,
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
        formMessages.textContent = 'Study Log added successfully!';
        formMessages.className = 'success';
        formMessages.classList.remove('hidden');
        studyLogForm.reset();
        loadStudyLogs();
      } else {
        const errorText = await response.text();
        formMessages.textContent = `Failed to add study log: ${errorText}`;
        formMessages.className = 'error';
        formMessages.classList.remove('hidden');
      }
    } catch (error) {
      console.error('Error:', error);
      formMessages.textContent = 'An error occurred while adding the study log.';
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
        const logs = await response.json();
        displayStudyLogs(logs);
      } else {
        console.error('Failed to load study logs.');
        studyLogContainer.innerHTML = '<p>No study logs found.</p>';
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  function displayStudyLogs(logs) {
    studyLogContainer.innerHTML = '';
    if (logs.length === 0) {
      studyLogContainer.innerHTML = '<p>No study logs found.</p>';
      return;
    }

    logs.forEach((log) => {
      const logElement = document.createElement('div');
      logElement.className = 'study-log';
      logElement.innerHTML = `
        <h3>${log.subject}</h3>
        <p><strong>Hours:</strong> ${log.hours_studied}</p>
        <p>${log.notes || 'No notes provided.'}</p>
        <p><small>${new Date(log.date).toLocaleString()}</small></p>
      `;
      studyLogContainer.appendChild(logElement);
    });
  }

  loadStudyLogs();
</script>