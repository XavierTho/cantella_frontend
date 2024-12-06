---
layout: post
title: AP Computer Science Principles
permalink: classes/ap/csp/home
---

<div class="class-home" style="font-family: 'Courier New', monospace; background: linear-gradient(to bottom, #4E342E, #3E2723); background-image: url('https://example.com/rocky-texture.png'); background-size: cover; color: #FFCCBC; min-height: 100vh; padding: 20px; box-sizing: border-box; position: relative; overflow: hidden;">
  <!-- Floating Fire Emojis -->
  <div class="floating-emoji" style="position: absolute; top: 10%; left: 20%;">🔥</div>
  <div class="floating-emoji" style="position: absolute; top: 50%; left: 10%;">💀</div>
  <div class="floating-emoji" style="position: absolute; top: 70%; right: 20%;">🔥</div>
  <div class="floating-emoji" style="position: absolute; top: 20%; right: 30%;">⚡</div>

  <h1 style="color: #FF7043; text-align: center; font-size: 3.5em; animation: flicker 1.5s infinite;">🔥 The Dungeon of AP CSP 🔥</h1>
  <p style="color: #D84315; text-align: center; font-size: 1.5em; margin-top: -10px;">“Welcome, brave adventurer. Your GPA may never be the same again.”</p>

  <!-- Leaderboard Section -->
  <section id="leaderboard" style="background-color: rgba(255, 87, 34, 0.9); padding: 20px; border-radius: 15px; margin: 20px auto; max-width: 600px; box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.6); animation: rumble 2s infinite;">
    <h2 style="color: #FFE0B2; text-align: center;">🏆 Leaderboard of Champions 🏆</h2>
    <p style="text-align: center; color: #FBE9E7; font-size: 1.1em;">These souls have faced the fiery wrath and survived.</p>
    <ul id="leaderboard-list" style="list-style: none; padding: 0; text-align: center;">
      <!-- Leaderboard items will be dynamically injected -->
    </ul>
  </section>

  <!-- Take Quiz Button -->
  <section id="quiz-section" style="text-align: center; margin-top: 30px; animation: firePulse 3s infinite;">
    <h2 style="color: #FF7043; font-size: 2.5em;">🔥 Face the Quiz Inferno 🔥</h2>
    <p style="color: #FFAB91; font-size: 1.2em;">Only the strongest will emerge unscathed.</p>
    <button id="take-quiz" onclick="navigateToQuiz()" 
            style="background: linear-gradient(45deg, #D84315, #FF5722); border: 2px solid #BF360C; color: white; padding: 15px 30px; font-size: 1.5em; border-radius: 50px; cursor: pointer; box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.8); transition: transform 0.3s, box-shadow 0.3s;">
      🔥 Enter the Inferno 🔥
    </button>
  </section>

  <!-- Flashcards Button -->
  <section id="flashcards-section" style="text-align: center; margin-top: 20px; animation: shake 2.5s infinite;">
    <h2 style="color: #FF7043; font-size: 2em;">📜 Study the Scrolls of Doom 📜</h2>
    <p style="color: #FBE9E7; font-size: 1.2em;">Forge your knowledge before the trials!</p>
    <button id="open-flashcards" onclick="navigateToFlashcards()" 
            style="background: linear-gradient(45deg, #BF360C, #D84315); border: 2px solid #4E342E; color: white; padding: 15px 30px; font-size: 1.5em; border-radius: 50px; cursor: pointer; box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.8); transition: transform 0.3s, box-shadow 0.3s;">
      📜 Open Scrolls
    </button>
  </section>
</div>

<script>
  async function fetchLeaderboard() {
    try {
      const response = await fetch('/api/leaderboard/apcsp');
      const leaderboard = await response.json();

      const leaderboardList = document.getElementById('leaderboard-list');
      leaderboardList.innerHTML = '';

      leaderboard.forEach((entry) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${entry.username}: ${entry.score} points (${new Date(entry.date).toLocaleDateString()})`;
        listItem.style = "color: #FFCCBC; margin: 10px 0; font-size: 1.2em; font-weight: bold;";
        leaderboardList.appendChild(listItem);
      });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    }
  }

  function navigateToQuiz() {
    window.location.href = './quizz';
  }

  function navigateToFlashcards() {
    window.location.href = './flash';
  }

  fetchLeaderboard();
</script>

<style>
  /* Fire Animation */
  @keyframes flicker {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }

  /* Rock Shake Animation */
  @keyframes shake {
    0% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    50% { transform: translateX(5px); }
    75% { transform: translateX(-5px); }
    100% { transform: translateX(0); }
  }

  /* Fiery Pulse Animation */
  @keyframes firePulse {
    0% { transform: scale(1); background: linear-gradient(45deg, #D84315, #FF5722); }
    50% { transform: scale(1.1); background: linear-gradient(45deg, #FF7043, #FF3D00); }
    100% { transform: scale(1); background: linear-gradient(45deg, #D84315, #FF5722); }
  }

  /* Rumble Animation */
  @keyframes rumble {
    0% { transform: translate(0, 0); }
    25% { transform: translate(-2px, 2px); }
    50% { transform: translate(2px, -2px); }
    75% { transform: translate(-2px, -2px); }
    100% { transform: translate(0, 0); }
  }

  /* Floating Emojis */
  .floating-emoji {
    font-size: 3em;
    animation: float 5s infinite ease-in-out;
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }

  /* Button Hover Effect */
  button:hover {
    transform: scale(1.2);
    box-shadow: 0px 10px 25px rgba(0, 0, 0, 1);
  }
</style>

<!-- Back to Index Button -->
<div style="text-align: center; margin-top: 30px;">
  <button onclick="goToIndex()" 
          style="background: #BF360C; color: white; border: none; padding: 10px 20px; font-size: 1em; border-radius: 10px; cursor: pointer; box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.8); transition: transform 0.2s, box-shadow 0.2s;">
    🏃‍♂️ Escape to Index
  </button>
</div>

<script>
  function goToIndex() {
    window.location.href = '/cantella_frontend/';
  }
</script>
