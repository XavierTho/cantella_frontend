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

            // Basic data structure for events
            const events = [
                { title: 'Meeting', start: '2024-12-16' },
                { title: 'Conference', start: '2024-12-20', end: '2024-12-22' },
                { title: 'Birthday Party', start: '2024-12-25' }
            ];

            // Helper function to render the calendar
            function renderCalendar() {
                const today = new Date();
                const month = today.getMonth();
                const year = today.getFullYear();

                const firstDayOfMonth = new Date(year, month, 1);
                const lastDayOfMonth = new Date(year, month + 1, 0);

                const daysInMonth = lastDayOfMonth.getDate();
                const dayGrid = document.createElement('div');
                dayGrid.classList.add('fc-daygrid');

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
                            events.push(newEvent);
                            renderCalendar(); // Re-render calendar
                            alert('Event added!');
                        }
                    });

                    dayGrid.appendChild(dayDiv);
                }

                calendarEl.innerHTML = ''; // Clear existing content
                calendarEl.appendChild(dayGrid);
            }

            renderCalendar();
        });
    </script>
</body>
</html>
