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

  .grade {
    font-size: 1.5em;
    color: #4CAF50;
    background-color: #f0f0f0;
    padding: 0.2em 0.5em;
    border-radius: 5px;
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

  // Function to load grade logs from the backend
  async function loadGradeLogs() {
    try {
      // Make a GET request to the backend API to fetch grade logs
      const response = await fetch('http://127.0.0.1:8887/api/gradelog', {
        credentials: 'include', // Include credentials for authentication
      });

      // Check if the response is successful
      if (response.ok) {
        // Parse the JSON data from the response
        const logs = await response.json();
        // Call the function to display the grade logs, passing the JSON data
        displayGradeLogs(logs);
      } else {
        // Log an error message if the response is not successful
        console.error('Failed to load grade logs.');
      }
    } catch (error) {
      // Log any errors that occur during the fetch operation
      console.error('Error:', error);
    }
  }

  // Function to display grade logs in the DOM
  function displayGradeLogs(logs) {
    // Clear the container that holds the grade logs
    gradeLogContainer.innerHTML = '';

    // Check if there are no logs to display
    if (logs.length === 0) {
      // Display a message indicating no grade logs were found
      gradeLogContainer.innerHTML = '<p>No grade logs found.</p>';
      return;
    }

    // Group logs by subject
    const groupedLogs = logs.reduce((acc, log) => {
      // If the subject is not already a key in the accumulator, add it
      if (!acc[log.subject]) {
        acc[log.subject] = [];
      }
      // Push the current log into the array for its subject
      acc[log.subject].push(log);
      return acc;
    }, {});

    // Iterate over each subject in the grouped logs
    Object.keys(groupedLogs).forEach((subject) => {
      // Create a container element for the subject group
      const subjectElement = document.createElement('div');
      subjectElement.className = 'subject-group'; // Add a class for styling
      subjectElement.innerHTML = `<h3>${subject}</h3>`; // Add the subject title

      let totalGrades = 0; // Initialize variables for calculating average grade
      let gradeCount = 0;

      // Iterate through the logs for the current subject
      groupedLogs[subject].forEach((log) => {
        // Create a container element for the individual grade log
        const logElement = document.createElement('div');
        logElement.className = 'grade-log'; // Add a class for styling

        // Convert the JSON data into DOM elements with structured information
        logElement.innerHTML = `
          <p><strong>Grade:</strong> <span class="grade">${log.grade}</span></p>
          <p>${log.notes}</p>
          <p><small>${new Date(log.date).toLocaleString()}</small></p>
          <button class="edit-log-btn" data-id="${log.id}">Edit</button>
          <button class="delete-log-btn" data-id="${log.id}">Delete</button>
        `;
        // Append the log element to the subject group container
        subjectElement.appendChild(logElement);

        // Accumulate the total grades and count for calculating the average
        totalGrades += parseFloat(log.grade);
        gradeCount++;
      });

      // Calculate the average grade for the subject
      const averageGrade = (totalGrades / gradeCount).toFixed(2);
      // Create an element to display the average grade
      const averageGradeElement = document.createElement('p');
      averageGradeElement.className = 'average-grade'; // Add a class for styling
      averageGradeElement.innerHTML = `<strong>Average Grade:</strong> <span class="grade">${averageGrade}</span>`;
      // Append the average grade element to the subject group container
      subjectElement.appendChild(averageGradeElement);

      // Append the subject group container to the main grade log container
      gradeLogContainer.appendChild(subjectElement);
    });

    // Add CSS styles for the grade and subject group
    const style = document.createElement('style');
    style.innerHTML = `
      .grade {
        font-size: 1.5em;
        color: #4CAF50;
        background-color: #f0f0f0;
        padding: 0.2em 0.5em;
        border-radius: 5px;
        transition: transform 0.3s ease;
      }
      .grade:hover {
        transform: scale(1.1);
      }
      .subject-group {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #fff;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      .subject-group h3 {
        margin-top: 0;
        color: #007BFF;
      }
      .grade-log {
        margin-bottom: 10px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 5px;
        background-color: #fafafa;
        transition: background-color 0.3s ease;
      }
      .grade-log:hover {
        background-color: #f1f1f1;
      }
      .average-grade {
        margin-top: 10px;
        font-size: 1.2em;
        color: #333;
      }
      .edit-log-btn, .delete-log-btn {
        margin-right: 5px;
        padding: 5px 10px;
        font-size: 14px;
        color: white;
        background-color: #007BFF;
        border: none;
        border-radius: 3px;
        cursor: pointer;
        transition: background-color 0.3s ease;
      }
      .edit-log-btn:hover, .delete-log-btn:hover {
        background-color: #0056b3;
      }
    `;
    // Append the style element to the document head
    document.head.appendChild(style);

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
