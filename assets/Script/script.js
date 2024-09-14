const suits = ['♠', '♥', '♦', '♣'];

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

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

// Display the current card at the start
displayCard(currentCard);

// Add event listeners to the buttons depending if higher or lower button is clicked
higherBtn.addEventListener('click', function() {
  guess('higher');
});

// When "Lower" is clicked, run the guess function with 'lower'
lowerBtn.addEventListener('click', function() {
  guess('lower');
});

resetBtn.addEventListener('click', resetGame);

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

  let value;

  if (rank === 'J') {
    value = 11;
  } else if (rank === 'Q') {
    value =12;
  }else if (rank === 'K') {
    value =13;
  }else if (rank === 'A') {
    value =14;
  }else {
    value = parseInt(rank);
  }
  
  return { suit: suit, rank: rank, value: value };
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