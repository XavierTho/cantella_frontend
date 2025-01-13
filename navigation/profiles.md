---
layout: base
title: Profiles
description: Profiles
hide: true
---

<html lang="en">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Profiles</title>
    <style>
        /* Basic styles for the page */
        body {
            font-family: 'Verdana', sans-serif;
            margin: 0;
            padding: 20px;
            background: linear-gradient(to bottom, #141e30, #243b55); /* Gradient background */
            color: #eeeeee; /* Light gray text for better contrast */
        }
        /* Styling the main title */
        h1 {
            text-align: center;
            font-size: 3rem; /* Big font size for the title */
            color: #ffffff;
            text-shadow: 2px 2px 4px #000000; /* Adds some depth to the text */
            margin-bottom: 30px;
        }
        /* Container to arrange buttons nicely */
        .button-container {
            display: flex;
            flex-wrap: wrap; /* Wrap buttons to the next line if they don't fit */
            justify-content: center;
            gap: 20px; /* Space between buttons */
            margin-bottom: 40px;
        }
        /* Styling for the buttons */
        button {
            background: linear-gradient(to right, #ff7e5f, #feb47b); /* Gradient for buttons */
            color: #ffffff; /* White text on buttons */
            border: none;
            padding: 20px 40px; /* Makes buttons big and clickable */
            font-size: 1.2rem; /* Slightly larger text */
            border-radius: 10px; /* Rounded corners for a modern look */
            cursor: pointer; /* Shows the pointer when hovering */
            transition: all 0.3s ease-in-out; /* Smooth animation on hover */
            box-shadow: 0 8px 15px rgba(0, 0, 0, 0.3); /* Slight shadow to lift buttons */
            font-weight: bold;
            text-transform: uppercase; /* Makes button text all caps */
        }
        /* Button hover effect */
        button:hover {
            background: linear-gradient(to right, #6a11cb, #2575fc); /* Change color when hovering */
            transform: scale(1.1); /* Slightly increase size */
            box-shadow: 0 12px 25px rgba(0, 0, 0, 0.5); /* Make the shadow more prominent */
        }
        /* The profile info card styling */
        .user-info {
            margin-top: 20px;
            padding: 30px;
            border: 1px solid #ffffff; /* White border */
            border-radius: 15px; /* Rounded corners */
            background: rgba(255, 255, 255, 0.1); /* Slightly transparent background */
            box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5); /* Shadow for a lifted effect */
            color: #ffffff; /* White text for readability */
            max-width: 600px; /* Keep the profile card a decent size */
            margin-left: auto;
            margin-right: auto; /* Center the card horizontally */
        }
        /* Style for the profile title inside the card */
        .user-info h2 {
            color: #ff7e5f; /* Orange color for the name */
            font-size: 2rem; /* Bigger text for the name */
            margin-bottom: 15px;
            text-align: center;
        }
        /* Styling for the details inside the profile card */
        .user-info p {
            font-size: 1.2rem; /* Decent font size for details */
            margin: 10px 0; /* Add some spacing between paragraphs */
        }
        /* Footer style */
        footer {
            text-align: center;
            margin-top: 50px;
            font-size: 1rem;
            color: #ffffff;
            text-shadow: 1px 1px 2px #000000; /* Slight shadow for better readability */
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
            const apiUrl = 'http://127.0.0.1:8887/api/data'; // This is the backend URL
                async function fetchUser(name) {
                const response = await fetch(`${apiUrl}/${name}`); // Make an API call with the student's name
                const userInfoDiv = document.getElementById('user-info'); // Get the profile display area
                if (response.ok) {
                    const data = await response.json(); // Parse the data from the API response
                    // Add the student's info to the profile card
                    userInfoDiv.innerHTML = `
                        <h2>${name}'s Profile</h2>
                        <p><strong>Classes:</strong> ${data.Classes.join(', ')}</p>
                        <p><strong>Favorite Class:</strong> ${data.FavoriteClass}</p>
                        <p><strong>Favorite Flashcard:</strong> ${data.FavoriteFlashcard}</p>
                        <p><strong>Grade:</strong> ${data.Grade}</p>
                    `;
                } else {
                    // Show an error message if something goes wrong
                    userInfoDiv.innerHTML = `<p style="color: #ff4d4d;">Error: Could not fetch data for ${name}.</p>`;
                }
            }
        </script>
    </body>
</html>
