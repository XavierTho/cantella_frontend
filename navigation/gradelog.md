---
layout: base
title: Grade Log
description: Grade Log Tracker
permalink: /gradelog
---

<style>
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 20px;
    background: linear-gradient(135deg, #1e3c72 0%, #2a5298 100%);
    color: #ffffff;
    min-height: 100vh;
  }

  h2 {
    text-align: center;
    color: #ffffff;
    margin-bottom: 30px;
    font-weight: 600;
  }

  #create-log-btn {
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
    margin: 20px auto;
    display: block;
  }

  #create-log-btn:hover {
    background-color: #43a047;
    transform: translateY(-2px);
  }

  #grade-log-form-container {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    padding: 30px;
    margin: 20px auto;
    max-width: 400px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }

  #grade-log-form input,
  #grade-log-form textarea {
    width: 100%;
    padding: 12px;
    margin-bottom: 15px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.1);
    color: white;
    font-size: 1rem;
    transition: all 0.3s ease;
  }

  #grade-log-form input:focus,
  #grade-log-form textarea:focus {
    outline: none;
    border-color: #4CAF50;
    background: rgba(255, 255, 255, 0.15);
  }

  #grade-log-form button {
    background-color: #4CAF50;
    color: white;
    padding: 12px;
    width: 100%;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: all 0.3s ease;
  }

  #grade-log-form button:hover {
    background-color: #43a047;
    transform: translateY(-2px);
  }

  .grade-log-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    margin-top: 30px;
    padding: 20px;
  }

  .grade-log {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(5px);
    border-radius: 15px;
    padding: 20px;
    width: 320px;
    border: 1px solid rgba(255, 255, 255, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }

  .grade-log:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
  }

  .grade-log h3 {
    color: #ff7043;
    margin-bottom: 15px;
  }

  .grade-log p {
    margin: 10px 0;
    color: #ffffff;
  }

  .grade-log p strong {
    color: #ff7043;
  }

  .grade {
    font-size: 1.5em;
    color: #4CAF50;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 0.2em 0.5em;
    border-radius: 5px;
    display: inline-block;
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
    margin: 0 5px;
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

  .button-group {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    .grade-log {
      width: 100%;
      max-width: 300px;
    }
  }

  /* SweetAlert2 styling to match theme */
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

  .save-btn {
    background-color: rgba(76, 175, 80, 0.2);
    color: #4CAF50;
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
    margin: 0 5px;
  }

  .save-btn:hover {
    transform: translateY(-2px);
    background-color: rgba(76, 175, 80, 0.3);
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
</style>


<div id="grade-log-app">
  <h2 style="color:#ff7043;">Grade Log Tracker</h1>
  <button id="create-log-btn">Add Grade Log</button>

  <div id="grade-log-form-container" class="hidden">
    <form id="grade-log-form">
      <input type="text" id="subject" placeholder="Subject" required>
      <input type="text" id="grade" placeholder="Grade" required>
      <textarea id="notes" placeholder="Notes (Optional)"></textarea>
      <button type="submit">Submit Grade Log</button>
    </form>
  </div>

  <div class="grade-log-container" id="grade-log-container"></div>
</div>

<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

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

    // Add validation to ensure grade is a valid number
    if (!subject || !grade) {
      alert('Subject and grade are required!');
      return;
    }

    const gradeNum = parseFloat(grade);
    if (isNaN(gradeNum)) {
      alert('Please enter a valid number for grade');
      return;
    }

    const data = {
      user_id: userId,
      subject,
      grade: gradeNum,
      notes
    };

    try {
      const response = await fetch(`${pythonURI}/api/gradelog`, {
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
      // Make a GET request to the backend API to fetch grade logs for the current user
      const response = await fetch(`${pythonURI}/api/gradelog`, {
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

      // Make a GET request to the backend API to fetch grade logs for all users
      const allUsersResponse = await fetch(`${pythonURI}/api/gradelog/all`, {
        credentials: 'include', // Include credentials for authentication
      });

      // Check if the response is successful
      if (allUsersResponse.ok) {
        // Parse the JSON data from the response
        const allUsersLogs = await allUsersResponse.json();
        // Call the function to display the average grades for all users
        displayAllUsersAverageGrades(allUsersLogs);
      } else {
        // Log an error message if the response is not successful
        console.error('Failed to load grade logs for all users.');
      }
    } catch (error) {
      // Log any errors that occur during the fetch operation
      console.error('Error:', error);
    }
  }

  // Function to display grade logs in the DOM
  function displayGradeLogs(logs) {
    gradeLogContainer.innerHTML = '';

    if (logs.length === 0) {
      gradeLogContainer.innerHTML = '<p style="color: #ffffff; text-align: center;">No grade logs found.</p>';
      return;
    }

    // Group logs by subject
    const groupedLogs = logs.reduce((acc, log) => {
      if (!acc[log.subject]) {
        acc[log.subject] = [];
      }
      acc[log.subject].push(log);
      return acc;
    }, {});

    Object.keys(groupedLogs).forEach((subject) => {
      const subjectElement = document.createElement('div');
      subjectElement.className = 'subject-group';
      subjectElement.style.width = '100%';
      subjectElement.style.marginBottom = '30px';
      subjectElement.innerHTML = `<h3 style="color: #a8d0ff; text-align: center;">${subject}</h3>`;

      let totalGrades = 0;
      let gradeCount = 0;

      groupedLogs[subject].forEach((log) => {
        const logElement = document.createElement('div');
        logElement.className = 'grade-log';
        logElement.setAttribute('data-id', log.id);
        logElement.style.background = 'rgba(255, 255, 255, 0.1)';
        logElement.style.backdropFilter = 'blur(5px)';

        logElement.innerHTML = `
          <p><strong style="color: #ff7043;">Grade:</strong> <span class="grade" data-field="grade">${log.grade}</span></p>
          <p style="color: #ffffff;"><span data-field="notes">${log.notes || 'No notes'}</span></p>
          <p style="color: #a8d0ff; font-size: 0.9em;">${new Date(log.date).toLocaleString()}</p>
          <div class="button-group">
            <button class="edit-btn" onclick="editLog(${log.id})"><i class="fas fa-pencil-alt"></i></button>
            <button class="delete-btn" onclick="deleteLog(${log.id})"><i class="fas fa-trash-alt"></i></button>
          </div>
        `;

        subjectElement.appendChild(logElement);

        totalGrades += parseFloat(log.grade);
        gradeCount++;
      });

      const averageGrade = (totalGrades / gradeCount).toFixed(2);
      const averageElement = document.createElement('div');
      averageElement.className = 'grade-log';
      averageElement.style.background = 'rgba(255, 255, 255, 0.15)';
      averageElement.style.textAlign = 'center';
      averageElement.innerHTML = `
        <p><strong style="color: #ff7043;">Average Grade:</strong> <span class="grade">${averageGrade}</span></p>
      `;
      subjectElement.appendChild(averageElement);

      gradeLogContainer.appendChild(subjectElement);
    });
  }

  // Function to display average grades for all users
  function displayAllUsersAverageGrades(logs) {
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
      let totalGrades = 0; // Initialize variables for calculating average grade
      let gradeCount = 0;

      // Iterate through the logs for the current subject
      groupedLogs[subject].forEach((log) => {
        // Accumulate the total grades and count for calculating the average
        totalGrades += parseFloat(log.grade);
        gradeCount++;
      });

      // Calculate the average grade for the subject
      const averageGrade = (totalGrades / gradeCount).toFixed(2);
      // Create an element to display the average grade for all users
      const averageGradeElement = document.createElement('p');
      averageGradeElement.className = 'average-grade'; // Add a class for styling
      averageGradeElement.innerHTML = `<strong>All Users Average Grade for ${subject}:</strong> <span class="grade">${averageGrade}</span>`;
      // Append the average grade element to the main grade log container
      gradeLogContainer.appendChild(averageGradeElement);
    });
  }

  // Add delete sound effect
  const deleteSound = new Audio('{{site.baseurl}}/images/sounds/delete.mp3');

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
        const response = await fetch(`${pythonURI}/api/gradelog`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id: logId }),
          credentials: 'include',
        });

        if (response.ok) {
          // Play delete sound
          deleteSound.play();
          
          // Find the log element and its parent subject group
          const logElement = document.querySelector(`div[data-id="${logId}"]`);
          const subjectGroup = logElement.parentElement;
          
          // Add delete animation
          logElement.style.transition = 'all 0.3s ease';
          logElement.style.transform = 'scale(0.8)';
          logElement.style.opacity = '0';
          
          // Remove element after animation and check if subject group is empty
          setTimeout(() => {
            logElement.remove();
            
            // If this was the last grade in the subject group (excluding average),
            // remove the entire subject group
            const remainingGrades = subjectGroup.querySelectorAll('.grade-log');
            if (remainingGrades.length <= 1) { // 1 because of the average element
              subjectGroup.style.transition = 'all 0.3s ease';
              subjectGroup.style.opacity = '0';
              setTimeout(() => {
                subjectGroup.remove();
              }, 300);
            } else {
              // Otherwise, just refresh the logs to update averages
              loadGradeLogs();
            }
          }, 300);

          await Swal.fire({
            title: 'Deleted!',
            text: 'Your grade log has been deleted.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });
        } else {
          throw new Error('Failed to delete');
        }
      } catch (error) {
        console.error('Error:', error);
        await Swal.fire({
          title: 'Error!',
          text: 'Failed to delete grade log.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    }
  }

  window.editLog = async function(logId) {
    const logElement = document.querySelector(`div[data-id="${logId}"]`);
    const gradeSpan = logElement.querySelector('[data-field="grade"]');
    const notesSpan = logElement.querySelector('[data-field="notes"]');

    // Create input fields
    const gradeInput = document.createElement('input');
    gradeInput.type = 'text';
    gradeInput.value = gradeSpan.textContent;
    gradeInput.className = 'edit-input';

    const notesInput = document.createElement('textarea');
    notesInput.value = notesSpan.textContent === 'No notes' ? '' : notesSpan.textContent;
    notesInput.className = 'edit-input';

    // Replace spans with inputs
    gradeSpan.replaceWith(gradeInput);
    notesSpan.replaceWith(notesInput);

    // Create save button
    const saveButton = document.createElement('button');
    saveButton.innerHTML = '<i class="fas fa-save"></i>';
    saveButton.className = 'save-btn';

    // Replace edit button with save button
    const editButton = logElement.querySelector('.edit-btn');
    editButton.replaceWith(saveButton);

    // Add save functionality
    saveButton.onclick = async function() {
      const newGrade = parseFloat(gradeInput.value);
      if (isNaN(newGrade)) {
        await Swal.fire('Error!', 'Please enter a valid number for grade.', 'error');
        return;
      }

      const data = {
        id: logId,
        grade: newGrade,
        notes: notesInput.value
      };

      try {
        const response = await fetch(`${pythonURI}/api/gradelog`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
          credentials: 'include',
        });

        if (response.ok) {
          // Create new spans with updated values
          const newGradeSpan = document.createElement('span');
          newGradeSpan.textContent = newGrade;
          newGradeSpan.setAttribute('data-field', 'grade');
          newGradeSpan.className = 'grade';

          const newNotesSpan = document.createElement('span');
          newNotesSpan.textContent = notesInput.value || 'No notes';
          newNotesSpan.setAttribute('data-field', 'notes');

          // Replace inputs with new spans
          gradeInput.replaceWith(newGradeSpan);
          notesInput.replaceWith(newNotesSpan);

          // Restore edit button
          const newEditButton = document.createElement('button');
          newEditButton.innerHTML = '<i class="fas fa-pencil-alt"></i>';
          newEditButton.className = 'edit-btn';
          newEditButton.onclick = () => editLog(logId);
          saveButton.replaceWith(newEditButton);

          // Add animation effect
          logElement.style.transform = 'scale(1.05)';
          setTimeout(() => {
            logElement.style.transform = 'scale(1)';
          }, 200);

          await Swal.fire({
            title: 'Success!',
            text: 'Grade log updated successfully!',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false
          });

          // Refresh logs after animation
          setTimeout(() => {
            loadGradeLogs();
          }, 1600);
        }
      } catch (error) {
        console.error('Error updating grade log:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to update grade log.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    };
  }

  // Load grade logs on page load
  loadGradeLogs();
</script>
