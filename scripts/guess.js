// selecting DOM elements
const display = document.querySelector('#display');
const check = document.querySelector('.check');
const reset = document.querySelector('.reset');
let guess = document.querySelector('.guess');
let number = document.querySelector('.number');
let trials = document.querySelector('.trials');
const warning = document.querySelector('.warning');
const msg = document.querySelector('.message');
const body = document.querySelector('body');
const between = document.querySelector('.between');
const highscore = document.querySelector('.label-highscore');
const muteButton = document.querySelector('#mute-button');
const img1 = document.querySelector('.mute img:nth-child(1)');
const img2 = document.querySelector('.mute img:nth-child(2)');
const scoreElement = document.querySelector('#score');




// Create audio elements for different sounds
const correctSound = new Audio('../audios/mixkit-auditorium-moderate-applause-and-cheering-502.wav');
const wrongSound = new Audio('../audios/mixkit-wrong-answer-fail-notification-946.wav');
const warningSound = new Audio('../audios/beep-warning-6387.mp3');
const gameOverSound = new Audio('../audios/mixkit-sad-game-over-trombone-471.wav');

// Function to play the sound
const playSound = (audio) => {
  audio.play();
};

// Function to stop all audio elements
const stopAllSounds = () => {
  correctSound.pause();
  correctSound.currentTime = 0;
  wrongSound.pause();
  wrongSound.currentTime = 0;
  gameOverSound.pause();
  gameOverSound.currentTime = 0;
};

// Audio mute/unmute
let isMuted = false;
const toggleMute = () => {
  isMuted = !isMuted;
  if (isMuted) {
    // Mute all audio elements
    img2.style.display = 'none';
    img1.style.display = 'block';
    correctSound.muted = true;
    wrongSound.muted = true;
    gameOverSound.muted = true;
    warningSound.muted = true;
  } else {
    // Unmute all audio elements
    img2.style.display = 'block';
    img1.style.display = 'none';
    correctSound.muted = false;
    wrongSound.muted = false;
    gameOverSound.muted = false;
    warningSound.muted = false;
  }
};

// Reset function
const handleReset = () => {
    stopAllSounds()
    guess.value = '';
    trials.innerHTML = '5';
    display.style.color = "#eee";
    highscore.style.color = "#eee"
    number.style.color = "#222"
    display.innerHTML = 'Guess My Number!';
    number.innerHTML = '?';
    check.removeAttribute("disabled");
    check.style.opacity = '1'
    msg.innerHTML = "Start guessing..."
    body.classList.add('body');
    body.classList.remove('fail', 'correct');
    finalScore = 0;
  };



// Function to show a warning message
const showWarning = (message) => {
    playSound(warningSound)
    warning.style.display = 'block';
    warning.innerHTML = message;
    setTimeout(() => {
      warning.style.display = 'none';
    }, 3000);
};

// Function to handle a correct guess
const handleCorrectGuess = (randomNum) => {
    playSound(correctSound);
    display.innerHTML = 'Correct!!!';
    number.innerHTML = randomNum;
    body.classList.remove('fail', 'body');
    body.classList.add('correct');
    display.style.color = "green";
    highscore.style.color = "#eee";
    number.style.color = "green"
    check.setAttribute("disabled", "true")
    check.style.opacity = '0.6'
    msg.innerHTML = "Play again!!"
    between.innerHTML = "Play again!!"
    highscore.style.color = "#222"
};
// Function to handle a wrong guess
const handleWrongGuess = () => {
    playSound(wrongSound);
    body.classList.remove('body', 'correct');
    // body.classList.remove('correct');
    body.classList.add('fail');
    display.innerHTML = 'Oops, you\'re wrong!';
    msg.innerHTML = 'Continue playing';
    guess.value = ''
  
  
};

const handleGameOver = () => {
    playSound(gameOverSound);
    display.innerHTML = 'Game Over!!!';
    body.classList.remove('fail', 'correct');
    // body.classList.remove('correct');
    body.classList.add('body');
    guess.value = '';
    number.innerHTML = '?';
    check.setAttribute('disabled', true);
    msg.innerHTML = 'Play again!!';
    display.innerHTML = "Game Over!!!";
    check.style.opacity = '0.6'
    msg.innerHTML = "Play again!!"
    between.innerHTML = "Play again!!"
    display.style.color = "red"
};

const playGame = () => {
  const randomNum = Math.ceil(Math.random() * 5);
  trials.innerHTML--;

  if (!guess.value || guess.value < 1 || guess.value > 5) {
    showWarning('Please enter a number between 1-5');
    guess.value = '';
  } else if (+guess.value === randomNum) {
    handleCorrectGuess(randomNum);
  } else if (trials.innerHTML == 0) {
    handleGameOver();
  } else {
    handleWrongGuess();
  }
};

// Event listeners
check.addEventListener('click', (event) => {
    event.preventDefault();
    playGame();
  });
  
reset.addEventListener('click', (event) => {
    event.preventDefault();
    handleReset()
});

muteButton.addEventListener('click', toggleMute);

