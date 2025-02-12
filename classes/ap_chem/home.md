---
layout: post
title: AP Chemistry
permalink: classes/ap/chem/home
---

<div class="chemistry-lab" style="font-family: 'Courier New', monospace; background: linear-gradient(45deg, #1a1a1a, #2d2d2d); min-height: 100vh; padding: 20px; box-sizing: border-box; color: #00ff00;">
  
  <!-- Lab Warning Banner -->
  <div class="warning-banner" style="background: #333; padding: 20px; border-radius: 15px; text-align: center; margin: 20px auto; max-width: 600px; border: 2px solid #ff0; box-shadow: 0 0 20px rgba(255,255,0,0.3); animation: pulse 2s infinite;">
    <h1 style="color: #ff0; font-size: 3em; margin-bottom: 10px; text-shadow: 0 0 10px #ff0;">⚗️ LAB IN PROGRESS ⚗️</h1>
    <p style="font-size: 1.5em; color: #0f0;">Our scientists are still mixing the perfect formula!</p>
  </div>

  <!-- Animated Lab Elements -->
  <div class="lab-scene" style="text-align: center; margin: 40px 0;">
    <!-- Bubbling Beaker -->
    <div class="beaker" style="font-size: 5em; animation: bubble 2s infinite;">
      🧪
      <div class="bubbles" style="position: absolute; color: #0ff; font-size: 0.3em;">
        ⚬ ⚬ ⚬
      </div>
    </div>
    
    <!-- Spinning Molecule -->
    <div class="molecule" style="font-size: 4em; animation: spin 4s linear infinite;">
      ⚛️
    </div>
    
    <!-- Flashing Lab Equipment -->
    <div class="equipment" style="font-size: 3em; animation: flash 3s infinite;">
      🔬 ⚗️ 🧫
    </div>
  </div>

  <!-- Chemical Message -->
  <div class="formula-box" style="background: #333; padding: 20px; border-radius: 15px; margin: 20px auto; max-width: 500px; text-align: center; border: 2px solid #0ff;">
    <h2 style="color: #0ff; font-family: 'Courier New', monospace;">Coming Soon™</h2>
    <p style="font-size: 1.2em; color: #0f0;">Synthesizing Educational Excellence</p>
    <p style="font-family: monospace; color: #ff0;">
      2(Knowledge) + Effort → Success + Energy
    </p>
  </div>

  <!-- Back Button -->
  <div style="text-align: center; margin-top: 20px;">
    <button onclick="goToIndex()" 
            style="background: #333; color: #0f0; border: 2px solid #0f0; padding: 10px 25px; font-size: 1.2em; border-radius: 8px; cursor: pointer; box-shadow: 0 0 15px rgba(0,255,0,0.3); transition: all 0.3s;">
      🧪 Return to Safe Zone
    </button>
  </div>
</div>

<style>
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.05); opacity: 0.9; }
  }

  @keyframes bubble {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-15px); }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes flash {
    0%, 100% { opacity: 1; text-shadow: 0 0 20px #0ff; }
    50% { opacity: 0.5; text-shadow: 0 0 10px #0ff; }
  }

  .bubbles {
    animation: float 2s infinite;
  }

  @keyframes float {
    0% { transform: translateY(0) translateX(-50%); opacity: 0; }
    50% { opacity: 1; }
    100% { transform: translateY(-40px) translateX(-30%); opacity: 0; }
  }

  button:hover {
    background: #0f0 !important;
    color: #000 !important;
    transform: scale(1.1);
    box-shadow: 0 0 30px rgba(0,255,0,0.5);
  }

  .formula-box {
    position: relative;
    overflow: hidden;
  }

  .formula-box::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(0,255,255,0.2), transparent);
    animation: scan 3s infinite;
  }

  @keyframes scan {
    0% { left: -100%; }
    100% { left: 100%; }
  }
</style>

<script>
  function goToIndex() {
    window.location.href = '/cantella_frontend/';
  }

  // Add some fun lab sounds
  document.querySelector('.beaker').addEventListener('click', () => {
    new Audio('https://example.com/bubble.mp3').play().catch(() => {});
  });

  // Create floating chemical formulas
  function createFormula() {
    const formulas = ['H₂O', 'NaCl', 'CO₂', 'C₆H₁₂O₆', 'H₂SO₄'];
    const formula = document.createElement('div');
    formula.textContent = formulas[Math.floor(Math.random() * formulas.length)];
    formula.style.position = 'absolute';
    formula.style.left = Math.random() * 100 + 'vw';
    formula.style.top = '-20px';
    formula.style.color = '#0ff';
    formula.style.animation = 'fall 10s linear';
    document.querySelector('.chemistry-lab').appendChild(formula);
    setTimeout(() => formula.remove(), 10000);
  }

  setInterval(createFormula, 2000);
</script>



