// Game state
let cards = [];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moves = 0;
let score = 0;
let timer;
let seconds = 0;
let minutes = 0;

// Card emojis
const emojis = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼', '🐨', '🐯', '🦁', '🐮'];
const cardPairs = [...emojis, ...emojis];

// DOM elements
const gameBoard = document.getElementById('game-board');
const movesDisplay = document.getElementById('moves');
const scoreDisplay = document.getElementById('score');
const timerDisplay = document.getElementById('timer');
const restartBtn = document.getElementById('restart-btn');
const newGameBtn = document.getElementById('new-game-btn');
const playAgainBtn = document.getElementById('play-again-btn');
const gameMessage = document.getElementById('game-message');
const finalTime = document.getElementById('final-time');
const finalMoves = document.getElementById('final-moves');
const finalScore = document.getElementById('final-score');

// Initialize game
function initGame() {
    // Reset game state
    cards = [];
    hasFlippedCard = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    moves = 0;
    score = 0;
    seconds = 0;
    minutes = 0;
    
    // Clear game board
    gameBoard.innerHTML = '';
    
    // Update displays
    movesDisplay.textContent = '0 Moves';
    scoreDisplay.textContent = 'Score: 0';
    timerDisplay.textContent = '00:00';
    
    // Hide game message
    gameMessage.classList.remove('show');
    
    // Create and shuffle cards
    const shuffledCards = shuffleArray(cardPairs);
    
    // Create card elements
    shuffledCards.forEach((emoji, index) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.emoji = emoji;
        
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-face', 'card-front');
        cardFront.textContent = emoji;
        
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-face', 'card-back');
        
        card.appendChild(cardFront);
        card.appendChild(cardBack);
        card.addEventListener('click', flipCard);
        
        gameBoard.appendChild(card);
        cards.push(card);
    });
    
    // Start timer
    startTimer();
}

// Shuffle array
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Flip card
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;
    
    this.classList.add('flipped');
    
    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    
    secondCard = this;
    lockBoard = true;
    moves++;
    movesDisplay.textContent = `${moves} Moves`;
    
    checkForMatch();
}

// Check for match
function checkForMatch() {
    const isMatch = firstCard.dataset.emoji === secondCard.dataset.emoji;
    
    if (isMatch) {
        disableCards();
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
        
        // Check if all cards are matched
        if (score === emojis.length * 10) {
            endGame();
        }
    } else {
        unflipCards();
    }
}

// Disable matched cards
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    
    resetBoard();
}

// Unflip cards
function unflipCards() {
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

// Reset board
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

// Start timer
function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        seconds++;
        if (seconds === 60) {
            minutes++;
            seconds = 0;
        }
        timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

// End game
function endGame() {
    clearInterval(timer);
    finalTime.textContent = timerDisplay.textContent;
    finalMoves.textContent = moves;
    finalScore.textContent = score;
    gameMessage.classList.add('show');
}

// Event listeners
restartBtn.addEventListener('click', initGame);
newGameBtn.addEventListener('click', initGame);
playAgainBtn.addEventListener('click', initGame);

// Initialize game on load
window.addEventListener('load', initGame); 