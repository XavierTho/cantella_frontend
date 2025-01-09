---
layout: post
title: AP Computer Science Principles
permalink: classes/ap/csp/quizz
---

<div class="quiz-page" style="font-family: Arial, sans-serif; background: linear-gradient(to bottom, #E3F2FD, #BBDEFB); min-height: 100vh; padding: 20px; box-sizing: border-box;">
  <!-- Container for the quiz page with a linear gradient background, full height, and padding -->
  <h1 style="color: #1E88E5; text-align: center; font-size: 3em; animation: fadeIn 1s;">
    AP CSP Quiz <!-- Main heading with animation -->
  </h1>

  <!-- User Name Input -->
  <div style="text-align: center; margin-bottom: 20px;">
    <!-- Centered label and input field for user's name -->
    <label for="nameInput" style="color: #1565C0; font-size: 1.2em;">Enter Your Name:</label>
    <input id="nameInput" type="text" placeholder="Your Name" style="padding: 10px; font-size: 1em; margin-top: 10px; border-radius: 10px; border: 1px solid #1565C0;">
  </div>

  <form id="quiz-form" style="max-width: 700px; margin: 20px auto; background-color: #E3F2FD; padding: 20px; border-radius: 15px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); animation: slideIn 2s;">
    <!-- Quiz form container with styling and animation -->
    <div id="quiz-questions">
      <!-- Placeholder for dynamically injected quiz questions -->
    </div>
    <button type="submit" style="background: linear-gradient(45deg, #1E88E5, #42A5F5); border: none; color: white; padding: 15px 30px; font-size: 1.5em; border-radius: 50px; cursor: pointer; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); transition: transform 0.2s, box-shadow 0.2s; margin-top: 20px;">
      Submit Quiz <!-- Button to submit the quiz -->
    </button>
  </form>

  <p id="quiz-result" style="color: #1565C0; font-size: 1.5em; text-align: center; margin-top: 20px;">
    <!-- Placeholder for displaying quiz results -->
  </p>

  <!-- Leaderboard Section -->
  <div id="leaderboard" style="max-width: 700px; margin: 40px auto; background: #1E88E5; padding: 20px; border-radius: 15px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); animation: fadeIn 1s;">
    <!-- Leaderboard container with styling and animation -->
    <h2 style="color: #E3F2FD; text-align: center; font-size: 2em;">
      Leaderboard <!-- Leaderboard heading -->
    </h2>
    <ul id="leaderboard-list" style="list-style-type: none; padding: 0; font-size: 1.2em; color: #0D47A1; text-align: center;">
      <!-- Placeholder for leaderboard entries -->
    </ul>
  </div>

  <div style="text-align: center; margin-top: 20px;">
    <button onclick="returnToHome()" style="background: linear-gradient(45deg, #1E88E5, #42A5F5); border: none; color: white; padding: 10px 20px; font-size: 1.2em; border-radius: 30px; cursor: pointer; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); transition: transform 0.2s, box-shadow 0.2s;">
      Return to Home <!-- Button to return to the home page -->
    </button>
  </div>
</div>

<script>
  let questions = []; // Initialize an empty array for quiz questions

  // Fetch quiz questions from the backend
  async function fetchQuestions() {
    try {
      const response = await fetch('http://localhost:5003/api/quiz/csp'); // API call to fetch questions
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json(); // Parse JSON response
      if (!Array.isArray(data) || data.length === 0) throw new Error("No questions found.");

      questions = data; // Store fetched questions in the array
      const quizContainer = document.getElementById('quiz-questions'); // Get quiz questions container
      quizContainer.innerHTML = ''; // Clear previous content

      data.forEach((question, index) => {
        // Loop through each question and generate HTML
        const questionDiv = document.createElement('div'); // Create a div for the question
        questionDiv.className = 'quiz-question'; // Assign class for styling
        questionDiv.style = "margin-bottom: 20px; padding: 15px; background-color: #E3F2FD; border-radius: 10px;";
        questionDiv.innerHTML = `
          <p style="color: #1E88E5; font-size: 1.2em; font-weight: bold;">${index + 1}. ${question.text}</p>
          ${question.options.map((option, idx) => `
            <label style="display: block; margin: 5px 0; color: #0D47A1;">
              <input type="radio" name="q${index}" value="${option}" style="margin-right: 10px;">
              ${option} <!-- Radio button for each option -->
            </label>
          `).join('')}
        `;
        quizContainer.appendChild(questionDiv); // Append question div to container
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
      document.getElementById('quiz-questions').innerHTML = `<p style="color: red;">Failed to load questions.</p>`;
    }
  }

  // Submit the quiz and display the score
  async function submitQuiz(event) {
    event.preventDefault(); // Prevent form from submitting normally

    const nameInput = document.getElementById('nameInput'); // Get user name input element
    const userName = nameInput.value.trim(); // Trim whitespace from user name

    if (!userName) {
      alert("Please enter your name before submitting the quiz."); // Alert if name is empty
      return;
    }

    const formData = new FormData(document.getElementById('quiz-form')); // Create FormData object from form
    const answers = questions.map((q, index) => ({ questionId: q.id, answer: formData.get(`q${index}`) }));
    // Map each question to its selected answer
    if (answers.some(a => !a.answer)) return alert("Please answer all questions."); // Check for unanswered questions

    try {
      const response = await fetch('http://localhost:5003/api/quiz/csp/submit', {
        method: 'POST', // POST request to submit quiz
        headers: { 'Content-Type': 'application/json' }, // Set headers for JSON payload
        body: JSON.stringify({ name: userName, answers }) // Send user name and answers as JSON
      });
      const result = await response.json(); // Parse JSON response

      // Show result animation and score
      const resultElement = document.getElementById('quiz-result'); // Get result element
      resultElement.textContent = `${userName}, your score: ${result.score}/10`; // Display user score
      resultElement.style.animation = "popIn 1s"; // Apply animation
      fetchLeaderboard(); // Fetch updated leaderboard
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  }

  // Fetch the leaderboard
  async function fetchLeaderboard() {
    try {
      const response = await fetch('http://localhost:5003/api/leaderboard/csp'); // API call to fetch leaderboard
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json(); // Parse JSON response
      const leaderboardList = document.getElementById('leaderboard-list'); // Get leaderboard list element
      leaderboardList.innerHTML = ''; // Clear previous content

      data.forEach((entry, index) => {
        // Loop through each leaderboard entry and generate list item
        const li = document.createElement('li'); // Create list item element
        li.textContent = `${index + 1}. ${entry.name} - Score: ${entry.score}`; // Set leaderboard entry text
        leaderboardList.appendChild(li); // Append list item to leaderboard
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      document.getElementById('leaderboard-list').innerHTML = `<li style="color: red;">Failed to load leaderboard.</li>`;
    }
  }

  function returnToHome() {
    if (confirm("Are you sure you want to leave?")) {
      window.location.href = '{{site.baseurl}}/classes/ap/csp/home'; // Navigate to home page if confirmed
    }
  }

  // Initialize quiz and leaderboard
  document.getElementById('quiz-form').addEventListener('submit', submitQuiz); // Add submit event listener to form
  fetchQuestions(); // Fetch quiz questions on page load
  fetchLeaderboard(); // Fetch leaderboard on page load
</script>

<style>
  /* Keyframe animation for fading in elements */
  @keyframes fadeIn {
    from { opacity: 0; } /* Start with no opacity */
    to { opacity: 1; }   /* End with full opacity */
  }
  
  /* Keyframe animation for popping in elements */
  @keyframes popIn {
    0% { transform: scale(0.5); opacity: 0; } /* Start with smaller scale and no opacity */
    100% { transform: scale(1); opacity: 1; } /* End with normal scale and full opacity */
  }

  button:hover {
    /* Hover effect for buttons */
    transform: scale(1.05); /* Slightly increase size */
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4); /* Add deeper shadow */
  }
</style>
