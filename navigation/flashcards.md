---
layout: base
title: Flashcards
description: Flashcards
hide: true
---

# Welcome to The Flashcards Page

<style>
  body {
    font-family: 'Georgia', serif;
    background-color: #f9f8f6;
    color: #333;
    margin: 0;
    padding: 0;
  }

  h1, h3 {
    text-align: center;
    color: #2c3e50;
    margin-top: 20px;
    font-weight: normal;
    font-style: italic;
  }

  #flashcard-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }

  #create-deck-btn {
    background-color: #6c757d;
    color: #fff;
    font-size: 16px;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin: 20px 0;
  }

  #create-deck-btn:hover {
    background-color: #5a6268;
  }

  #add-deck-form {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin-top: 20px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .form-group {
    margin-bottom: 15px;
  }

  .form-group label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #444;
  }

  .form-group input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-family: inherit;
    font-size: 14px;
  }

  .deck-container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-top: 30px;
    justify-content: center;
  }

  .deck {
    width: 220px;
    height: 120px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background-color: #eaeaea;
    color: #2c3e50;
    font-size: 18px;
    font-weight: bold;
    border: 1px solid #ccc;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  .deck:hover {
    background-color: #d6d6d6;
    transform: translateY(-2px);
  }

  .flashcard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
    width: 100%;
    max-width: 700px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .flashcard {
    width: 320px;
    height: 200px;
    border-radius: 8px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(135deg, #f8c291, #f39c12);
    color: #fff;
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 15px;
    border: 2px solid #e67e22;
    transition: transform 0.2s ease, box-shadow 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .flashcard.answer {
    background: linear-gradient(135deg, #f39c12, #f8c291);
  }

  .flashcard:hover {
    transform: scale(1.03);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  button {
    background-color: #6c757d;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    margin-top: 10px;
  }

  button:hover {
    background-color: #5a6268;
  }

  @media screen and (max-width: 600px) {
    .deck {
      width: 100%;
    }

    .flashcard {
      width: 100%;
    }
  }
</style>

<div id="flashcard-app">
  <h1>Flashcards for Every Occasion</h1>
  <button id="create-deck-btn">+ Create Deck</button>
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


document.getElementById('finish-deck-btn').addEventListener('click', async () => {
    if (!currentDeck) {
        alert('No deck is currently being created.');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:8887/api/deck', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include', // Include cookies in the request
            body: JSON.stringify({
                title: currentDeck.title,
                user_id: 1, // Replace with actual user ID
                cards: currentDeck.cards,
            }),
        });

        if (response.ok) {
            alert('Deck created successfully!');
            console.log('Deck created successfully.');

            // Fetch the updated list of decks
            await fetchDecks();

            // Reset the form and clear `currentDeck`
            currentDeck = null;
            addDeckForm.classList.add('hidden');
            deckInfoPhase.classList.add('hidden');
            questionPhase.classList.add('hidden');
        } else {
            console.error('Failed to create deck:', await response.text());
        }
    } catch (error) {
        console.error('Error creating deck:', error);
    }
});


async function fetchDecks() {
    try {
        const response = await fetch('http://127.0.0.1:8887/api/deck', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include'
        });

        if (response.ok) {
            const fetchedDecks = await response.json();
            console.log('Fetched decks:', fetchedDecks);

            // Clear the deck container to prevent duplicates
            deckContainer.innerHTML = '';

            // Display each deck
            fetchedDecks.forEach(deck => {
                displayDeck(deck);
            });
        } else if (response.status === 401) {
            alert('You are not authorized. Please log in.');
            // Optionally, redirect to the login page
            window.location.href = '/login.html';
        } else {
            const error = await response.json();
            console.error('Failed to fetch decks:', error);
        }
    } catch (error) {
        console.error('Error fetching decks:', error);
    }
}




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

function displayDeck(deck) {
    console.log('Displaying deck:', deck); // Log the deck object for debugging

    const deckElement = document.createElement('div');
    deckElement.classList.add('deck');
    deckElement.innerHTML = `
        <h3>${deck.title}</h3>
        <div style="display: flex; gap: 5px; justify-content: center; margin-top: 10px;">
            <button class="open-deck-btn">Open</button>
            <button class="delete-deck-btn">Delete</button>
        </div>
    `;

    // Attach event listener for opening the deck
    deckElement.querySelector('.open-deck-btn').addEventListener('click', () => {
        console.log('Deck clicked:', deck); // Log the deck object on button click
        openDeck(deck);
    });

    // Attach event listener for deleting the deck
    deckElement.querySelector('.delete-deck-btn').addEventListener('click', async () => {
        const confirmDelete = confirm(`Are you sure you want to delete the deck "${deck.title}"?`);
        if (confirmDelete) {
            try {
                const response = await fetch(`http://127.0.0.1:8887/api/deck/${deck.id}`, {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    credentials: 'include', 
                });

                if (response.ok) {
                    alert('Deck deleted successfully!');
                    // Refresh the decks list
                    await fetchDecks();
                } else {
                    const error = await response.json();
                    alert(`Failed to delete deck: ${error.error}`);
                }
            } catch (error) {
                console.error('Error deleting deck:', error);
                alert('An error occurred while deleting the deck.');
            }
        }
    });

    deckContainer.appendChild(deckElement);
}


async function openDeck(deck) {
    console.log('Opening deck:', deck);

    if (!deck.id) {
        alert('Deck ID is missing!');
        return;
    }

    try {
        const response = await fetch(`http://127.0.0.1:8887/api/deck/${deck.id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const detailedDeck = await response.json();
            console.log('Detailed deck fetched from API:', detailedDeck);

            currentDeck = detailedDeck;
            currentCardIndex = 0;

            if (currentDeck.cards.length > 0) {
                flashcardContainer.classList.remove('hidden'); // Ensure the container is visible
                deckContainer.classList.add('hidden');
                nextCardBtn.classList.remove('hidden');
                closeDeckBtn.classList.remove('hidden');

                showFlashcard(currentDeck.cards[currentCardIndex]);
            } else {
                alert('This deck has no flashcards.');
            }
        } else {
            console.error('Failed to fetch deck details:', await response.text());
        }
    } catch (error) {
        console.error('Error fetching deck details:', error);
    }
}



function showFlashcard(card) {
    const flashcard = document.getElementById('flashcard'); // Re-fetch the flashcard element
    if (!flashcard) {
        console.error('Flashcard element not found in the DOM.');
        return;
    }

    console.log('Displaying flashcard:', card);

    flashcard.textContent = card.title; // Set the question as the default content
    flashcard.classList.remove('hidden');
    flashcard.classList.remove('answer');

    // Toggle between question and answer
    flashcard.onclick = () => {
        if (flashcard.textContent === card.title) {
            flashcard.textContent = card.content;
            flashcard.classList.add('answer');
        } else {
            flashcard.textContent = card.title;
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
document.addEventListener('DOMContentLoaded', fetchDecks);




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
    event.preventDefault();

    const amount = document.getElementById('amount').value || 10;
    const category = document.getElementById('category').value;

    let apiUrl = `http://127.0.0.1:8887/api/import-flashcards?amount=${amount}&difficulty=medium`;
    if (category) {
        apiUrl += `&category=${category}`;
    }

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Deck "${data.deck.title}" created successfully!`);
            await fetchDecks(); // Refresh deck list
        } else {
            const error = await response.json();
            alert(`Error: ${error.error}`);
        }
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