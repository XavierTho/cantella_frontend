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
    <button onclick="returnToHome()" 
            style="background: linear-gradient(45deg, #B22234, #3C3B6E); border: none; color: white; padding: 10px 20px; font-size: 1.2em; border-radius: 30px; cursor: pointer; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); transition: transform 0.2s, box-shadow 0.2s;">
      Return to Home
    </button>
  </div>
</div>

<script>
  // Array to store the questions fetched from the backend
  let questions = [];

  // Fetch quiz questions from the backend API
  async function fetchQuestions() {
    try {
      // Fetching questions from the APUSH quiz endpoint
      const response = await fetch('http://localhost:5003/api/quiz/apush');
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
      const response = await fetch('http://localhost:5003/api/quiz/apush/submit', {
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
      const response = await fetch('http://localhost:5003/api/leaderboard/apush');
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
</script>

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
