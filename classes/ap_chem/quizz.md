---
layout: post
title: AP Chemistry
permalink: classes/ap/chem/quizz
---



<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AP Chemistry Quiz</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- ############################### -->
    <!-- # QUIZ CONTAINER               # -->
    <!-- ############################### -->
    <div id="quiz-container">
        
        <!-- ############################### -->
        <!-- # HEADER SECTION               # -->
        <!-- # Displays the quiz title      # -->
        <!-- ############################### -->
        <header>
            <h1>AP Chemistry Quiz</h1>
        </header>

        <!-- ############################### -->
        <!-- # QUESTION DISPLAY SECTION     # -->
        <!-- # Contains the quiz question   # -->
        <!-- # and multiple-choice options  # -->
        <!-- ############################### -->
        <section id="question-section">
            <div id="question-text">
                <!-- # Placeholder for dynamic question text -->
            </div>
            <div id="options-container">
                <!-- # Placeholder for dynamic answer options -->
            </div>
        </section>

        <!-- ############################### -->
        <!-- # TIMER SECTION                # -->
        <!-- # Displays the quiz timer      # -->
        <!-- ############################### -->
        <div id="timer-container">
            <span id="timer">00:00</span>
        </div>

        <!-- ############################### -->
        <!-- # PROGRESS BAR SECTION         # -->
        <!-- # Visual indicator of quiz     # -->
        <!-- # progress                     # -->
        <!-- ############################### -->
        <div id="progress-bar">
            <div id="progress"></div>
        </div>

        <!-- ############################### -->
        <!-- # NAVIGATION BUTTONS           # -->
        <!-- # Buttons to navigate through  # -->
        <!-- # quiz questions               # -->
        <!-- ############################### -->
        <div id="navigation-buttons">
            <button id="prev-button" onclick="prevQuestion()">Previous</button>
            <button id="next-button" onclick="nextQuestion()">Next</button>
        </div>

        <!-- ############################### -->
        <!-- # SUBMIT BUTTON                # -->
        <!-- # Button to submit quiz        # -->
        <!-- ############################### -->
        <div id="submit-container">
            <button id="submit-button" onclick="submitQuiz()">Submit Quiz</button>
        </div>

        <!-- ############################### -->
        <!-- # RESULTS SECTION              # -->
        <!-- # Displays feedback and results# -->
        <!-- # after quiz submission        # -->
        <!-- ############################### -->
        <section id="results-section" hidden>
            <h2>Quiz Results</h2>
            <div id="feedback-container">
                <!-- # Placeholder for feedback -->
            </div>
            <button onclick="restartQuiz()">Restart Quiz</button>
        </section>
    </div>

    <script src="quiz.js"></script>
</body>
</html>
