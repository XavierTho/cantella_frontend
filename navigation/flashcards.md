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
  <h1>Create Flashcards and Decks Now!</h1>
  <button id="create-deck-btn">+ Create Deck</button>
<div id="add-deck-form" class="hidden">
  <div class="form-group">
    <label for="deck-title">Deck Title:</label>
    <input type="text" id="deck-title" placeholder="Enter deck title">
  </div>
</div>






  <div class="deck-container" id="deck-container"></div>
  <div class="flashcard-container hidden" id="flashcard-container">
    <div class="flashcard hidden" id="flashcard"></div>
    <button id="next-card-btn" class="hidden">Next Card</button>
    <button id="close-deck-btn" class="hidden">Close Deck</button>
  </div>
  <div id="add-flashcard-form" class="hidden">
  <h3 id="current-deck-name">Add Flashcard to Deck: <span id="deck-name-placeholder"></span></h3>
  <div class="form-group">
    <label for="question">Question:</label>
    <input type="text" id="question" placeholder="Enter question">
  </div>
  <div class="form-group">
    <label for="answer">Answer:</label>
    <input type="text" id="answer" placeholder="Enter answer">
  </div>
  <button id="add-card-btn">Add Flashcard</button>
</div>










<script>

import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';

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

document.getElementById('create-deck-btn').addEventListener('click', async () => {
    const deckTitle = document.getElementById('deck-title').value.trim();


    if (!deckTitle) {
        alert('Please provide a deck title.');
        return;
    }


    try {
        const response = await fetch(`${pythonURI}/api/deck`, {
            ...fetchOptions,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ title: deckTitle, user_id: 1 }), // Replace user_id as needed
        });


        if (response.ok) {
            const newDeck = await response.json();
            decks.push(newDeck); // Add the new deck to the local array
            alert(`Deck "${newDeck.title}" created successfully!`);
            document.getElementById('deck-title').value = ''; // Clear the input
            displayDeck(newDeck); // Show the new deck
        } else {
            alert('Failed to create deck. Please try again.');
        }
    } catch (error) {
        console.error('Error creating deck:', error);
        alert('An error occurred while creating the deck.');
    }
});






document.getElementById('add-card-btn').addEventListener('click', async () => {
    const question = document.getElementById('question').value.trim();
    const answer = document.getElementById('answer').value.trim();

    if (!question || !answer) {
        alert('Please provide both a question and an answer.');
        return;
    }

    if (!currentDeck || !currentDeck.id) {
        alert('No deck selected. Please select or create a deck first.');
        return;
    }

    try {
        const response = await fetch(`${pythonURI}/api/flashcard`, {
            ...fetchOptions,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                title: question,
                content: answer,
                deck_id: currentDeck.id, // Include the current deck's ID
                user_id: 1, // Replace with the actual user ID if needed
            }),
        });

        if (response.ok) {
            const newCard = await response.json();
            currentDeck.cards.push(newCard); // Add to the current deck locally
            alert(`Flashcard added to ${currentDeck.title}!`);
            document.getElementById('question').value = '';
            document.getElementById('answer').value = '';
            displayFlashcards(currentDeck.cards); // Refresh the flashcards
        } else {
            alert('Failed to add flashcard. Please try again.');
        }
    } catch (error) {
        console.error('Error adding flashcard:', error);
        alert('An error occurred while adding the flashcard.');
    }
});





function displayFlashcards(cards) {
    const container = document.getElementById('flashcard-container');
    container.innerHTML = ''; // Clear existing flashcards


    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('flashcard');
        cardElement.textContent = card.title; // Default to question


        // Toggle between question and answer
        cardElement.onclick = () => {
            if (cardElement.textContent === card.title) {
                cardElement.textContent = card.content;
                cardElement.classList.add('answer');
            } else {
                cardElement.textContent = card.title;
                cardElement.classList.remove('answer');
            }
        };


        container.appendChild(cardElement);
    });


    if (cards.length === 0) {
        container.innerHTML = '<p>No flashcards available. Add one to get started!</p>';
    }
}






async function fetchDecks() {
    try {
        const response = await fetch(`${pythonURI}/api/deck`, {
            ...fetchOptions,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });


        if (response.ok) {
            const fetchedDecks = await response.json();
            console.log('Fetched decks:', fetchedDecks);


            deckContainer.innerHTML = ''; // Clear container


            fetchedDecks.forEach(deck => {
                displayDeck(deck);
            });
        } else if (response.status === 401) {
            alert('You are not authorized. Please log in.');
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

        // Send a GET request to the backend
        const response = await fetch(`${pythonURI}/api/flashcard`, {
            ...fetchOptions,
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
    currentDeck = null; // Reset the current deck to avoid issues
});






function displayDeck(deck) {
    console.log('Displaying deck:', deck); // Log the deck object for debugging

    const deckElement = document.createElement('div');
    deckElement.classList.add('deck');
    deckElement.innerHTML = `
        <h3 class="deck-title">${deck.title}</h3>
        <div style="display: flex; gap: 5px; justify-content: center; margin-top: 10px;">
            <button class="open-deck-btn">Open</button>
            <button class="delete-deck-btn">Delete</button>
        </div>
    `;

    const titleElement = deckElement.querySelector('.deck-title');

    // Enable editing the title on double-click
    titleElement.addEventListener('dblclick', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = deck.title;
        input.classList.add('edit-deck-input');

        titleElement.replaceWith(input);

        // Save the new title when input loses focus or on Enter key
        input.addEventListener('blur', async () => {
            const newTitle = input.value.trim();
            if (newTitle && newTitle !== deck.title) {
                await editDeckTitle(deck.id, newTitle, input, titleElement, deckElement);
            } else {
                input.replaceWith(titleElement); // Revert if no change
            }
        });

        input.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                const newTitle = input.value.trim();
                if (newTitle && newTitle !== deck.title) {
                    await editDeckTitle(deck.id, newTitle, input, titleElement, deckElement);
                } else {
                    input.replaceWith(titleElement); // Revert if no change
                }
            }
        });

        input.focus(); // Automatically focus the input
    });

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
                const response = await fetch(`${pythonURI}/api/deck/${deck.id}`, {
                    ...fetchOptions,
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


async function editDeckTitle(deckId, newTitle, inputElement, titleElement, deckElement) {
    try {
        const response = await fetch(`${pythonURI}/api/deck/${deckId}`, {
            ...fetchOptions,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ title: newTitle }), // Send the new title in the request body
        });

        if (response.ok) {
            const updatedDeck = await response.json();
            titleElement.textContent = updatedDeck.title; // Update the title in the UI
            inputElement.replaceWith(titleElement); // Replace input with updated title
            alert(`Deck updated successfully to: ${updatedDeck.title}`);
        } else {
            const error = await response.json();
            alert(`Error updating deck: ${error.error}`);
            inputElement.replaceWith(titleElement); // Revert if there's an error
        }
    } catch (error) {
        console.error('Error updating deck:', error);
        alert('An error occurred while updating the deck.');
        inputElement.replaceWith(titleElement); // Revert if there's an error
    }
}


async function openDeck(deck) {
    console.log('Opening deck:', deck);

    if (!deck.id) {
        alert('Deck ID is missing!');
        return;
    }

    try {
        const response = await fetch(`${pythonURI}/api/deck/${deck.id}`, {
            ...fetchOptions,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const detailedDeck = await response.json();
            currentDeck = detailedDeck; // Save the fetched deck details locally
            currentCardIndex = 0;

            // Show the current deck name in the flashcard form
            document.getElementById('deck-name-placeholder').textContent = currentDeck.title;

            // Show flashcards and allow adding new ones
            if (currentDeck.cards.length > 0) {
                displayFlashcards(currentDeck.cards); // Show flashcards
            } else {
                document.getElementById('flashcard-container').innerHTML = '<p>No flashcards yet. Add one!</p>';
            }

            document.getElementById('add-flashcard-form').classList.remove('hidden'); // Show form
            flashcardContainer.classList.remove('hidden');
            deckContainer.classList.add('hidden');
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


    let apiUrl = `${pythonURI}/api/import-flashcards?amount=${amount}&difficulty=medium`;
    if (category) {
        apiUrl += `&category=${category}`;
    }


    try {
        const response = await fetch(apiUrl, {
            ...fetchOptions,
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
          const response = await fetch(`${pythonURI}/api/import-flashcards`, {
              ...fetchOptions,
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