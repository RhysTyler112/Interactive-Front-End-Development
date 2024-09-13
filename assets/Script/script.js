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

// Function to handle the guess
function guess(choice){
    const nextCard = getRandomCard();

    if ((choice === 'higher' && nextCard.value > currentCard.value) ||
        (choice === 'lower' && nextCard.value > currentCard.value)) {
            score++;
            messageDisplay.textContent = "Correct! The next card was " + formatCard(nextCard);
        }else {
            messageDisplay.textContent = "Wrong! The next card was " + formatCard(nextCard);
        }

    currentCard = nextCard

    displayCard(currentCard);
    scoreDisplay.textContent = score
}

// Function to get a random card
function getRandomCard(){
    const suit = suits[Math.floor(Math.random() * ranks.length)];

    const rank = ranks[Math.floor(Math.random() * ranks.length)];

    const value = ranks.indexOf(rank) + 2;

    return {suit: suits, rank: ranks, value: value}
}

// Function to display the current card
function displayCard(card){
    cardDisplay.textContent = card.rank + card.suit;
}