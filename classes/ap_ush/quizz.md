---
layout: post
title: APUSH Quiz
permalink: classes/ap/ush/quizz
---

<!-- Main container for the quiz page -->
<div class="quiz-page" style="font-family: 'Arial', sans-serif; background: linear-gradient(to bottom, #FFFAF0, #F1F1F1); min-height: 100vh; padding: 20px; box-sizing: border-box;">
  <!-- Animated American flag positioned at the top center -->
  <div style="position: fixed; top: 10px; left: 50%; transform: translateX(-50%); z-index: 1;">
    <img src="https://upload.wikimedia.org/wikipedia/commons/a/a4/Flag_of_the_United_States.svg" alt="American Flag" style="width: 80px; height: auto; animation: wave 2s infinite;">
  </div>

  <!-- Main heading with American theme -->
  <h1 style="color: #B22234; text-align: center; font-size: 3em; animation: fadeIn 1s;">AP US History Quiz</h1>

  <!-- Section for entering user name -->
  <div style="text-align: center; margin-bottom: 20px;">
    <label for="nameInput" style="color: #B22234; font-size: 1.2em;">Enter Your Name:</label>
    <input id="nameInput" type="text" placeholder="Your Name" style="padding: 10px; font-size: 1em; margin-top: 10px; border-radius: 10px; border: 1px solid #B22234;">
  </div>


  <!-- Quiz form container -->
  <form id="quiz-form" style="max-width: 700px; margin: 20px auto; background-color: #FFFFFF; padding: 20px; border-radius: 15px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); border: 2px solid #3C3B6E; animation: slideIn 2s;">
    <div id="quiz-questions">
      <!-- Quiz questions will be dynamically added here via JavaScript -->
    </div>
    <!-- Submit button for the quiz -->
    <button type="submit" 
            style="background: linear-gradient(45deg, #B22234, #3C3B6E); border: none; color: white; padding: 15px 30px; font-size: 1.5em; border-radius: 50px; cursor: pointer; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); transition: transform 0.2s, box-shadow 0.2s; margin-top: 20px;">
      Submit Quiz
    </button>
  </form>

  <!-- Section to display the quiz result -->
  <p id="quiz-result" style="color: #B22234; font-size: 1.5em; text-align: center; margin-top: 20px;"></p>

  <!-- Leaderboard section -->
  <div id="leaderboard" style="max-width: 700px; margin: 40px auto; background: linear-gradient(to right, #B22234, #3C3B6E); padding: 20px; border-radius: 15px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); animation: fadeIn 1s;">
    <h2 style="color: #FFFFFF; text-align: center; font-size: 2em;">Leaderboard</h2>
    <ul id="leaderboard-list" style="list-style-type: none; padding: 0; font-size: 1.2em; color: #FFFFFF; text-align: center;">
      <!-- Leaderboard entries will be dynamically added here via JavaScript -->
    </ul>
  </div>

  <!-- Button to return to the home page -->
  <div style="text-align: center; margin-top: 20px;">
    <button id="return-home"
            style="background: linear-gradient(45deg, #B22234, #3C3B6E); border: none; color: white; padding: 10px 20px; font-size: 1.2em; border-radius: 30px; cursor: pointer; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); transition: transform 0.2s, box-shadow 0.2s;">
      Return to Home
    </button>
  </div>
</div>



<style>
  /* Animations for fade-in effect */
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  /* Animation for pop-in effect */
  @keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
  }
  /* Animation for flag waving effect */
  @keyframes wave {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(10deg); }
    50% { transform: rotate(0deg); }
    75% { transform: rotate(-10deg); }
    100% { transform: rotate(0deg); }
  }
  /* Button hover effect */
  button:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4);
  }
</style>







<!-- Button for edit access -->
<div style="text-align: center; margin-top: 20px;">
  <button id="edit-access"
          style="background: linear-gradient(45deg, #FF8C00, #FFA500); border: none; color: white; padding: 10px 20px; font-size: 1.2em; border-radius: 30px; cursor: pointer; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); transition: transform 0.2s, box-shadow 0.2s;">
    Edit Access
  </button>
</div>

<!-- Hidden edit access container -->
<div id="edit-container" style="display: none; text-align: center; margin-top: 20px;">
  <input id="passwordInput" type="password" placeholder="Enter Password" 
         style="padding: 10px; font-size: 1em; margin-top: 10px; border-radius: 10px; border: 1px solid #FFA500;">
  <button id="submitPassword"
          style="background: linear-gradient(45deg, #FF8C00, #FFA500); border: none; color: white; padding: 10px 20px; font-size: 1em; border-radius: 30px; cursor: pointer; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);">
    Submit
  </button>
</div>

<!-- Admin controls for editing leaderboard -->
<div id="admin-controls" style="display: none; max-width: 700px; margin: 20px auto; text-align: center; background-color: #FFFAF0; padding: 20px; border-radius: 15px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);">
  <!-- Form to add a leaderboard entry -->
  <div>
    
    
   
  </div>
  <!-- Dropdown to select and delete an entry -->
  <div style="margin-top: 20px;">
    <select id="deleteSelect" style="padding: 10px; border-radius: 5px; border: 1px solid #B22234;">
      <option value="" disabled selected>Select an entry to change</option>
    </select>
    <button id="deleteEntry"
            style="background: linear-gradient(45deg, #FF4500, #DC143C); color: white; padding: 10px 20px; border-radius: 5px; border: none; cursor: pointer;">
      Delete Entry
    </button>
    <input id="newScore" type="number" placeholder="New Score" 
           style="padding: 10px; border-radius: 5px; border: 1px solid #B22234;">
    <button id="editEntry"
            style="background: linear-gradient(45deg,rgb(255, 157, 0),rgb(220, 153, 20)); color: white; padding: 10px 20px; border-radius: 5px; border: none; cursor: pointer;">
      Edit Entry
    </button>
  </div>
</div>

<script type="module">
  import { fetchOptions, pythonURI } from "{{site.baseurl}}/assets/js/api/config.js"
  // Array to store the questions fetched from the backend
  let questions = [];

  const returnBtn = document.getElementById('return-home')
  returnBtn.addEventListener('click', returnToHome)

  // Fetch quiz questions from the backend API
  async function fetchQuestions() {
    try {
      // Fetching questions from the APUSH quiz endpoint
      const response = await fetch(pythonURI+'/api/quiz/apush', fetchOptions);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      if (!Array.isArray(data) || data.length === 0) throw new Error("No questions found.");

      questions = data;
      const quizContainer = document.getElementById('quiz-questions');
      quizContainer.innerHTML = ''; // Clear any existing content

      // Dynamically create and append each question
      data.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.style = "margin-bottom: 20px; padding: 15px; background: #FFFFFF; border: 2px solid #B22234; border-radius: 10px;";
        questionDiv.innerHTML = `
          <p style="color: #3C3B6E; font-size: 1.2em; font-weight: bold;">${index + 1}. ${question.text}</p>
          ${question.options.map((option, idx) => `
            <label style="display: block; margin: 5px 0; color: #3C3B6E;">
              <input type="radio" name="q${index}" value="${option}" style="margin-right: 10px;">
              ${option}
            </label>
          `).join('')}
        `;
        quizContainer.appendChild(questionDiv);
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
      document.getElementById('quiz-questions').innerHTML = `<p style="color: red;">Failed to load questions.</p>`;
    }
  }

  // Submit the quiz and send the answers to the backend API
  async function submitQuiz(event) {
    event.preventDefault();

    const nameInput = document.getElementById('nameInput');
    const userName = nameInput.value.trim(); // Get the user's name

    // Check if the user entered their name
    if (!userName) {
      alert("Please enter your name before submitting the quiz.");
      return;
    }

    // Collect the answers from the form
    const formData = new FormData(document.getElementById('quiz-form'));
    const answers = questions.map((q, index) => ({ questionId: q.id, answer: formData.get(`q${index}`) }));

    // Check if any question is unanswered
    if (answers.some(a => !a.answer)) return alert("Please answer all questions.");

    try {
      // Submit answers to the backend
      const response = await fetch(pythonURI+'/api/quiz/apush/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, answers })
      });

      const result = await response.json();
      const resultElement = document.getElementById('quiz-result');
      resultElement.textContent = `${userName}, your score: ${result.score}/10`;
      resultElement.style.animation = "popIn 1s"; // Add animation to the result display
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  }

  // Fetch and display the leaderboard
  async function fetchLeaderboard() {
    try {
      const response = await fetch(pythonURI+'/api/leaderboard/apush', fetchOptions);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      const leaderboardList = document.getElementById('leaderboard-list');
      leaderboardList.innerHTML = ''; // Clear any existing leaderboard entries

      // Dynamically add leaderboard entries
      data.forEach((entry, index) => {
        const li = document.createElement('li');
        li.textContent = `${index + 1}. ${entry.name} - Score: ${entry.score}`;
        leaderboardList.appendChild(li);
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      document.getElementById('leaderboard-list').innerHTML = `<li style="color: red;">Failed to load leaderboard.</li>`;
    }
  }

  // Navigate back to the home page
  function returnToHome() {
    if (confirm("Are you sure you want to leave?")) {
      window.location.href = '{{site.baseurl}}/classes/ap/ush/home';
    }
  }

  // Initialize the quiz and leaderboard when the page loads
  document.getElementById('quiz-form').addEventListener('submit', submitQuiz);
  fetchQuestions(); // Load questions
  fetchLeaderboard(); // Load leaderboard






  // Show password prompt
document.getElementById('edit-access').addEventListener('click', () => {
  document.getElementById('edit-container').style.display = 'block';
});

// Validate password and reveal admin controls
document.getElementById('submitPassword').addEventListener('click', () => {
  const password = document.getElementById('passwordInput').value;
  if (password === 'poop') {
    document.getElementById('edit-container').style.display = 'none';
    document.getElementById('admin-controls').style.display = 'block';
    loadLeaderboardForEdit();
  } else {
    alert('Incorrect password!');
  }
});

// Load leaderboard entries into delete dropdown
async function loadLeaderboardForEdit() {
  try {
    const response = await fetch(pythonURI + '/api/leaderboard/apush', fetchOptions);
    const data = await response.json();
    const deleteSelect = document.getElementById('deleteSelect');
    deleteSelect.innerHTML = '<option value="" disabled selected>Select an entry to delete</option>';
    data.forEach(entry => {
      const option = document.createElement('option');
      option.value = entry.id; // Ensure the backend sends a unique ID
      option.textContent = `${entry.name} - Score: ${entry.score}`;
      deleteSelect.appendChild(option);
    });
  } catch (error) {
    console.error('Error loading leaderboard for edit:', error);
  }
}

// Add a new leaderboard entry
document.getElementById('editEntry').addEventListener('click', async () => {
  const score = document.getElementById('newScore').value;

  if (!score) {
    alert('Please enter new Score');
    return;
  }

  const selectedId = document.getElementById('deleteSelect').value;

  if (!selectedId) {
    alert('Please select an entry to delete!');
    return;
  }

  try {
    const response = await fetch(pythonURI + '/api/leaderboard', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "id": selectedId, score }),
    });

    if (!response.ok) throw new Error('Failed to change entry.');
    alert('Entry changed successfully!');
    loadLeaderboardForEdit();
    window.location.reload()
  } catch (error) {
    console.error('Error changing entry:', error);
  }
});

// Delete a leaderboard entry
document.getElementById('deleteEntry').addEventListener('click', async () => {
  const selectedId = document.getElementById('deleteSelect').value;

  if (!selectedId) {
    alert('Please select an entry to delete!');
    return;
  }

  console.log(selectedId)

  try {
    const response = await fetch(pythonURI + '/api/leaderboard', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "id": selectedId }),
    });

    if (!response.ok) throw new Error('Failed to delete entry.');
    alert('Entry deleted successfully!');
    loadLeaderboardForEdit();
    window.location.reload()
  } catch (error) {
    console.error('Error deleting entry:', error);
  }
});




</script>