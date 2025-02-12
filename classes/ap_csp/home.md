---
layout: post
title: AP Computer Science Principles
permalink: classes/ap/csp/home
---

<div class="matrix-terminal" style="font-family: 'Courier New', monospace; background: #000; min-height: 100vh; padding: 20px; box-sizing: border-box; color: #0f0; position: relative; overflow: hidden;">
  
  <!-- Terminal Header -->
  <div class="error-banner" style="background: #1a1a1a; padding: 20px; border-radius: 15px; text-align: center; margin: 20px auto; max-width: 600px; border: 2px solid #ff0000; box-shadow: 0 0 20px rgba(255,0,0,0.3); animation: glitch 1s infinite;">
    <h1 style="color: #ff0000; font-size: 3em; margin-bottom: 10px; text-shadow: 2px 2px 4px rgba(255,0,0,0.5);">
      <span style="animation: flicker 0.5s infinite">SYSTEM OVERLOAD</span> 💀
    </h1>
    <p style="font-size: 1.5em; color: #0f0; font-family: monospace;">
      Initializing AP CSP torture chamber...
    </p>
  </div>

  <!-- Matrix Rain Effect -->
  <div id="matrix-rain"></div>

  <!-- Animated Tech Elements -->
  <div class="tech-scene" style="text-align: center; margin: 40px 0; position: relative; z-index: 1;">
    <!-- Floating Error Messages -->
    <div class="error-messages" style="font-size: 1.2em; animation: float 3s ease-in-out infinite;">
      <div style="color: #ff0000;">SEGMENTATION FAULT</div>
      <div style="color: #ff0000;">STACK OVERFLOW</div>
      <div style="color: #ff0000;">NULL POINTER EXCEPTION</div>
    </div>
    
    <!-- Animated Binary -->
    <div class="binary" style="font-size: 2em; animation: type 4s steps(30) infinite;">
      01001000 01000101 01001100 01010000
    </div>
    
    <!-- Floating Tech Icons -->
    <div class="tech-icons" style="font-size: 3em; animation: spin 4s infinite;">
      💻 🔥 ⚡ 
    </div>
  </div>

  <!-- Warning Message -->
  <div class="warning-box" style="background: rgba(255,0,0,0.1); padding: 20px; border-radius: 15px; margin: 20px auto; max-width: 500px; text-align: center; border: 2px solid #ff0000;">
    <h2 style="color: #0f0; font-family: monospace;">LOADING PAIN.EXE</h2>
    <p style="font-size: 1.2em; color: #0f0;">Preparing to melt your brain with:</p>
    <div class="loading-bar" style="height: 20px; background: #1a1a1a; border: 1px solid #0f0; margin: 10px 0;">
      <div style="width: 60%; height: 100%; background: #0f0; animation: load 2s infinite;"></div>
    </div>
    <p style="font-family: monospace; color: #ff0000;">
      Arrays start at 0, and your GPA might too
    </p>
  </div>

  <!-- Back Button -->
  <div style="text-align: center; margin-top: 20px;">
    <button onclick="goToIndex()" 
            style="background: #1a1a1a; color: #ff0000; border: 2px solid #ff0000; padding: 10px 25px; font-size: 1.2em; border-radius: 8px; cursor: pointer; box-shadow: 0 0 15px rgba(255,0,0,0.2); transition: all 0.3s; font-family: 'Courier New', monospace;">
      CTRL + C (Emergency Exit)
    </button>
  </div>
</div>

<style>
  @keyframes glitch {
    0% { transform: skew(0deg); }
    20% { transform: skew(-2deg); }
    40% { transform: skew(2deg); }
    60% { transform: skew(-2deg); }
    80% { transform: skew(2deg); }
    100% { transform: skew(0deg); }
  }

  @keyframes flicker {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes type {
    from { width: 0; }
    to { width: 100%; }
  }

  @keyframes load {
    0% { background-position: -200px 0; }
    100% { background-position: 200px 0; }
  }

  .matrix-rain {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }

  button:hover {
    background: #0f0 !important;
    color: #000 !important;
    transform: scale(1.1);
    animation: glitch 0.3s infinite;
  }

  .error-messages div {
    margin: 10px;
    text-shadow: 0 0 10px #ff0000;
  }
</style>

<script>
  function goToIndex() {
    window.location.href = '/cantella_frontend/';
  }

  // Create Matrix rain effect
  function createMatrixRain() {
    const chars = '01'.split('');
    const rain = document.createElement('div');
    rain.className = 'matrix-rain';
    rain.style.left = Math.random() * 100 + 'vw';
    rain.style.animationDuration = Math.random() * 2 + 1 + 's';
    rain.style.opacity = Math.random() + 0.5;
    rain.textContent = chars[Math.floor(Math.random() * chars.length)];
    document.querySelector('.matrix-terminal').appendChild(rain);
    setTimeout(() => rain.remove(), 2000);
  }

  // Create Matrix rain periodically
  setInterval(createMatrixRain, 100);

  // Add error sound effects
  document.querySelector('.error-banner').addEventListener('click', () => {
    new Audio('https://example.com/error.mp3').play().catch(() => {});
  });

  // Easter egg: Konami code handler
  let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        document.body.style.animation = 'matrix-flip 2s';
        setTimeout(() => document.body.style.animation = '', 2000);
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
</script>
