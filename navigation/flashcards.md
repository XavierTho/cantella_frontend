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

document.getElementById('add-card-btn').addEventListener('click', async () => {
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();

    if (question && answer) {
        try {
            // Define the backend URL
            const backendURL = 'http://127.0.0.1:8887/api/flashcard';

            // Prepare the payload for the POST request
            const flashcardData = {
                title: question,
                content: answer,
                user_id: 1 // Replace with the appropriate user_id if necessary
            };

            // Send the POST request to the backend
            const response = await fetch(backendURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(flashcardData),
                credentials: 'include' // Include cookies in the request
            });

            // Handle the response
            if (response.ok) {
                const result = await response.json();
                alert('Flashcard created successfully!');
                console.log('Flashcard created:', result);

                // Add the flashcard to the currentDeck.cards array
                if (currentDeck) {
                    currentDeck.cards.push({
                        question: result.title,
                        answer: result.content,
                    });
                }

                // Reset the form fields after success
                document.getElementById('question').value = '';
                document.getElementById('answer').value = '';
            } else {
                const errorText = await response.text();
                alert('Failed to create flashcard, please login or sign up to be an authenticated user!');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the flashcard.');
        }
    } else {
        alert('Please provide both a question and an answer.');
    }
});


// Finish creating the deck
document.getElementById('finish-deck-btn').addEventListener('click', () => {
    if (!currentDeck) {
        alert('No deck is currently being created.');
        return;
    }

    // If no flashcards are added, create an empty deck
    if (currentDeck.cards.length === 0) {
        alert('No flashcards were added, creating an empty deck.');
    }

    // Add the deck to the deck container
    displayDeck(currentDeck);

    // Reset the form and hide it
    currentDeck = null; // Clear the current deck
    addDeckForm.classList.add('hidden');
    deckInfoPhase.classList.add('hidden');
    questionPhase.classList.add('hidden');

    alert('Deck created successfully!');
});



// Fetch all flashcards from the backend
async function fetchFlashcards() {
    try {
        // Define the backend URL for fetching flashcards
        const backendURL = 'http://127.0.0.1:8887/api/flashcard';

        // Send a GET request to the backend
        const response = await fetch(backendURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include', // Include cookies in the request
        });

        if (response.ok) {
            // Parse the response as JSON
            const flashcards = await response.json();
            console.log('Fetched flashcards:', flashcards);

            // Group flashcards by deck title (if applicable) or display as one deck
            const groupedDeck = { title: "Created Flashcards", cards: [] };
            flashcards.forEach((flashcard) => {
                groupedDeck.cards.push({
                    question: flashcard.title,
                    answer: flashcard.content,
                });
            });

            // Display the deck in the deck container
            displayDeck(groupedDeck);
        } else {
            console.error('Failed to fetch flashcards:', await response.text());
        }
    } catch (error) {
        console.error('Error fetching flashcards:', error);
    }
}

// Create a new deck when "Create Deck" is clicked
createDeckBtn.addEventListener('click', () => {
    addDeckForm.classList.remove('hidden');
    deckInfoPhase.classList.remove('hidden');
    questionPhase.classList.add('hidden');
    currentDeck = { title: "New Deck", cards: [] };
    decks.push(currentDeck);

    console.log('New deck created:', currentDeck);
});

// Proceed to question creation phase
document.getElementById('next-phase-btn').addEventListener('click', () => {
    const deckTitle = document.getElementById('deck-title').value.trim();

    if (deckTitle) {
        currentDeck.title = deckTitle; // Update the title of the current deck
        deckInfoPhase.classList.add('hidden');
        questionPhase.classList.remove('hidden');
    } else {
        alert('Please provide a deck title.');
    }
});

// Display the deck in the deck container
function displayDeck(deck) {
    const deckElement = document.createElement('div');
    deckElement.classList.add('deck');
    deckElement.innerHTML = `
        <h3>${deck.title}</h3>
        <button class="open-deck-btn">Open Deck</button>
    `;

    // Add functionality to open the deck and view flashcards
    deckElement.querySelector('.open-deck-btn').addEventListener('click', () => {
        openDeck(deck);
    });

    // Append the deck to the container
    deckContainer.appendChild(deckElement);
}

// Open the deck and show flashcards
function openDeck(deck) {
    currentDeck = deck;
    currentCardIndex = 0;

    // If the deck has cards, show the first card
    if (deck.cards.length > 0) {
        showFlashcard(deck.cards[currentCardIndex]);
    } else {
        alert('This deck has no flashcards.');
    }

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

    // Toggle between question and answer
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

// Event listener for showing the next card
nextCardBtn.addEventListener('click', () => {
    if (currentDeck.cards.length > 0) {
        currentCardIndex = (currentCardIndex + 1) % currentDeck.cards.length;
        showFlashcard(currentDeck.cards[currentCardIndex]);
    }
});

// Event listener for closing the deck
closeDeckBtn.addEventListener('click', () => {
    flashcardContainer.classList.add('hidden');
    deckContainer.classList.remove('hidden');
    nextCardBtn.classList.add('hidden');
    closeDeckBtn.classList.add('hidden');
});

// Fetch and display flashcards when the page loads
document.addEventListener('DOMContentLoaded', fetchFlashcards);



  // Close the deck and return to deck view
  closeDeckBtn.addEventListener('click', () => {
    flashcardContainer.classList.add('hidden');
    deckContainer.classList.remove('hidden');
    nextCardBtn.classList.add('hidden');
    closeDeckBtn.classList.add('hidden');
  });
</script>


<div>
  <h3>Import Flashcards</h3>
  <form id="import-form">
    <label for="amount">Number of Questions:</label>
    <input type="number" id="amount" name="amount" min="1" value="10">
    <label for="category">Category:</label>
    <select id="category" name="category">
      <option value="">Any Category</option>
      <option value="9">General Knowledge</option>
      <option value="10">Entertainment: Books</option>
      <option value="11">Entertainment: Film</option>
      <option value="12">Entertainment: Music</option>
      <option value="13">Entertainment: Musicals & Theatres</option>
      <option value="14">Entertainment: Television</option>
      <option value="15">Entertainment: Video Games</option>
      <option value="16">Entertainment: Board Games</option>
      <option value="17">Science & Nature</option>
      <option value="18">Science: Computers</option>
      <option value="19">Science: Mathematics</option>
      <option value="20">Mythology</option>
      <option value="21">Sports</option>
      <option value="22">Geography</option>
      <option value="23">History</option>
      <option value="24">Politics</option>
      <option value="25">Art</option>
      <option value="26">Celebrities</option>
      <option value="27">Animals</option>
      <option value="28">Vehicles</option>
      <option value="29">Entertainment: Comics</option>
      <option value="30">Science: Gadgets</option>
    </select>
    <button type="submit">Import Flashcards</button>
  </form>
</div>


<script>
  document.getElementById('import-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent form submission from refreshing the page

    // Get user inputs
    const amount = document.getElementById('amount').value || 10; // Default to 10
    const category = document.getElementById('category').value; // May be empty

    // Construct the API URL
    let apiUrl = `http://127.0.0.1:8887/api/import-flashcards?amount=${amount}&difficulty=medium`;
    if (category) {
      apiUrl += `&category=${category}`;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        const error = await response.json();
        alert("Error: " + error.error);
        return;
      }

      const data = await response.json();
      alert(`Successfully imported ${data.flashcards.length} flashcards!`);
    } catch (error) {
      console.error("Error importing flashcards:", error);
      alert("An error occurred while importing flashcards.");
    }
  });
</script>


<button id="import-flashcards">Import Flashcards</button>


<script>
  document.getElementById('import-flashcards').addEventListener('click', async () => {
      try {
          const response = await fetch('http://127.0.0.1:8887/api/import-flashcards', {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
              },
          });

          if (!response.ok) {
              const error = await response.json();
              alert("Error: " + error.error);
              return;
          }

          const data = await response.json();
          alert(`Successfully imported ${data.flashcards.length} flashcards!`);
      } catch (error) {
          console.error("Error importing flashcards:", error);
          alert("An error occurred while importing flashcards.");
      }
  });
</script>
