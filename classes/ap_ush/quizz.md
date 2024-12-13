---
layout: post
title: APUSH Quiz
permalink: classes/ap/ush/quizz
---

<div class="quiz-page" style="font-family: Arial, sans-serif; background: linear-gradient(to bottom, #FFF3E0, #FFD8B2); min-height: 100vh; padding: 20px; box-sizing: border-box;">
  <h1 style="color: #FF9E80; text-align: center; font-size: 3em; animation: fadeIn 1s;">AP US History Quiz</h1>

  <!-- User Name Input -->
  <div style="text-align: center; margin-bottom: 20px;">
    <label for="nameInput" style="color: #FF7043; font-size: 1.2em;">Enter Your Name:</label>
    <input id="nameInput" type="text" placeholder="Your Name" style="padding: 10px; font-size: 1em; margin-top: 10px; border-radius: 10px; border: 1px solid #FF7043;">
  </div>

  <form id="quiz-form" style="max-width: 700px; margin: 20px auto; background-color: #FFE5D0; padding: 20px; border-radius: 15px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2); animation: slideIn 2s;">
    <div id="quiz-questions">
      <!-- Quiz questions will be dynamically injected here -->
    </div>
    <button type="submit" 
            style="background: linear-gradient(45deg, #FF7043, #FF9E80); border: none; color: white; padding: 15px 30px; font-size: 1.5em; border-radius: 50px; cursor: pointer; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); transition: transform 0.2s, box-shadow 0.2s; margin-top: 20px;">
      Submit Quiz
    </button>
  </form>

  <p id="quiz-result" style="color: #FF7043; font-size: 1.5em; text-align: center; margin-top: 20px;"></p>
</div>

<script>
  let questions = [];
  let userName = "";

  // Fetch quiz questions from the backend
  async function fetchQuestions() {
    try {
      const response = await fetch('/api/quiz/apush');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (!Array.isArray(data) || data.length === 0) {
        throw new Error("No questions found or incorrect data format.");
      }

      questions = data;

      const quizContainer = document.getElementById('quiz-questions');
      quizContainer.innerHTML = '';

      data.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'quiz-question';
        questionDiv.style = "margin-bottom: 20px; padding: 15px; background-color: #FFF3E0; border-radius: 10px; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);";

        questionDiv.innerHTML = `
          <p style="color: #FF7043; font-size: 1.2em; font-weight: bold;">${index + 1}. ${question.text}</p>
          ${question.options.map((option, idx) => `
            <label style="display: block; margin: 5px 0; color: #BF360C; font-size: 1em; padding-left: 10px;">
              <input type="radio" name="q${index}" value="${option}" style="margin-right: 10px;">
              ${option}
            </label>
          `).join('')}
        `;
        quizContainer.appendChild(questionDiv);
      });
    } catch (error) {
      console.error('Error fetching questions:', error);
      document.getElementById('quiz-questions').innerHTML = `<p style="color: red;">Failed to load questions. Please try again later.</p>`;
    }
  }

  // Submit the quiz and display the score
  async function submitQuiz(event) {
    event.preventDefault();

    const nameInput = document.getElementById('nameInput');
    userName = nameInput.value.trim();

    if (!userName) {
      alert("Please enter your name before submitting the quiz.");
      return;
    }

    const formData = new FormData(document.getElementById('quiz-form'));
    const answers = questions.map((q, index) => ({
      questionId: q.id,
      answer: formData.get(`q${index}`)
    }));

    try {
      const response = await fetch('/api/quiz/apush/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: userName, answers })
      });

      const result = await response.json();
      document.getElementById('quiz-result').textContent = `${userName}, your score: ${result.score}/10`;
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  }

  // Initialize quiz questions
  document.getElementById('quiz-form').addEventListener('submit', submitQuiz);
  fetchQuestions();
</script>
