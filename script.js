'use strict';

// Query selectors for DOM elements
const guessInput = document.querySelector('.guess');
const checkButton = document.querySelector('.check');
const message = document.querySelector('.message');
const numberDisplay = document.querySelector('.number');
const scoreDisplay = document.querySelector('.score');
const body = document.querySelector('body');
const highScoreDisplay = document.querySelector('.highscore');
const restartButton = document.querySelector('.again');

// Variables to store game state
let secretNumber = generateRandomNumber(1, 20);
let score = 20;
let highScore = 0;

// Utility function to generate random number in a given range
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to update message text
function updateMessage(msg) {
  message.textContent = msg;
}

// Function to handle the win state
function handleWin() {
  updateMessage('🎉 Correct number!!!');
  numberDisplay.textContent = secretNumber;
  body.style.backgroundColor = '#60b347';
  numberDisplay.style.width = '30rem';

  if (score > highScore) {
    highScore = score;
    highScoreDisplay.textContent = highScore;
  }
}

// Function to handle guess too high/low logic
function handleWrongGuess(guessType) {
  if (score > 1) {
    score--;
    updateMessage(guessType === 'high' ? '📈 Too high!' : '📉 Too low!');
    scoreDisplay.textContent = score;
  } else {
    updateMessage('💥 You lose the game');
    scoreDisplay.textContent = 0;
  }
}

// Function to reset the game
function resetGame() {
  secretNumber = generateRandomNumber(1, 20);
  score = 20;
  updateMessage('Start guessing...');
  numberDisplay.textContent = '?';
  guessInput.value = '';
  scoreDisplay.textContent = score;
  body.style.backgroundColor = '#222';
  numberDisplay.style.width = '15rem';
}

// Event listener for the check button
checkButton.onclick = () => {
  const guessNumber = Number(guessInput.value);

  // No input provided
  if (!guessNumber) {
    updateMessage('⛔ No number');

    // Correct guess
  } else if (guessNumber === secretNumber) {
    handleWin();

    // Guess is too high
  } else if (guessNumber > secretNumber) {
    handleWrongGuess('high');

    // Guess is too low
  } else if (guessNumber < secretNumber) {
    handleWrongGuess('low');
  }
};

// Event listener for the restart button
restartButton.onclick = resetGame;
