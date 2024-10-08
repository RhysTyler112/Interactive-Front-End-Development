const suits = ['♠', '♥', '♦', '♣'];
const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let deck = [];            // Deck of available cards
let score = 0;            // Player score
let currentCard = {};      // Current card being displayed
let wrongGuesses = 0;      // Number of consecutive wrong guesses
let cardsPlayed = 0;       // Track how many cards have been played

// Select the HTML elements we want to update or interact with
const cardDisplay = document.getElementById('current-card');
const messageDisplay = document.getElementById('message');
const scoreDisplay = document.getElementById('current-score');
const higherBtn = document.getElementById('btn-higher');
const lowerBtn = document.getElementById('btn-lower');
const resetBtn = document.getElementById('reset-btn');

// Initialize the game
initializeDeck();
currentCard = getRandomCard();
displayCard(currentCard);
updateScore();

// Add event listeners
higherBtn.addEventListener('click', function() {
  guess('higher');
});

lowerBtn.addEventListener('click', function() {
  guess('lower');
});

resetBtn.addEventListener('click', resetGame);

// Function to initialize the deck with all possible cards
function initializeDeck() {
  deck = [];
  for (let suit of suits) {
    for (let rank of ranks) {
      let value = getValue(rank);
      deck.push({ suit: suit, rank: rank, value: value });
    }
  }
}

// Function to get the value of a card's rank
function getValue(rank) {
  switch (rank) {
    case 'J': return 11;
    case 'Q': return 12;
    case 'K': return 13;
    case 'A': return 14;
    default: return parseInt(rank);
  }
}

// Function to get a random card from the deck
function getRandomCard() {
  if (deck.length === 0) {
    checkGameEnd();
    return null;
  }
  let nextCard;
  do {
    const randomIndex = Math.floor(Math.random() * deck.length);
    nextCard = deck[randomIndex];
  } while (nextCard.rank === currentCard.rank); // Ensure the rank is different

  return deck.splice(deck.indexOf(nextCard), 1)[0]; // Remove and return the card
}

// Function to handle the guess
function guess(choice) {
  const nextCard = getRandomCard();
  if (!nextCard) return; // No more cards

  if ((choice === 'higher' && nextCard.value > currentCard.value) ||
      (choice === 'lower' && nextCard.value < currentCard.value)) {
    score++;
    wrongGuesses = 0; // Reset wrong guesses counter
    messageDisplay.textContent = "Correct! The next card was " + formatCard(nextCard);
  } else {
    wrongGuesses++;
    messageDisplay.textContent = "Wrong! The next card was " + formatCard(nextCard);
    if (wrongGuesses === 3) {
      messageDisplay.textContent += " You lost! You guessed wrong 3 times in a row.";
      toggleButtons(false);
      return;
    }
  }

  currentCard = nextCard;
  cardsPlayed++;

  displayCard(currentCard);
  updateScore();

  // Check for win or tie
  checkGameEnd();
}

// Function to display the current card
function displayCard(card) {
  if (card) {
    cardDisplay.textContent = card.rank + card.suit;
  }
}

// Function to format the card for displaying in messages
function formatCard(card) {
  return card.rank + card.suit;
}

// Function to update the score display
function updateScore() {
  scoreDisplay.textContent = score;
}

// Function to reset the game
function resetGame() {
  score = 0;
  wrongGuesses = 0;
  cardsPlayed = 0;
  initializeDeck();
  currentCard = getRandomCard();
  messageDisplay.textContent = "";
  displayCard(currentCard);
  updateScore();
  toggleButtons(true);
}

// Function to disable the higher/lower buttons after the game ends
function toggleButtons(enable) {
  higherBtn.disabled = !enable;
  lowerBtn.disabled = !enable;
}

// Function to check if the game has ended (win or tie condition)
function checkGameEnd() {
  if (cardsPlayed === 52) { // Check if all cards are played
    if (score === 52) {
      messageDisplay.textContent = "Congratulations! You won with a perfect score!";
    } else {
      messageDisplay.textContent = `Game over! Your final score is ${score}.`;
    }
    toggleButtons(false);
  }
}
