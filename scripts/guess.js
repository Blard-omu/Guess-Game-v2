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
const muteButton = document.querySelector('#mute-button');
const img1 = document.querySelector('.mute img:nth-child(1)');
const img2 = document.querySelector('.mute img:nth-child(2)');




// Create audio elements for different sounds
const correctSound = new Audio('../audios/mixkit-auditorium-moderate-applause-and-cheering-502.wav');
const wrongSound = new Audio('../audios/mixkit-wrong-answer-fail-notification-946.wav');
const gameOverSound = new Audio('../audios/mixkit-sad-game-over-trombone-471.wav');

// Function to play the correct sound
const playCorrectSound = function() {
  correctSound.play();
};

// Function to play the wrong sound
const playWrongSound = function() {
  wrongSound.play();
};

// Function to play the game over sound
const playGameOverSound = function() {
  gameOverSound.play();
};


// Reset function
const handleReset = () => {
    // Reset game-specific variables
    guess.value = '';
    trials.innerHTML = '5';

    // Reset DOM
    display.style.color = "#eee";
    number.style.color = "#222"
    display.innerHTML = 'Guess My Number!';
    number.innerHTML = '?';
    check.removeAttribute("disabled");
    check.style.opacity = '1'
    msg.innerHTML = "Start guessing..."
    body.classList.add('body');
    body.classList.remove('fail', 'correct');
  };


  let isMuted = false;

// Function to toggle mute/unmute
const toggleMute = () => {
  isMuted = !isMuted;
  if (isMuted) {
    // Mute all audio elements
    correctSound.muted = true;
    wrongSound.muted = true;
    gameOverSound.muted = true;
    img1.style.display = 'block';
    img2.style.display = 'none';
  } else {
    // Unmute all audio elements
    correctSound.muted = false;
    wrongSound.muted = false;
    gameOverSound.muted = false;
    img1.style.display = 'none';
    img2.style.display = 'block';
  }
};
  
  

// Game function
const playGame = function(){
    // random number generator
        let randomNum = Math.ceil(Math.random() * 5);
    // For trials
        trials.innerHTML--;
        trials.innerHTML < 0 ? trials.innerHTML = 0 : trials.innerHTML
    // Conditionals
    if (guess.value == null || guess.value < 1 || guess.value > 5 || guess.value == ""){
        playWrongSound()
        warning.style.display = "block";
        warning.innerHTML = "please enter a number between 1-5";
        setTimeout(()=> warning.style.display = "none", 3000);
        guess.value = "";
    }else if(guess.value == randomNum){
        playCorrectSound()
        display.innerHTML = "Correct!!!";
        display.style.color = "green";
        number.innerHTML = randomNum;
        number.style.color = "green"
        body.classList.remove("fail")
        body.classList.remove("body")
        body.classList.add("correct")
        check.setAttribute("disabled", "true")
        check.style.opacity = '0.6'
        msg.innerHTML = "Play again!!"
        between.innerHTML = "Play again!!"
    }else if(trials.innerHTML == 0){
        playGameOverSound()
        display.innerHTML = "Game Over!!!";
        body.classList.remove("fail")
        body.classList.remove("correct")
        body.classList.add("body")
        guess.value = ""
        number.innerHTML = "?"
        check.setAttribute("disabled", "true")
        check.style.opacity = '0.6'
        msg.innerHTML = "Play again!!"
        between.innerHTML = "Play again!!"
    }else{
        playWrongSound()
        body.classList.remove("body")
        body.classList.remove("correct")
        body.classList.add("fail")
        display.innerHTML = "Opps you're wrong!"
        msg.innerHTML = "Continue playing"
    }
}

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

