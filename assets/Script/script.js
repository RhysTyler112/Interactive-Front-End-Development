const suits = ['♠', '♥', '♦', '♣'];

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

// Set the score to zero
let score = 0;

// Start by picking a random card
let currentCard = getRandomCard();

// Select the HTML elements we want to update or interact with
const cardDisplay = document.getElementById('current-card');
const messageDisplay = document.getElementById('message');
const btnHigher = document.getElementById('btn-higher');
const btnLower = document.getElementById('btn-lower');

// Display the current card at the start
displayCard(currentCard);

// Add event listeners to the buttons depending if higher or lower button is clicked
btnHigher.addEventListener('click', function(){
    guess('higher')
})

btnLower.addEventListener('click', function(){
    guess('lower')
})
