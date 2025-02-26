---
layout: base
title: Flashcards
description: Flashcards
hide: true
---


# Welcome to The Flashcards Page !


<style>
  body {
    font-family: 'Cinzel', serif;
    background: linear-gradient(135deg, #1e293b, #0f172a);
    color: #e5e7eb;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

h1, h3 {
    text-align: center;
    color: #facc15;
    text-shadow: 2px 2px 5px rgba(255, 223, 0, 0.5);
    margin-top: 20px;
    font-weight: bold;
}

#flashcard-app {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 1000px;
    width: 100%;
    margin: 20px auto;
}

/* Layout Containers */
.top-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
}

/* Bottom Section (Hidden Until Deck is Opened) */
.bottom-container {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 20px;
    margin-top: 20px;
}

/* Individual Feature Boxes */
#add-deck-box, #open-deck-box, #flashcard-box, #add-flashcard-box {
    width: 48%;
    padding: 20px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(255, 215, 0, 0.3);
    border: 2px solid rgba(255, 215, 0, 0.2);
    text-align: center;
}

/* Import Box Always Visible */
#import-box {
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    box-shadow: 0px 4px 20px rgba(255, 215, 0, 0.3);
    border: 2px solid rgba(255, 215, 0, 0.2);
    text-align: center;
}

button {
    background: linear-gradient(135deg, #facc15, #d97706);
    color: black;
    border: none;
    border-radius: 8px;
    padding: 10px 16px;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
    font-weight: bold;
    box-shadow: 0px 4px 15px rgba(255, 215, 0, 0.5);
}

button:hover {
    background: linear-gradient(135deg, #d97706, #92400e);
    transform: scale(1.05);
}

#add-deck-form {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 20px;
    width: 100%;
    max-width: 600px;
    box-shadow: 0 4px 20px rgba(255, 223, 0, 0.3);
    border: 2px solid rgba(255, 215, 0, 0.3);
}

.form-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #facc15;
    border-radius: 8px;
    font-size: 16px;
    background: rgba(0, 0, 0, 0.1);
    color: white;
}

/* Deck Display */
.deck-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    justify-content: center;
}

.deck {
    width: 200px;
    height: 120px;
    border-radius: 10px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(135deg, #d97706, #92400e);
    color: #facc15;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 6px 15px rgba(255, 223, 0, 0.5);
    animation: glow 4s infinite alternate;
}

.deck:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(255, 223, 0, 0.7);
}

.flashcard-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.2);
    padding: 25px;
    border-radius: 12px;
    border: 2px solid #facc15;
    width: 100%;
    max-width: 700px;
    box-shadow: 0 6px 15px rgba(255, 223, 0, 0.3);
}

.flashcard {
    width: 340px;
    height: 220px;
    border-radius: 12px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    background: linear-gradient(135deg, #facc15, #d97706);
    color: black;
    font-size: 18px;
    font-weight: bold;
    transition: all 0.3s ease;
    box-shadow: 0 6px 15px rgba(255, 215, 0, 0.4);
    transform-style: preserve-3d;
    perspective: 1000px;
}

.flashcard.answer {
    background: linear-gradient(135deg, #d97706, #facc15);
    transform: rotateY(180deg);
}

.flashcard:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 15px rgba(255, 215, 0, 0.5);
}

/* Flashcard Flip Animation */
@keyframes flip {
    from {
        transform: rotateY(0deg);
    }
    to {
        transform: rotateY(180deg);
    }
}

/* Deck Glow Animation */
@keyframes glow {
    from {
        box-shadow: 0px 6px 15px rgba(255, 223, 0, 0.3);
    }
    to {
        box-shadow: 0px 6px 20px rgba(255, 223, 0, 0.7);
    }
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
  <div class="top-container">
    <!-- Left Box: Add Deck Feature -->
    <div id="add-deck-box">
      <h2>Create a New Deck</h2>
      <button id="create-deck-btn">+ Create Deck</button>
      <div id="add-deck-form" class="hidden">
        <div class="form-group">
          <label for="deck-title">Deck Title:</label>
          <input type="text" id="deck-title" placeholder="Enter deck title">
        </div>
      </div>
    </div>

    <!-- Right Box: Open Deck Feature -->
<div id="open-deck-box">
      <h2>Your Decks</h2>
      <div class="deck-container" id="deck-container"></div>
    </div>
  </div>

  <!-- This section only appears after clicking "Open Deck" -->
  <div class="bottom-container hidden" id="deck-interaction">
    <div id="flashcard-box">
      <h2>Flashcards</h2>
      <div class="flashcard-container hidden" id="flashcard-container">
        <div class="flashcard hidden" id="flashcard"></div>
        <button id="next-card-btn" class="hidden">Next Card</button>
        <button id="close-deck-btn" class="hidden">Close Deck</button>
      </div>
    </div>

<div id="add-flashcard-box">
      <h2>Add a Flashcard</h2>
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
    </div>
  </div>











<script type="module">
  import { pythonURI, fetchOptions } from '{{site.baseurl}}/assets/js/api/config.js';
  console.log("Python URI:", pythonURI); // Check if it's correctly imported




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
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({
                title: question,
                content: answer,
                deck_id: currentDeck.id,
                user_id: 1  // ✅ Ensure this is correct
            }),
        });

        if (!response.ok) throw new Error("Failed to add flashcard.");

        const newCard = await response.json();
        currentDeck.cards.push(newCard);
        alert(`Flashcard added to ${currentDeck.title}!`);
        document.getElementById('question').value = '';
        document.getElementById('answer').value = '';
        displayFlashcards(currentDeck.cards);
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
        cardElement.innerHTML = `
            <div class="flashcard-content">
                <span class="question-text">${card.title}</span>
                <span class="edit-icon" style="cursor: pointer; font-size: 16px; margin-left: 8px;">✏️</span>
                <span class="delete-icon" style="cursor: pointer; font-size: 16px; margin-left: 8px;">❌</span>
            </div>
        `;

        // Ensure the element exists before adding event listeners
        const questionElement = cardElement.querySelector('.question-text');
        if (!questionElement) {
            console.error("Flashcard question text not found!");
            return;
        }

        // Handle flipping between question and answer
        cardElement.onclick = (event) => {
            if (!event.target.classList.contains("edit-icon") && !event.target.classList.contains("delete-icon")) {
                if (questionElement.textContent === card.title) {
                    questionElement.textContent = card.content;
                    cardElement.classList.add('answer');
                } else {
                    questionElement.textContent = card.title;
                    cardElement.classList.remove('answer');
                }
            }
        };

        // Enable Editing a Flashcard
        const editIcon = cardElement.querySelector('.edit-icon');
        editIcon.addEventListener('click', () => editFlashcard(card, cardElement));

        // Enable Deleting a Flashcard
        const deleteIcon = cardElement.querySelector('.delete-icon');
        deleteIcon.addEventListener('click', async () => {
            const confirmDelete = confirm(`Are you sure you want to delete this flashcard?`);
            if (confirmDelete) {
                await deleteFlashcard(card.id, cardElement);
            }
        });

        container.appendChild(cardElement);
    });

    if (cards.length === 0) {
        container.innerHTML = '<p>No flashcards available. Add one to get started!</p>';
    }
}


// Function to Edit Flashcard
function editFlashcard(card, cardElement) {
    console.log('Editing flashcard:', card);

    const editForm = document.createElement('div');
    editForm.innerHTML = `
        <input type="text" value="${card.title}" class="edit-input" style="width: 90%; padding: 5px; border-radius: 5px;">
        <input type="text" value="${card.content}" class="edit-input" style="width: 90%; padding: 5px; margin-top: 5px; border-radius: 5px;">
        <button class="save-edit-btn" style="margin-top: 5px; padding: 5px 10px; border-radius: 5px;">Save</button>
    `;

    cardElement.innerHTML = ''; // Clear the card content
    cardElement.appendChild(editForm);

    const inputs = editForm.querySelectorAll('.edit-input');
    const saveButton = editForm.querySelector('.save-edit-btn');

    saveButton.addEventListener('click', async () => {
        const updatedTitle = inputs[0].value.trim();
        const updatedContent = inputs[1].value.trim();

        if (!updatedTitle || !updatedContent) {
            alert("Both question and answer are required.");
            return;
        }

        await updateFlashcard(card.id, updatedTitle, updatedContent, cardElement);
    });
}

async function updateFlashcard(flashcardId, newTitle, newContent, cardElement) {
    try {
        const response = await fetch(`${pythonURI}/api/flashcard/${flashcardId}`, {
            method: 'PUT',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({ title: newTitle, content: newContent }),
        });

        if (!response.ok) throw new Error(`Failed to update flashcard: ${response.statusText}`);

        const updatedFlashcard = await response.json();
        alert(`Flashcard updated successfully!`);

        cardElement.innerHTML = `
            <div class="flashcard-content">
                <span class="question-text">${updatedFlashcard.title}</span>
                <span class="edit-icon" style="cursor: pointer;">✏️</span>
                <span class="delete-icon" style="cursor: pointer;">❌</span>
            </div>
        `;

        cardElement.dataset.answer = updatedFlashcard.content;

        const questionElement = cardElement.querySelector('.question-text');

        cardElement.onclick = (event) => {
            if (!event.target.classList.contains("edit-icon") && !event.target.classList.contains("delete-icon")) {
                const isQuestion = questionElement.textContent === updatedFlashcard.title;
                questionElement.textContent = isQuestion ? cardElement.dataset.answer : updatedFlashcard.title;
                cardElement.classList.toggle('answer', isQuestion);
            }
        };

        cardElement.querySelector('.edit-icon').addEventListener('click', () => editFlashcard(updatedFlashcard, cardElement));
        cardElement.querySelector('.delete-icon').addEventListener('click', () => deleteFlashcard(updatedFlashcard.id, cardElement));

    } catch (error) {
        console.error('Error updating flashcard:', error);
        alert('An error occurred while updating the flashcard.');
    }
}




async function deleteFlashcard(flashcardId, cardElement) {
    try {
        const response = await fetch(`${pythonURI}/api/flashcard/${flashcardId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        });

        if (!response.ok) throw new Error(`Failed to delete flashcard: ${response.statusText}`);

        alert('Flashcard deleted successfully!');
        cardElement.remove();
    } catch (error) {
        console.error('Error deleting flashcard:', error);
        alert('An error occurred while deleting the flashcard.');
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
            window.location.href = '/cantella_frontend/login';
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
        <div style="display: flex; align-items: center; gap: 5px;">
            <h3 class="deck-title" style="margin: 0; flex-grow: 1;">${deck.title}</h3>
            <span class="edit-icon" style="cursor: pointer; font-size: 16px;">✏️</span>
        </div>
        <div style="display: flex; gap: 5px; justify-content: center; margin-top: 10px;">
            <button class="open-deck-btn">Open</button>
            <button class="delete-deck-btn">Delete</button>
        </div>
    `;

    const titleElement = deckElement.querySelector('.deck-title');
    const editIcon = deckElement.querySelector('.edit-icon');

    // Enable editing the title when clicking the pencil icon
    editIcon.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = deck.title;
        input.classList.add('edit-deck-input');
        input.style.width = "80%";
        input.style.padding = "5px";
        input.style.borderRadius = "5px";
        input.style.border = "1px solid #facc15";
        input.style.background = "rgba(255, 255, 255, 0.1)";
        input.style.color = "white";
        input.style.fontSize = "16px";

        titleElement.replaceWith(input);
        input.focus();

        // Save the new title when input loses focus or on Enter key
        const saveTitle = async () => {
            const newTitle = input.value.trim();
            if (newTitle && newTitle !== deck.title) {
                await editDeckTitle(deck.id, newTitle, input, titleElement);
            } else {
                input.replaceWith(titleElement); // Revert if no change
            }
        };

        input.addEventListener('blur', saveTitle);
        input.addEventListener('keydown', async (event) => {
            if (event.key === 'Enter') {
                await saveTitle();
            }
        });
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
                    await fetchDecks(); // Refresh the decks list
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

async function editDeckTitle(deckId, newTitle, inputElement, titleElement) {
    try {
        const response = await fetch(`${pythonURI}/api/deck/${deckId}`, {
            ...fetchOptions,
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify({ title: newTitle }), 
        });

        if (response.ok) {
            const updatedDeck = await response.json();
            titleElement.textContent = updatedDeck.title; 
            inputElement.replaceWith(titleElement);
            alert(`Deck updated successfully to: ${updatedDeck.title}`);
        } else {
            const error = await response.json();
            alert(`Error updating deck: ${error.error}`);
            inputElement.replaceWith(titleElement);
        }
    } catch (error) {
        console.error('Error updating deck:', error);
        alert('An error occurred while updating the deck.');
        inputElement.replaceWith(titleElement);
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
            currentDeck = detailedDeck;
            currentCardIndex = 0;

            document.getElementById('deck-name-placeholder').textContent = currentDeck.title;

            if (currentDeck.cards.length > 0) {
                displayFlashcards(currentDeck.cards);
            } else {
                document.getElementById('flashcard-container').innerHTML = '<p>No flashcards yet. Add one!</p>';
            }

            document.getElementById('add-flashcard-form').classList.remove('hidden');
            document.getElementById('deck-interaction').classList.remove('hidden');
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
    event.preventDefault(); // Prevent form from reloading the page

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
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            const data = await response.json();
            alert(`Successfully imported ${data.flashcards.length} flashcards!`);
            await fetchDecks(); // Refresh deck list after import
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