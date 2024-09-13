const suits = ['♠', '♥', '♦', '♣'];

const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

let score = 0;

let currentCard = getRandomCard();

const cardDisplay = document.getElementById('current-card');
const messageDisplay = document.getElementById('message');
const btnHigher = document.getElementById('btn-higher');
const btnLower = document.getElementById('btn-lower');

