---
layout: post
title: About Us
search_exclude: true
permalink: /about/
---

<script>
        // Fetch data from the backend
        fetch('http://127.0.0.1:5001/api/xavier')
            .then(response => response.json()) // Parse JSON response
            .then(data => {
                const container = document.getElementById('info-container');

                // Loop through the data to display each person's info
                data.forEach(person => {
                    // Create a div for each person's info
                    const personDiv = document.createElement('div');

                    // Add content to the div
                    personDiv.innerHTML = `
                        <p><strong>Name:</strong> ${person.FirstName} ${person.LastName}</p>
                        <p><strong>Email:</strong> ${person.Email}</p>
                        <p><strong>Residence:</strong> ${person.Residence}</p>
                        <hr>
                    `;

                    // Append the div to the container
                    container.appendChild(personDiv);
                });
            })
            .catch(error => console.error('Error fetching data:', error));
</script>