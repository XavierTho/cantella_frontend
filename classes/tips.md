---
layout: base
title: Tips & Tricks
description: Tips for Classes
hide: true
permalink: classes/tips
---

<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Del Norte Tips & Tricks</title>
    <style>
        body {
            font-family: 'Poppins', sans-serif;
            margin: 0;
            padding: 0;
            background: linear-gradient(to bottom, #FFEDD5, #FFD6A5); /* Soft cantaloupe-inspired gradient */
            color: #333333; /* Dark text for contrast */
        }
        h1 {
            text-align: center;
            font-size: 3rem;
            color: #FF8C42; /* Vibrant cantaloupe orange */
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            margin-bottom: 30px;
            margin-top: 20px;
        }
        .button-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px;
            margin-bottom: 30px;
        }
        button {
            background: linear-gradient(to right, #FF8C42, #FFA756); /* Cantaloupe orange gradient */
            color: white;
            border: 3px solid #FFC371;
            padding: 15px 30px;
            font-size: 1rem;
            border-radius: 20px;
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            font-weight: bold;
            text-transform: uppercase;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        button:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
            background: linear-gradient(to right, #FFA756, #FFC371); /* Lighter hover effect */
        }
        .tips-container {
            margin-top: 20px;
            padding: 30px;
            border: 2px solid #FF8C42;
            border-radius: 25px;
            background: #FFF6ED; /* Soft cantaloupe flesh tone */
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
            color: #333333;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            text-align: center;
        }
        .tips-container h2 {
            color: #FF8C42;
            font-size: 2rem;
            margin-bottom: 15px;
        }
        .tips-container ul {
            list-style: none;
            padding: 0;
        }
        .tips-container ul li {
            font-size: 1.1rem;
            margin: 10px 0;
            padding: 10px;
            background: #FFF4E0; /* Soft highlight */
            border-radius: 10px;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
        }
        footer {
            text-align: center;
            margin-top: 50px;
            font-size: 0.9rem;
            color: #555555;
        }
    </style>
    <body>
        <h1>Del Norte Tips & Tricks</h1>
        <div class="button-container">
            <!-- Buttons for each class tips -->
            <button onclick="fetchTips('Physics')">AP Physics</button>
            <button onclick="fetchTips('Chemistry')">AP Chemistry</button>
            <button onclick="fetchTips('CSP')">AP CSP</button>
            <button onclick="fetchTips('Statistics')">AP Statistics</button>
        </div>
        <div id="tips-container" class="tips-container">
            <p>Select a class to view tips and tricks!</p>
        </div>
        <footer>
            <p>Designed by Armaghan Zarak🍈</p>
        </footer>
        <script>
            const apiUrl = 'http://127.0.0.1:8887/api/tips';
            async function fetchTips(className) {
                const tipsContainer = document.getElementById('tips-container');
                try {
                    const response = await fetch(`${apiUrl}/${className}`);
                    if (response.ok) {
                        const data = await response.json();
                        tipsContainer.innerHTML = `
                            <h2>${data.class_name} Tips</h2>
                            <ul>
                                ${data.tips.map(tip => `<li>${tip}</li>`).join('')}
                            </ul>
                        `;
                    } else {
                        tipsContainer.innerHTML = `
                            <p style="color: #FF4D4D;">Error: Unable to fetch tips for ${className}.</p>`;
                    }
                } catch (error) {
                    tipsContainer.innerHTML = `
                        <p style="color: #FF4D4D;">Error: ${error.message}</p>`;
                }
            }
        </script>
    </body>
</html>