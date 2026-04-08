var current_player = false; 
const button = document.querySelector('.start-button button');
var isGameActive = false;
// false = white, true = black

button.addEventListener('click', startGame);

function startGame() {
  isGameActive = true;
  current_player = false; // white starts
  button.disabled = true;
  button.textContent = 'Game Started';
  updateTurnDisplay();
}

function switchTurn() {
  current_player = !current_player;
  updateTurnDisplay();
}

function updateTurnDisplay() {
  const playerName = current_player ? 'Black' : 'White';
  console.log(`${playerName}'s turn`);
}

function startTimer() {
    
}