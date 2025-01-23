---
layout: base
title: Grade Log Tracker
description: Grade Log Tracker
permalink: /gradelog
---

<style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f9;
    color: #333;
    margin: 0;
    padding: 0;
  }

  h2 {
    text-align: center;
    margin-top: 20px;
    color: #444;
  }

  #create-log-btn {
    display: block;
    margin: 20px auto;
    padding: 12px 20px;
    font-size: 16px;
    font-weight: bold;
    color: white;
    background-color: #007BFF;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  #create-log-btn:hover {
    background-color: #0056b3;
    transform: translateY(-2px);
  }

  #grade-log-form-container {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  #grade-log-form {
    width: 100%;
    max-width: 400px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 10px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  #grade-log-form input,
  #grade-log-form textarea,
  #grade-log-form button {
    display: block;
    width: 100%;
    margin-bottom: 15px;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 5px;
    transition: border-color 0.3s ease;
  }

  #grade-log-form input:focus,
  #grade-log-form textarea:focus {
    border-color: #007BFF;
    outline: none;
  }

  #grade-log-form button {
    background-color: #28a745;
    color: white;
    font-weight: bold;
    border: none;
    cursor: pointer;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  #grade-log-form button:hover {
    background-color: #218838;
    transform: translateY(-2px);
  }

  .grade-log-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
  }

  .grade-log {
    width: 320px;
    border-radius: 10px;
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #ddd;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .grade-log:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  .grade-log h3 {
    font-size: 20px;
    margin-bottom: 10px;
    color: #333;
  }

  .grade-log p {
    font-size: 16px;
    margin: 5px 0;
    color: #555;
  }

  .hidden {
    display: none;
  }

  @media (max-width: 768px) {
    .grade-log {
      width: 100%;
      max-width: 300px;
    }

    #grade-log-form {
      padding: 15px;
    }
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
 
  // Display grade logs in the container with Edit and Delete buttons
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
        <button class="edit-log-btn" data-id="${log.id}">Edit</button>
        <button class="delete-log-btn" data-id="${log.id}">Delete</button>
      `;
      gradeLogContainer.appendChild(logElement);
    });

    // Add event listeners for Edit and Delete buttons
    document.querySelectorAll('.edit-log-btn').forEach((btn) => {
      btn.addEventListener('click', handleEditLog);
    });

    document.querySelectorAll('.delete-log-btn').forEach((btn) => {
      btn.addEventListener('click', handleDeleteLog);
    });
  }

  // Handle Edit button click
  async function handleEditLog(event) {
    const logId = event.target.getAttribute('data-id');

    // Prompt user for new values
    const subject = prompt('Enter new subject:');
    const grade = prompt('Enter new grade:');
    const notes = prompt('Enter new notes (optional):', '');

    if (!subject || !grade) {
      alert('Subject and grade are required!');
      return;
    }

    const data = {
      id: logId,
      subject,
      grade: parseFloat(grade),
      notes
    };

    try {
      const response = await fetch('http://127.0.0.1:8887/api/gradelog', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
      });

      if (response.ok) {
        alert('Grade Log updated successfully!');
        loadGradeLogs(); // Refresh logs
      } else {
        const errorText = await response.text();
        alert('Failed to update grade log: ' + errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while updating the grade log.');
    }
  }

  // Handle Delete button click
  async function handleDeleteLog(event) {
    const logId = event.target.getAttribute('data-id');

    if (!confirm('Are you sure you want to delete this grade log?')) {
      return;
    }

    try {
      const response = await fetch(`http://127.0.0.1:8887/api/gradelog?id=${logId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Grade Log deleted successfully!');
        loadGradeLogs(); // Refresh logs
      } else {
        const errorText = await response.text();
        alert('Failed to delete grade log: ' + errorText);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while deleting the grade log.');
    }
  }

// Load grade logs on page load
loadGradeLogs();

</script>
