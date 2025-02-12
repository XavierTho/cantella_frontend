---
layout: post
title: AP World History
permalink: classes/ap/world/home
---

<div class="ancient-archive" style="font-family: 'Papyrus', fantasy; background: url('https://i.imgur.com/old-parchment.jpg'), #2b1810; min-height: 100vh; padding: 20px; box-sizing: border-box; color: #d4b483;">
  
  <!-- Ancient Scroll Banner -->
  <div class="scroll-banner" style="background: url('https://i.imgur.com/scroll-texture.jpg'); padding: 20px; border-radius: 15px; text-align: center; margin: 20px auto; max-width: 600px; border: 3px solid #8b4513; box-shadow: 0 0 20px rgba(139,69,19,0.5); animation: unroll 2s ease-out;">
    <h1 style="color: #8b4513; font-size: 3em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);">📜 EXCAVATION IN PROGRESS 📜</h1>
    <p style="font-size: 1.5em; color: #5c3317; font-family: 'Times New Roman', serif;">Our historians are uncovering ancient knowledge!</p>
  </div>

  <!-- Animated Historical Elements -->
  <div class="artifacts-scene" style="text-align: center; margin: 40px 0;">
    <!-- Rotating Globe -->
    <div class="globe" style="font-size: 5em; animation: rotate 8s linear infinite;">
      🌏
      <div class="dust-particles" style="position: absolute; color: #d4b483; font-size: 0.3em;">
        ✧ ✦ ✧
      </div>
    </div>
    
    <!-- Floating Artifacts -->
    <div class="artifacts" style="font-size: 4em; animation: float 3s ease-in-out infinite;">
      🏺 📯 ⚔️
    </div>
    
    <!-- Glowing Monuments -->
    <div class="monuments" style="font-size: 3em; animation: glow 4s infinite;">
      🏛️ 🗿 🏰
    </div>
  </div>

  <!-- Time Period Message -->
  <div class="timeline-box" style="background: rgba(139,69,19,0.2); padding: 20px; border-radius: 15px; margin: 20px auto; max-width: 500px; text-align: center; border: 2px solid #8b4513;">
    <h2 style="color: #d4b483; font-family: 'Cinzel', serif;">Time Portal Opening Soon™</h2>
    <p style="font-size: 1.2em; color: #d4b483;">Chronicling the Ages of Humanity</p>
    <p style="font-family: 'Times New Roman', serif; color: #8b4513;">
      From Ancient Civilizations → Modern Era
    </p>
  </div>

  <!-- Back Button -->
  <div style="text-align: center; margin-top: 20px;">
    <button onclick="goToIndex()" 
            style="background: rgba(139,69,19,0.6); color: #d4b483; border: 2px solid #8b4513; padding: 10px 25px; font-size: 1.2em; border-radius: 8px; cursor: pointer; box-shadow: 0 0 15px rgba(139,69,19,0.2); transition: all 0.3s; font-family: 'Papyrus', fantasy;">
      🗿 Return to Present Day
    </button>
  </div>
</div>

<style>
  @keyframes unroll {
    0% { transform: scaleY(0); }
    100% { transform: scaleY(1); }
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes glow {
    0%, 100% { text-shadow: 0 0 20px #ffd700; }
    50% { text-shadow: 0 0 40px #ffd700; }
  }

  .dust-particles {
    animation: sparkle 3s infinite;
  }

  @keyframes sparkle {
    0% { opacity: 0; transform: translateY(0) rotate(0deg); }
    50% { opacity: 1; }
    100% { opacity: 0; transform: translateY(-30px) rotate(360deg); }
  }

  button:hover {
    background: rgba(139,69,19,0.6) !important;
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(139,69,19,0.5);
  }

  .timeline-box {
    position: relative;
    overflow: hidden;
  }

  .timeline-box::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(212,180,131,0.2), transparent);
    animation: timewave 3s infinite;
  }

  @keyframes timewave {
    0% { left: -100%; }
    100% { left: 100%; }
  }

  /* Add floating historical dates */
  .floating-date {
    position: absolute;
    color: #d4b483;
    opacity: 0.6;
    font-family: 'Times New Roman', serif;
  }
</style>

<script>
  function goToIndex() {
    window.location.href = '/cantella_frontend/';
  }

  // Create floating historical dates
  function createHistoricalDate() {
    const dates = ['476 CE', '1492 CE', '1776 CE', '1945 CE', '3000 BCE', '1066 CE', '1914 CE'];
    const date = document.createElement('div');
    date.className = 'floating-date';
    date.textContent = dates[Math.floor(Math.random() * dates.length)];
    date.style.left = Math.random() * 100 + 'vw';
    date.style.top = '-20px';
    date.style.animation = 'float 15s linear';
    document.querySelector('.ancient-archive').appendChild(date);
    setTimeout(() => date.remove(), 15000);
  }

  // Create floating dates periodically
  setInterval(createHistoricalDate, 2000);

  // Add scroll unfurling sound
  document.querySelector('.scroll-banner').addEventListener('click', () => {
    new Audio('https://example.com/scroll.mp3').play().catch(() => {});
  });
</script>
