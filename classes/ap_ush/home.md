---
layout: post
title: AP US History
permalink: classes/ap/ush/home
---

<div class="freedom-container" style="font-family: 'Times New Roman', serif; background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://i.imgur.com/eagle-background.jpg'); min-height: 100vh; padding: 20px; box-sizing: border-box; color: #fff; position: relative; overflow: hidden;">
  
  <!-- Patriotic Banner -->
  <div class="patriotic-banner" style="background: rgba(25,25,112,0.8); padding: 20px; border-radius: 15px; text-align: center; margin: 20px auto; max-width: 600px; border: 3px solid #bf0a30; box-shadow: 0 0 20px rgba(255,255,255,0.3); animation: wave 4s infinite;">
    <h1 style="color: #fff; font-size: 3em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">
      🦅 FREEDOM LOADING... 🦅
    </h1>
    <p style="font-size: 1.5em; color: #fff; font-family: 'Times New Roman', serif;">
      Preparing to make history great again!
    </p>
  </div>

  <!-- Floating American Symbols -->
  <div class="patriotic-scene" style="text-align: center; margin: 40px 0; position: relative; z-index: 1;">
    <!-- Flying Eagles -->
    <div class="eagles" style="font-size: 4em; animation: soar 6s infinite;">
      🦅 🦅 🦅
    </div>
    
    <!-- Waving Flags -->
    <div class="flags" style="font-size: 3em; animation: wave 3s infinite;">
      🇺🇸 🗽 🇺🇸
    </div>
    
    <!-- Historical Icons -->
    <div class="icons" style="font-size: 2.5em; animation: bounce 4s infinite;">
      🎖️ ⭐ 🔔
    </div>
  </div>

  <!-- Epic Message -->
  <div class="constitution-box" style="background: rgba(25,25,112,0.6); padding: 20px; border-radius: 15px; margin: 20px auto; max-width: 500px; text-align: center; border: 2px solid #bf0a30;">
    <h2 style="color: #fff; font-family: 'Times New Roman', serif; text-transform: uppercase;">We The Students...</h2>
    <p style="font-size: 1.2em; color: #fff;">Are preparing to establish the most perfect study materials!</p>
    <div class="stars-and-stripes" style="margin: 15px 0;">
      ⭐⭐⭐⭐⭐
      <div style="height: 2px; background: linear-gradient(90deg, #bf0a30, #fff, #bf0a30); margin: 5px 0;"></div>
    </div>
  </div>

  <!-- Take Quiz Button -->
  <div style="text-align: center; margin-top: 30px;">
    <button onclick="navigateToQuiz()" 
            style="background: linear-gradient(45deg, #002868, #041E42); color: #fff; border: 3px solid #bf0a30; padding: 15px 40px; font-size: 1.5em; border-radius: 10px; cursor: pointer; box-shadow: 0 0 15px rgba(255,255,255,0.3); transition: all 0.3s;">
      🎖️ ACCEPT THE CHALLENGE OF LIBERTY 🎖️
    </button>
  </div>

  <!-- Back Button -->
  <div style="text-align: center; margin-top: 20px;">
    <button onclick="goToIndex()" 
            style="background: rgba(25,25,112,0.8); color: #fff; border: 2px solid #bf0a30; padding: 10px 25px; font-size: 1.2em; border-radius: 8px; cursor: pointer; box-shadow: 0 0 15px rgba(255,255,255,0.2); transition: all 0.3s;">
      🗽 Return to the Union
    </button>
  </div>
</div>

<style>
  @keyframes wave {
    0%, 100% { transform: rotate(-2deg); }
    50% { transform: rotate(2deg); }
  }

  @keyframes soar {
    0% { transform: translateX(-100vw) translateY(0); }
    50% { transform: translateX(0) translateY(-30px); }
    100% { transform: translateX(100vw) translateY(0); }
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  button:hover {
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(255,255,255,0.5);
    background: linear-gradient(45deg, #bf0a30, #002868) !important;
  }

  /* Star spangled animation */
  .stars-and-stripes {
    animation: glow 2s infinite;
  }

  @keyframes glow {
    0%, 100% { text-shadow: 0 0 10px #fff; }
    50% { text-shadow: 0 0 20px #fff, 0 0 30px #bf0a30; }
  }
</style>

<script>
  function goToIndex() {
    window.location.href = '/cantella_frontend/';
  }

  function navigateToQuiz() {
    window.location.href = './quizz';
  }

  // Create floating stars
  function createStar() {
    const star = document.createElement('div');
    star.textContent = '⭐';
    star.style.position = 'absolute';
    star.style.left = Math.random() * 100 + 'vw';
    star.style.top = '-20px';
    star.style.fontSize = '20px';
    star.style.animation = 'fall 3s linear';
    document.querySelector('.freedom-container').appendChild(star);
    setTimeout(() => star.remove(), 3000);
  }

  // Create stars periodically
  setInterval(createStar, 1000);

  // Play patriotic sound on banner click
  document.querySelector('.patriotic-banner').addEventListener('click', () => {
    new Audio('https://example.com/patriotic.mp3').play().catch(() => {});
  });
</script>
