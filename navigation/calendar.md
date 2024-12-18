---
layout: post
title: Calendar
search_exclude: true
hide: true
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Collaborative Calendar</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }
        #calendar {
            max-width: 900px;
            margin: 50px auto;
            padding: 0 10px;
            border: 1px solid #ccc;
        }
        .fc-header-toolbar {
            margin-bottom: 20px;
        }
        .fc-daygrid {
            display: grid;
            grid-template-columns: repeat(7, 1fr);
            gap: 1px;
        }
        .fc-day {
            border: 1px solid #ddd;
            height: 100px;
            text-align: center;
            position: relative;
        }
        .fc-event {
            background-color: #007bff;
            color: white;
            padding: 5px;
            margin: 2px;
            border-radius: 3px;
            font-size: 0.85rem;
            position: absolute;
            left: 5px;
            right: 5px;
        }
    </style>
</head>
<body>
    <div id="calendar"></div>

<script>
        // Basic Calendar Implementation
        document.addEventListener('DOMContentLoaded', function() {
            const calendarEl = document.getElementById('calendar');

            // Fetch events from the backend
            async function fetchEvents() {
                try {
                    const response = await fetch('/api/events');
                    const data = await response.json();
                    return data;
                } catch (error) {
                    console.error('Error fetching events:', error);
                    return [];
                }
            }

            // Helper function to render the calendar
            async function renderCalendar() {
                const today = new Date();
                const month = today.getMonth();
                const year = today.getFullYear();

                const firstDayOfMonth = new Date(year, month, 1);
                const lastDayOfMonth = new Date(year, month + 1, 0);

                const daysInMonth = lastDayOfMonth.getDate();
                const dayGrid = document.createElement('div');
                dayGrid.classList.add('fc-daygrid');

                const events = await fetchEvents();

                for (let day = 1; day <= daysInMonth; day++) {
                    const date = new Date(year, month, day);
                    const dayDiv = document.createElement('div');
                    dayDiv.classList.add('fc-day');
                    dayDiv.setAttribute('data-date', date.toISOString().split('T')[0]);
                    dayDiv.innerHTML = `<strong>${day}</strong>`;

                    // Add events to the day
                    events.forEach(event => {
                        if (event.start === dayDiv.getAttribute('data-date')) {
                            const eventDiv = document.createElement('div');
                            eventDiv.classList.add('fc-event');
                            eventDiv.textContent = event.title;
                            dayDiv.appendChild(eventDiv);
                        }
                    });

                    dayDiv.addEventListener('click', function() {
                        const title = prompt('Enter event title:');
                        if (title) {
                            const newEvent = {
                                title: title,
                                start: dayDiv.getAttribute('data-date')
                            };
                            addEventToBackend(newEvent); // Send to backend
                            renderCalendar(); // Re-render calendar
                            alert('Event added!');
                        }
                    });

                    dayGrid.appendChild(dayDiv);
                }

                calendarEl.innerHTML = ''; // Clear existing content
                calendarEl.appendChild(dayGrid);
            }

            // Add event to backend
            async function addEventToBackend(event) {
                try {
                    await fetch('/api/events', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(event)
                    });
                } catch (error) {
                    console.error('Error adding event:', error);
                }
            }

            renderCalendar();
        });
    </script>
</body>
</html>
