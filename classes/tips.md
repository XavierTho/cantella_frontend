---
layout: base
title: Tips & Tricks
description: Tips for Classes
hide: true
permalink: classes/tips
---

<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Cantella Tips & Tricks</title>
        <style>
            body {
                font-family: 'Poppins', sans-serif;
                margin: 0;
                padding: 0;
                background: linear-gradient(to bottom, #1A1A1D, #4E4E50); /* Dark gradient */
                color: #ffffff;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: flex-start;
                height: 100vh;
                overflow-x: hidden;
                padding: 20px;
            }
            h1 {
                text-align: center;
                font-size: 3rem;
                color: #FFFFFF;
                text-shadow: 0 0 15px #FF8A5B, 0 0 30px #FFD6A5;
                margin: 20px 0;
                text-transform: uppercase;
            }
            .neon-bar {
                height: 6px;
                width: 80%;
                background: linear-gradient(90deg, #FF8A5B, #FFD6A5, #FF8A5B);
                margin: 0 auto 20px auto;
                border-radius: 50px;
                animation: glow 2s infinite;
            }
            @keyframes glow {
                0%, 100% { box-shadow: 0 0 15px #FF8A5B; }
                50% { box-shadow: 0 0 30px #FFD6A5; }
            }
            .button-container {
                display: flex;
                justify-content: center;
                gap: 20px;
                margin-bottom: 30px;
                flex-wrap: wrap;
            }
            button {
                background: linear-gradient(to right, #FFA756, #FF8A5B); /* Bold cantaloupe gradient */
                color: white;
                font-size: 1.1rem;
                border: none;
                border-radius: 20px;
                padding: 12px 30px;
                cursor: pointer;
                text-transform: uppercase;
                font-weight: bold;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
                box-shadow: 0 0 15px rgba(255, 138, 91, 0.5), 0 0 30px rgba(255, 138, 91, 0.3);
            }
            button:hover {
                transform: scale(1.1);
                box-shadow: 0 0 30px rgba(255, 138, 91, 0.8), 0 0 50px rgba(255, 138, 91, 0.6);
            }
            .tips-container {
                background: rgba(255, 255, 255, 0.1); /* Transparent background for holographic feel */
                color: #FFFFFF; /* Light text for contrast */
                padding: 25px;
                border-radius: 20px;
                box-shadow: 0 0 15px rgba(255, 138, 91, 0.5), 0 0 30px rgba(255, 138, 91, 0.3);
                text-align: center;
                width: 90%;
                max-width: 700px;
                margin: auto;
                position: relative;
                animation: float 3s infinite ease-in-out;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .tips-container:hover {
                transform: translateY(-10px) scale(1.05);
                box-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 50px rgba(255, 215, 0, 0.5);
            }
            .tips-container h2 {
                font-size: 2rem;
                color: #FFD700; /* Bright yellow */
                margin-bottom: 15px;
            }
            .tip {
                display: none;
                font-size: 1.1rem;
                margin: 10px 0;
                padding: 12px;
                background: rgba(255, 255, 255, 0.15); /* Slightly opaque background */
                color: #FFD700; /* Yellow text for holographic effect */
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
                transition: transform 0.2s ease;
            }
            .tip.active {
                display: block;
                animation: fadeIn 0.5s ease-in-out;
            }
            @keyframes fadeIn {
                0% { opacity: 0; transform: translateY(10px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            @keyframes float {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(-10px); }
            }
            .reveal-button {
                margin-top: 20px;
                padding: 12px 30px;
                font-size: 1.2rem;
                border-radius: 20px;
                border: none;
                background: linear-gradient(to right, #FF8A5B, #FFA756); /* Bold cantaloupe gradient */
                color: white;
                cursor: pointer;
                font-weight: 700;
                transition: background 0.3s ease, transform 0.3s;
                box-shadow: 0px 4px 10px rgba(255, 138, 91, 0.3);
            }
            .reveal-button:hover {
                background: linear-gradient(to right, #FF6F3D, #FF8A5B);
                transform: scale(1.1);
                box-shadow: 0px 8px 20px rgba(255, 111, 61, 0.4);
            }
            footer {
                text-align: center;
                margin: 20px 0;
                color: rgba(255, 255, 255, 0.8);
                font-size: 0.9rem;
            }
        </style>
    </head>
    <body>
        <h1>Cantella Tips & Tricks</h1>
        <div class="neon-bar"></div>
        <div class="button-container">
            <button onclick="fetchTips('Physics')">AP Physics</button>
            <button onclick="fetchTips('Chemistry')">AP Chemistry</button>
            <button onclick="fetchTips('CSP')">AP CSP</button>
            <button onclick="fetchTips('Statistics')">AP Statistics</button>
        </div>
        <div id="tips-container" class="tips-container">
            <p>Select a class to reveal tips!</p>
        </div>
        <footer>
            Made by Armaghan Zarak 🍈
        </footer>
        <script>
            const apiUrl = 'http://127.0.0.1:8887/api/tips';
            let currentTipIndex = 0;
            async function fetchTips(className) {
                const tipsContainer = document.getElementById('tips-container');
                tipsContainer.innerHTML = `<p>Loading tips for ${className}...</p>`;
                try {
                    const response = await fetch(`${apiUrl}/${className}`);
                    if (response.ok) {
                        const data = await response.json();
                        currentTipIndex = 0; // Reset tip index for new class
                        tipsContainer.innerHTML = `
                            <h2>${data.class_name} Tips</h2>
                            <div id="tip-list">
                                ${data.tips.map(
                                    (tip, index) => `<div class="tip" id="tip-${index}">${tip}</div>`
                                ).join('')}
                            </div>
                            <button class="reveal-button" onclick="revealNextTip()">Reveal Next Tip</button>
                        `;
                    } else {
                        tipsContainer.innerHTML = `<p style="color: red;">Error: Unable to fetch tips for ${className}.</p>`;
                    }
                } catch (error) {
                    tipsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                }
            }
            function revealNextTip() {
                const tips = document.querySelectorAll('.tip');
                if (currentTipIndex < tips.length) {
                    tips[currentTipIndex].classList.add('active');
                    currentTipIndex++;
                } else {
                    alert('All tips revealed for this class!');
                }
            }
        </script>
    </body>
</html>