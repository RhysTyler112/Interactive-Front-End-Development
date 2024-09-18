const suits = ['♠', '♥', '♦', '♣'];

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

//Deck of availble cards
let deck =[]
// Set the score to zero
let score = 0;
// Start by picking a random card
let currentCard = getRandomCard();

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

// Add event listeners to the buttons depending if higher or lower button is clicked
// When "Higher" is clicked, run the guess function with 'Higher'
higherBtn.addEventListener('click', function() {
  guess('higher');
});

// When "Lower" is clicked, run the guess function with 'lower'
lowerBtn.addEventListener('click', function() {
  guess('lower');
});

// When "New Gmae" is clicked, run the guess setGame
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
    case 'J':
      return 11;
    case 'Q':
      return 12;
    case 'K':
      return 13;
    case 'A':
      return 14;
    default:
      return parseInt(rank);
  }
}

// Function to handle the guess
function guess(choice){
    const nextCard = getRandomCard();

    if ((choice === 'higher' && nextCard.value > currentCard.value) ||
        (choice === 'lower' && nextCard.value < currentCard.value)) {
        score++;
            messageDisplay.textContent = "Correct! The next card was " + formatCard(nextCard);
        }else {
            messageDisplay.textContent = "Wrong! The next card was " + formatCard(nextCard);
        }

    currentCard = nextCard

    displayCard(currentCard);
    updateScore();
}

// Function to get a random card
function getRandomCard() {
  
  const suit = suits[Math.floor(Math.random() * suits.length)];

  const rank = ranks[Math.floor(Math.random() * ranks.length)];
  
}

// Function to display the current card
function displayCard(card) {
  cardDisplay.textContent = card.rank + card.suit;
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

  currentCard = getRandomCard();

  messageDisplay.textContent = "";

  displayCard(currentCard);
  updateScore();
} 