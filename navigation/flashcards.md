---
layout: base
title: Flashcards
description: Flashcards
hide: true
---

# Welcome to The Flashcards Page

<style>
  .flashcard-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px; /* Space between button and flashcards */
  }

  .flashcard {
    width: 200px;
    height: 150px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: transform 0.3s ease;
    position: relative; /* For positioning labels */
    font-family: Arial, sans-serif;
  }

  .flashcard .side-label {
    position: absolute;
    top: 5px;
    left: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 4px;
  }

  .flashcard.front {
    background-color: #333; /* Dark grey for the question */
    color: white;
    border: 2px solid #444;
  }

  .flashcard.back {
    background-color: #f9f9f9; /* Light grey for the answer */
    color: black;
    border: 2px solid #ccc;
  }

  .flashcard:hover {
    transform: scale(1.05); /* Subtle zoom on hover */
  }

  .hidden {
    display: none;
  }

  #add-card-form {
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 10px;
  }
</style>

<div id="flashcard-app">
  <button id="create-card-btn">Make Flashcard</button>
  <div id="add-card-form" class="hidden">
    <div class="form-group">
      <label for="class-name">Class:</label>
      <input type="text" id="class-name" placeholder="Enter class name">
    </div>
    <div class="form-group">
      <label for="question">Question:</label>
      <input type="text" id="question" placeholder="Enter the question">
    </div>
    <div class="form-group">
      <label for="answer">Answer:</label>
      <input type="text" id="answer" placeholder="Enter the answer">
    </div>
    <button id="add-card-btn">Add Flashcard</button>
  </div>

  <div class="flashcard-container" id="flashcard-container"></div>
</div>

<script>
  const createCardBtn = document.getElementById('create-card-btn');
  const addCardForm = document.getElementById('add-card-form');
  const flashcardContainer = document.getElementById('flashcard-container');

  // Show the flashcard creation form
  createCardBtn.addEventListener('click', () => {
    addCardForm.classList.toggle('hidden');
  });

  // Add a new flashcard
  document.getElementById('add-card-btn').addEventListener('click', () => {
    const className = document.getElementById('class-name').value.trim();
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();

    if (className && question && answer) {
      const flashcard = document.createElement('div');
      flashcard.classList.add('flashcard', 'front');
      flashcard.innerHTML = `
        <div class="side-label">Question</div>
        <div>${className}: ${question}</div>
      `;

      // Toggle between question and answer on click
      flashcard.addEventListener('click', () => {
        const isFront = flashcard.classList.contains('front');
        flashcard.classList.toggle('front', !isFront);
        flashcard.classList.toggle('back', isFront);
        flashcard.innerHTML = isFront
          ? `<div class="side-label">Answer</div><div>${answer}</div>`
          : `<div class="side-label">Question</div><div>${className}: ${question}</div>`;
      });

      flashcardContainer.appendChild(flashcard);

      // Clear form fields
      document.getElementById('class-name').value = '';
      document.getElementById('question').value = '';
      document.getElementById('answer').value = '';
      addCardForm.classList.add('hidden'); // Hide form after adding
    } else {
      alert('Please fill in all fields.');
    }
  });
</script>
