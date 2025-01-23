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
                background: linear-gradient(to bottom, #1A1A1D, #4E4E50);
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
                background: linear-gradient(to right, #FFA756, #FF8A5B);
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
                background: rgba(255, 255, 255, 0.1);
                color: #FFFFFF;
                padding: 25px;
                border-radius: 20px;
                box-shadow: 0 0 15px rgba(255, 138, 91, 0.5), 0 0 30px rgba(255, 138, 91, 0.3);
                text-align: center;
                width: 90%;
                max-width: 700px;
                margin: auto;
                position: relative;
                transition: transform 0.3s ease, box-shadow 0.3s ease;
            }
            .tips-container h2 {
                font-size: 2rem;
                color: #FFD700;
                margin-bottom: 15px;
            }
            .tip {
                font-size: 1.1rem;
                margin: 10px 0;
                padding: 12px;
                background: rgba(255, 255, 255, 0.15);
                color: #FFD700;
                border-radius: 10px;
                box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
                transition: transform 0.2s ease;
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
            <button onclick="fetchPhysicsTips()">AP Physics</button>
            <button onclick="fetchChemistryTips()">AP Chemistry</button>
            <button onclick="fetchCSPTips()">AP CSP</button>
            <button onclick="fetchStatisticsTips()">AP Statistics</button>
        </div>
        <div id="tips-container" class="tips-container">
            <p>Select a class to reveal tips!</p>
        </div>
        <footer>
            Made by Armaghan Zarak 🍈
        </footer>
        <script>
            const apiBaseUrl = 'http://127.0.0.1:8887/api/tips';
            function fetchPhysicsTips() {
                const tipsContainer = document.getElementById('tips-container');
                tipsContainer.innerHTML = '<p>Loading tips for AP Physics...</p>';
                fetch(`${apiBaseUrl}/Physics`)
                    .then(response => response.json())
                    .then(data => {
                        displayTips(data.class_name, data.tips);
                    })
                    .catch(error => {
                        tipsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                    });
            }
            function fetchChemistryTips() {
                const tipsContainer = document.getElementById('tips-container');
                tipsContainer.innerHTML = '<p>Loading tips for AP Chemistry...</p>';
                fetch(`${apiBaseUrl}/Chemistry`)
                    .then(response => response.json())
                    .then(data => {
                        displayTips(data.class_name, data.tips);
                    })
                    .catch(error => {
                        tipsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                    });
            }
            function fetchCSPTips() {
                const tipsContainer = document.getElementById('tips-container');
                tipsContainer.innerHTML = '<p>Loading tips for AP CSP...</p>';
                fetch(`${apiBaseUrl}/CSP`)
                    .then(response => response.json())
                    .then(data => {
                        displayTips(data.class_name, data.tips);
                    })
                    .catch(error => {
                        tipsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                    });
            }
            function fetchStatisticsTips() {
                const tipsContainer = document.getElementById('tips-container');
                tipsContainer.innerHTML = '<p>Loading tips for AP Statistics...</p>';
                fetch(`${apiBaseUrl}/Statistics`)
                    .then(response => response.json())
                    .then(data => {
                        displayTips(data.class_name, data.tips);
                    })
                    .catch(error => {
                        tipsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
                    });
            }
            function displayTips(className, tips) {
                const tipsContainer = document.getElementById('tips-container');
                tipsContainer.innerHTML = `
                    <h2>${className} Tips</h2>
                    ${tips.map(tip => `<div class="tip">${tip}</div>`).join('')}
                `;
            }
        </script>
    </body>
</html>