---
layout: base
title: Grade Log Tracker
description: Grade Log Tracker
permalink: /gradelog
---

<style>
  .grade-log-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  .grade-log {
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

  .grade-log:hover {
    transform: scale(1.05);
    background-color: #e0e0e0;
  }

  .hidden {
    display: none;
  }

  #grade-log-form {
    margin-bottom: 20px;
  }

  #grade-log-form input,
  #grade-log-form textarea,
  #grade-log-form button {
    display: block;
    width: 100%;
    margin-bottom: 10px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    color: #000; /* Black text */
  }

  #grade-log-form button {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  #grade-log-form button:hover {
    background-color: #45a049;
  }
</style>

<div id="grade-log-app">
  <h2>Grade Log Tracker</h2>
  <button id="create-log-btn">Add Grade Log</button>

  <div id="grade-log-form-container" class="hidden">
    <form id="grade-log-form">
      <input type="text" id="subject" placeholder="Subject" required>
      <input type="number" id="grade" placeholder="Grade" required>
      <textarea id="notes" placeholder="Notes (Optional)"></textarea>
      <button type="submit">Submit Grade Log</button>
    </form>
  </div>

  <div class="grade-log-container" id="grade-log-container"></div>
</div>

<script>
  const createLogBtn = document.getElementById('create-log-btn');
  const gradeLogFormContainer = document.getElementById('grade-log-form-container');
  const gradeLogForm = document.getElementById('grade-log-form');
  const gradeLogContainer = document.getElementById('grade-log-container');

  // User ID placeholder (replace with real dynamic user ID)
  const userId = 1;

  // Show form to create a grade log
  createLogBtn.addEventListener('click', () => {
    gradeLogFormContainer.classList.toggle('hidden');
  });

  // Handle form submission to create a grade log
  gradeLogForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const subject = document.getElementById('subject').value.trim();
    const grade = document.getElementById('grade').value.trim();
    const notes = document.getElementById('notes').value.trim();

    if (!subject || !grade) {
      alert('Subject and grade are required!');
      return;
    }

    const data = {
      user_id: userId,
      subject,
      grade: parseFloat(grade),
      notes
    };

    try {
      const response = await fetch('http://127.0.0.1:8887/api/gradelog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Grade Log added successfully!');
        gradeLogForm.reset();
        loadGradeLogs(); // Refresh logs
      } else {
        const errorText = await response.text();
        alert('Failed to add grade log: ' + errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while adding the grade log.');
    }
  });

  // Load grade logs from the backend
  async function loadGradeLogs() {
    try {
      const response = await fetch('http://127.0.0.1:8887/api/gradelog', {
        credentials: 'include',
      });

      if (response.ok) {
        const logs = await response.json();
        displayGradeLogs(logs);
      } else {
        console.error('Failed to load grade logs.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Display grade logs in the container
  function displayGradeLogs(logs) {
    gradeLogContainer.innerHTML = ''; // Clear the container
    if (logs.length === 0) {
      gradeLogContainer.innerHTML = '<p>No grade logs found.</p>';
      return;
    }

    logs.forEach((log) => {
      const logElement = document.createElement('div');
      logElement.className = 'grade-log';
      logElement.innerHTML = `
        <h3>${log.subject}</h3>
        <p><strong>Grade:</strong> ${log.grade}</p>
        <p>${log.notes}</p>
        <p><small>${new Date(log.date).toLocaleString()}</small></p>
      `;
      gradeLogContainer.appendChild(logElement);
    });
  }

  // Load grade logs on page load
  loadGradeLogs();
</script>
