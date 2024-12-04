---
layout: post
title: APUSH Quiz
permalink: classes/ap/ush/quizz
---

<div class="quiz-page" style="font-family: Arial, sans-serif; background: linear-gradient(to bottom, #FFF3E0, #FFD8B2); min-height: 100vh; padding: 20px; box-sizing: border-box;">
  <h1 style="color: #FF9E80; text-align: center; font-size: 3em; animation: fadeIn 1s;">AP US History Quiz</h1>
  <p style="text-align: center; color: #BF360C; font-size: 1.2em; animation: fadeIn 1.5s;">Answer the following questions and click submit to see your score!</p>

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

  <!-- Back to Home Button -->
  <div style="text-align: center; margin-top: 40px;">
    <button onclick="goBackToHome()"
            style="background: linear-gradient(45deg, #FF7043, #FF9E80); border: none; color: white; padding: 10px 20px; font-size: 1.2em; border-radius: 30px; cursor: pointer; box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3); transition: transform 0.2s, box-shadow 0.2s;">
      Back to Home (Answers will not save)
    </button>
  </div>
</div>

<script>
  let questions = [];

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

    const formData = new FormData(document.getElementById('quiz-form'));
    const answers = questions.map((q, index) => ({
      questionId: q.id,
      answer: formData.get(`q${index}`)
    }));

    try {
      const response = await fetch('/api/quiz/apush/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers })
      });

      const result = await response.json();
      document.getElementById('quiz-result').textContent = `Your score: ${result.score}`;
      
      // Redirect to home page after 5 seconds
      setTimeout(() => window.location.href = './home.md', 5000);
    } catch (error) {
      console.error('Error submitting quiz:', error);
    }
  }

  // Go back to home immediately
  function goBackToHome() {
    alert('You will lose your answers if you leave the quiz.');
    window.location.href = './home';
  }

  // Initialize quiz questions
  document.getElementById('quiz-form').addEventListener('submit', submitQuiz);
  fetchQuestions();
</script>

<style>
  /* Animations */
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateY(50px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  /* Button Hover Effect */
  button:hover {
    transform: scale(1.05);
    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.4);
  }

  /* Question Hover Effect */
  .quiz-question:hover {
    background-color: #FF9E80;
    color: white;
    transition: background-color 0.3s ease, color 0.3s ease;
  }
</style>
