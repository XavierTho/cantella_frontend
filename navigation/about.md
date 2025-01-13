---
layout: post
title: About Us
search_exclude: true
permalink: /about/
---

<div id="about-page-container">
    <h1>About Us</h1>
    <p>Learn more about our team and our mission below.</p>

    <!-- Dynamic Data Container -->
    <div id="about-container">
        <h2>Team Members</h2>
        <p>Fetching data...</p>
    </div>
</div>

<style>
    #about-page-container {
        margin: 20px;
        font-family: Arial, sans-serif;
    }

    #about-container {
        margin-top: 20px;
        padding: 15px;
        border: 1px solid #ddd;
        border-radius: 8px;
        background-color: #f9f9f9;
    }

    .info-block {
        margin-bottom: 20px;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 5px;
        background-color: #ffffff;
        box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.1);
        color: #000; /* Ensure text is black */
    }

    .info-block h3 {
        margin: 0 0 10px;
        font-size: 1.5em;
        color: #000; /* Ensure headers are black */
    }

    .info-block p {
        margin: 5px 0;
        font-size: 1em;
        color: #000; /* Ensure paragraphs are black */
    }

    .error-message {
        color: red;
        font-weight: bold;
        margin-top: 20px;
    }
</style>


<script>
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            // API URL
            const apiUrl = 'http://127.0.0.1:5001/api/zafeer';

            // Fetch data from the API
            const response = await fetch(apiUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Optional, depending on backend configuration
            });

            // Check if the response is successful
            if (!response.ok) {
                throw new Error('Failed to fetch data from the API');
            }

            // Parse the JSON response
            const data = await response.json();
            console.log('Fetched API Data:', data);

            // Get the container where data will be displayed
            const aboutContainer = document.getElementById('about-container');

            // Clear the "Fetching data..." placeholder
            aboutContainer.innerHTML = '';

            // Add data dynamically
            data.forEach((info) => {
                const infoBlock = `
                    <div class="info-block">
                        <h3>${info.FirstName} ${info.LastName}</h3>
                        <p><strong>Date of Birth:</strong> ${info.DOB}</p>
                        <p><strong>Residence:</strong> ${info.Residence}</p>
                        <p><strong>Email:</strong> ${info.Email}</p>
                    </div>
                `;

                aboutContainer.innerHTML += infoBlock;
            });
        } catch (error) {
            console.error('Error fetching API data:', error);

            // Display an error message to the user
            const aboutContainer = document.getElementById('about-container');
            aboutContainer.innerHTML = `
                <p class="error-message">Unable to fetch data at this time. Please try again later.</p>
            `;
        }
    });
</script>
