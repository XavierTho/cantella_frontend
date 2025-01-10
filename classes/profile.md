---
layout: base
title: Profiles
description: Profiles
hide: true
permalink: classes/profile
---

<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Profiles</title>
    <style>
        body {
            font-family: 'Verdana', sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(to bottom, #141e30, #243b55); /* Dark gradient background */
            color: #eeeeee; /* Light gray text */
        }
        h1 {
            text-align: center;
            font-size: 3rem;
            color: #ffffff;
            text-shadow: 2px 2px 4px #000000;
            margin-bottom: 30px;
        }
        .button-container {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-bottom: 40px;
        }
        button {
            background: linear-gradient(to right, #ff7e5f, #feb47b); /* Gradient button */
            color: #ffffff; /* White text for button */
            border: none;
            padding: 20px 40px;
            font-size: 1.2rem;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease-in-out;
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3);
            font-weight: bold;
            text-transform: uppercase;
        }
        button:hover {
            background: linear-gradient(to right, #6a11cb, #2575fc); /* Change gradient on hover */
            transform: scale(1.1);
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5);
        }
        .user-info {
            margin-top: 20px;
            padding: 30px;
            border: 1px solid #ffffff;
            border-radius: 15px;
            background: rgba(255, 255, 255, 0.1); /* Transparent white background */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            color: #ffffff; /* White text for profile info */
            max-width: 600px;
            margin-left: auto;
            margin-right: auto;
        }
        .user-info h2 {
            color: #ff7e5f;
            font-size: 2rem;
            margin-bottom: 15px;
            text-align: center;
        }
        .user-info p {
            font-size: 1.2rem;
            margin: 10px 0;
        }
        footer {
            text-align: center;
            margin-top: 50px;
            font-size: 1rem;
            color: #ffffff;
            text-shadow: 1px 1px 2px #000000;
        }
    </style>
    <body>
        <h1>Student Profiles</h1>
        <div class="button-container">
            <!-- Buttons for each student's profile -->
            <button onclick="fetchUser('Thomas')">Thomas's Profile</button>
            <button onclick="fetchUser('Grace')">Grace's Profile</button>
            <button onclick="fetchUser('Nicholas')">Nicholas's Profile</button>
            <button onclick="fetchUser('Xavier')">Xavier's Profile</button>
            <button onclick="fetchUser('Armaghan')">Armaghan's Profile</button>
            <button onclick="fetchUser('Arush')">Arush's Profile</button>
        </div>
        <div id="user-info" class="user-info"></div>
        <script>
            const apiUrl = 'http://127.0.0.1:8887/api/data';
            async function fetchUser(name) {
                const response = await fetch(`${apiUrl}/${name}`);
                const userInfoDiv = document.getElementById('user-info');
                if (response.ok) {
                    const data = await response.json();
                    userInfoDiv.innerHTML = `
                        <h2>${name}'s Profile</h2>
                        <p><strong>Classes:</strong> ${data.Classes.join(', ')}</p>
                        <p><strong>Favorite Class:</strong> ${data.FavoriteClass}</p>
                        <p><strong>Favorite Flashcard:</strong> ${data.FavoriteFlashcard}</p>
                        <p><strong>Grade:</strong> ${data.Grade}</p>
                    `;
                } else {
                    userInfoDiv.innerHTML = `<p style="color: #ff4d4d;">Error: Could not fetch data for ${name}.</p>`;
                }
            }
        </script>
    </body>
</html>