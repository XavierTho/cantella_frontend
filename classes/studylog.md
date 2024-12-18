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
    color: #000; /* Black text */
    transition: transform 0.3s ease;
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
    color: #000; /* Black text */
  }

  #study-log-form button {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  #study-log-form button:hover {
    background-color: #45a049;
  }
</style>

<div id="study-log-app">
  <h2>Study Log Tracker</h2>
  <button id="create-log-btn">Add Study Log</button>

  <div id="study-log-form-container" class="hidden">
    <form id="study-log-form">
      <input type="text" id="subject" placeholder="Subject" required>
      <input type="number" id="hours" placeholder="Hours Studied" required>
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

  // User ID placeholder (replace with real dynamic user ID)
  const userId = 1;

  // Show form to create a study log
  createLogBtn.addEventListener('click', () => {
    studyLogFormContainer.classList.toggle('hidden');
  });

  // Handle form submission to create a study log
  studyLogForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const subject = document.getElementById('subject').value.trim();
    const hours = document.getElementById('hours').value.trim();
    const notes = document.getElementById('notes').value.trim();

    if (!subject || !hours) {
      alert('Subject and hours are required!');
      return;
    }

    const data = {
      user_id: userId,
      subject,
      hours: parseFloat(hours),
      notes
    };

    try {
      const response = await fetch('http://127.0.0.1:8887/api/studylog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Study Log added successfully!');
        studyLogForm.reset();
        loadStudyLogs(); // Refresh logs
      } else {
        const errorText = await response.text();
        alert('Failed to add study log: ' + errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the study log.');
    }
  });

  // Load study logs from the backend
  async function loadStudyLogs() {
    try {
      const response = await fetch('http://127.0.0.1:8887/api/studylog', {
        credentials: 'include',
      });

      if (response.ok) {
        const logs = await response.json();
        displayStudyLogs(logs);
      } else {
        console.error('Failed to load study logs.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }


  // Display study logs in the container
  function displayStudyLogs(logs) {
    studyLogContainer.innerHTML = ''; // Clear the container
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
        <p>${log.notes}</p>
        <p><small>${new Date(log.date).toLocaleString()}</small></p>
      `;
      studyLogContainer.appendChild(logElement);
    });
  }

  // Load study logs on page load
  loadStudyLogs();
</script>