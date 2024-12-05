---
layout: base
title: Flashcards
description: Flashcards
hide: true
---

# Welcome to The Flashcards Page

<style>
  .deck-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
  }

  .deck {
    width: 200px;
    height: 100px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #f6af75;
    color: white;
    transition: transform 0.3s ease;
    border: 2px solid #555;
  }

  .deck:hover {
    transform: scale(1.05);
    background-color: #edccb9;
  }

  .hidden {
    display: none;
  }

  #add-deck-form {
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 10px;
  }

  .flashcard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  .flashcard {
    width: 300px;
    height: 200px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #f6af75; /* Default for question side */
    color: black;
    border: 2px solid #444;
    margin-bottom: 10px;
  }

  .flashcard.answer {
    background-color: #edccb9; /* light canteloupe for answer side */
  }

  .flashcard:hover {
    background-color: #d9a586;
    transform: scale(1.05);
  }
</style>

<div id="flashcard-app">
  <button id="create-deck-btn">Make Deck</button>
  <div id="add-deck-form" class="hidden">
    <div id="deck-info-phase">
      <div class="form-group">
        <label for="deck-title">Deck Title:</label>
        <input type="text" id="deck-title" placeholder="Enter deck title">
      </div>
      <button id="next-phase-btn">Next</button>
    </div>
    <div id="question-phase" class="hidden">
      <div class="form-group">
        <label for="question">Question:</label>
        <input type="text" id="question" placeholder="Enter question">
      </div>
      <div class="form-group">
        <label for="answer">Answer:</label>
        <input type="text" id="answer" placeholder="Enter answer">
      </div>
      <button id="add-card-btn">Add Flashcard</button>
      <button id="finish-deck-btn">Finish Deck</button>
    </div>
  </div>

  <div class="deck-container" id="deck-container"></div>
  <div class="flashcard-container hidden" id="flashcard-container">
    <div class="flashcard hidden" id="flashcard"></div>
    <button id="next-card-btn" class="hidden">Next Card</button>
    <button id="close-deck-btn" class="hidden">Close Deck</button>
  </div>
</div>

<script>
  const createDeckBtn = document.getElementById('create-deck-btn');
  const addDeckForm = document.getElementById('add-deck-form');
  const deckInfoPhase = document.getElementById('deck-info-phase');
  const questionPhase = document.getElementById('question-phase');
  const deckContainer = document.getElementById('deck-container');
  const flashcardContainer = document.getElementById('flashcard-container');
  const flashcard = document.getElementById('flashcard');
  const nextCardBtn = document.getElementById('next-card-btn');
  const closeDeckBtn = document.getElementById('close-deck-btn');

  let decks = []; // Array to store all decks
  let currentDeck = null; // Deck currently being viewed
  let currentCardIndex = 0; // Index of the current card being viewed

  // Show deck creation form
  createDeckBtn.addEventListener('click', () => {
    addDeckForm.classList.remove('hidden');
    deckInfoPhase.classList.remove('hidden');
    questionPhase.classList.add('hidden');
  });

  // Proceed to question creation phase
  document.getElementById('next-phase-btn').addEventListener('click', () => {
    const deckTitle = document.getElementById('deck-title').value.trim();

    if (deckTitle) {
      currentDeck = { title: deckTitle, cards: [] };
      decks.push(currentDeck);
      deckInfoPhase.classList.add('hidden');
      questionPhase.classList.remove('hidden');
    } else {
      alert('Please provide a deck title.');
    }
  });

  // Add a flashcard to the current deck
  document.getElementById('add-card-btn').addEventListener('click', () => {
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();

    if (question && answer) {
      currentDeck.cards.push({ question, answer });
      document.getElementById('question').value = '';
      document.getElementById('answer').value = '';
    } else {
      alert('Please provide a question and an answer.');
    }
  });

  // Finish creating the deck
  document.getElementById('finish-deck-btn').addEventListener('click', () => {
    addDeckForm.classList.add('hidden');
    displayDeck(currentDeck);
  });

  // Display the deck in the deck container
  function displayDeck(deck) {
    const deckElement = document.createElement('div');
    deckElement.classList.add('deck');
    deckElement.innerHTML = `
      <h3>${deck.title}</h3>
      <button class="open-deck-btn">Open Deck</button>
    `;

    deckElement.querySelector('.open-deck-btn').addEventListener('click', () => {
      openDeck(deck);
    });

    deckContainer.appendChild(deckElement);
  }

  // Open the deck and show flashcards
  function openDeck(deck) {
    currentDeck = deck;
    currentCardIndex = 0;
    showFlashcard(deck.cards[currentCardIndex]);
    flashcardContainer.classList.remove('hidden');
    deckContainer.classList.add('hidden');
    nextCardBtn.classList.remove('hidden');
    closeDeckBtn.classList.remove('hidden');
  }

  // Show the current flashcard
  function showFlashcard(card) {
    flashcard.textContent = card.question;
    flashcard.classList.remove('hidden');
    flashcard.classList.remove('answer');
    flashcard.onclick = () => {
      if (flashcard.textContent === card.question) {
        flashcard.textContent = card.answer;
        flashcard.classList.add('answer');
      } else {
        flashcard.textContent = card.question;
        flashcard.classList.remove('answer');
      }
    };
  }

  // Show the next card
  nextCardBtn.addEventListener('click', () => {
    if (currentDeck.cards.length > 0) {
      currentCardIndex = (currentCardIndex + 1) % currentDeck.cards.length;
      showFlashcard(currentDeck.cards[currentCardIndex]);
    }
  });

  // Close the deck and return to deck view
  closeDeckBtn.addEventListener('click', () => {
    flashcardContainer.classList.add('hidden');
    deckContainer.classList.remove('hidden');
    nextCardBtn.classList.add('hidden');
    closeDeckBtn.classList.add('hidden');
  });
</script>
