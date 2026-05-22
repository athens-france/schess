var current_player = false; 
const button = document.querySelector('.start-button button');
var isGameActive = false;

// clock logic
let whiteTimeLeft = 0;
let blackTimeLeft = 0;

let activeClock = null; // 'w' or 'b'
let clockIntervalId = null;
let lastTickMs = null;

const whiteTimeEl = document.getElementById('white-time');
const blackTimeEl = document.getElementById('black-time');
const whiteFlagEl = document.getElementById('white-flag');
const blackFlagEl = document.getElementById('black-flag');

const timeInputEl = document.getElementById('time-input');
const clockStartBtn = document.getElementById('clock-start');
const clockPauseBtn = document.getElementById('clock-pause');
const clockResetBtn = document.getElementById('clock-reset');
// false = white, true = black

button.addEventListener('click', startGame);

function renderClocks() {
  // show whole seconds
  const wSecs = Math.max(0, Math.ceil(whiteTimeLeft));
  const bSecs = Math.max(0, Math.ceil(blackTimeLeft));

  whiteTimeEl.textContent = wSecs;
  blackTimeEl.textContent = bSecs;

  whiteFlagEl.textContent = (wSecs > 0 && wSecs <= 30) ? ' !!!!' : '';
  blackFlagEl.textContent = (bSecs > 0 && bSecs <= 30) ? ' !!!!' : '';
}

function stopClockInterval() {
  if (clockIntervalId !== null) {
    clearInterval(clockIntervalId);
    clockIntervalId = null;
  }
  lastTickMs = null;
}

function startClockInterval() {
  stopClockInterval();
  lastTickMs = Date.now();

  clockIntervalId = setInterval(() => {
    if (!isGameActive) return; // game ended / not started

    const now = Date.now();
    const deltaSec = (now - lastTickMs) / 1000;
    lastTickMs = now;

    if (activeClock === 'w') {
      whiteTimeLeft -= deltaSec;
      if (whiteTimeLeft <= 0) {
        whiteTimeLeft = 0;
        renderClocks();
        console.log('White ran out of time. Black wins!');
        isGameActive = false;
        stopClockInterval();
        return;
      }
    } else if (activeClock === 'b') {
      blackTimeLeft -= deltaSec;
      if (blackTimeLeft <= 0) {
        blackTimeLeft = 0;
        renderClocks();
        console.log('Black ran out of time. White wins!');
        isGameActive = false;
        stopClockInterval();
        return;
      }
    }

    renderClocks();
  }, 100); // 10 updates/sec
}

function setActiveClock(color) {
  activeClock = color;
  startClockInterval();
}

function initClocksFromInput() {
  const startSeconds = parseInt(timeInputEl.value, 10);
  if (!Number.isFinite(startSeconds) || startSeconds <= 0) {
    console.log('Enter a valid start time in seconds.');
    return false;
  }

  whiteTimeLeft = startSeconds;
  blackTimeLeft = startSeconds;
  renderClocks();
  return true;
}


clockStartBtn.addEventListener('click', () => {
  if (!initClocksFromInput()) return;

  // also start the game if it isn't started
  isGameActive = true;
  current_player = false; // white to move
  updateTurnDisplay();

  // white starts ticking
  setActiveClock('w');
});

clockPauseBtn.addEventListener('click', () => {
  stopClockInterval();
});

clockResetBtn.addEventListener('click', () => {
  stopClockInterval();
  whiteTimeLeft = 0;
  blackTimeLeft = 0;
  activeClock = null;
  renderClocks();
});

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

  // switch which clock is running
  if (isGameActive) {
    const sideToMove = current_player ? 'b' : 'w';
    setActiveClock(sideToMove);
  }
}

function updateTurnDisplay() {
  const playerName = current_player ? 'Black' : 'White';
  console.log(`${playerName}'s turn`);
}
