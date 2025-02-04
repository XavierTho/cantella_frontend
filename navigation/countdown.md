---
layout: base
title: Countdown
description: Countdown
hide: true
---

<div id="countdown-container">
    <h2>Countdown Timers</h2>
    <div>
        <h3>Countdown to the Weekend</h3>
        <p id="weekend-countdown">Loading...</p>
    </div>
    <div>
        <h3>Countdown to Monday</h3>
        <p id="monday-countdown">Loading...</p>
    </div>
</div>

<style>
    #countdown-container {
        text-align: center;
        margin-top: 20px;
        font-family: Arial, sans-serif;
    }

    #countdown-container h3 {
        margin-bottom: 10px;
    }

    #weekend-countdown, #monday-countdown {
        font-size: 1.5em;
        color: #333;
        margin-top: 5px;
    }
</style>

<script>
  async function fetchCountdown(endpoint, elementId) {
      try {
          // Fetch countdown data from the API
          const response = await fetch(`http://127.0.0.1:8223/api/${endpoint}`);
          if (!response.ok) {
              throw new Error(`Failed to fetch ${endpoint} countdown data.`);
          }

          const data = await response.json();

          // Update the respective countdown timer
          const countdownElement = document.getElementById(elementId);
          countdownElement.textContent = `${data.days} days, ${data.hours} hours, ${data.minutes} minutes, and ${data.seconds} seconds`;
      } catch (error) {
          console.error(`Error fetching ${endpoint} countdown:`, error);
          const countdownElement = document.getElementById(elementId);
          countdownElement.textContent = `Unable to fetch ${endpoint} countdown data.`;
      }
  }

  // Update both countdowns every second
  setInterval(() => {
      fetchCountdown('countdown', 'weekend-countdown'); // For the weekend
      fetchCountdown('countdown-monday', 'monday-countdown'); // For Monday
  }, 1000);

  // Initial fetch for both countdowns
  fetchCountdown('countdown', 'weekend-countdown'); // For the weekend
  fetchCountdown('countdown-monday', 'monday-countdown'); // For Monday
</script>
