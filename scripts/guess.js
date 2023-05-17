// selecting DOM elements
const display = document.querySelector('#display');
const check = document.querySelector('.check');
const reset = document.querySelector('.again');
let guess = document.querySelector('.guess');
let number = document.querySelector('.number');
let trials = document.querySelector('.trials');
const warning = document.querySelector('.warning');
const msg = document.querySelector('.message');
const body = document.querySelector('body');



const playGame = function(){
    let randomNum = Math.ceil(Math.random() * 5);
// console.log(randomNum);

// For trials
    trials.innerHTML--;
    trials.innerHTML < 0 ? trials.innerHTML = 0 : trials.innerHTML

if (guess.value == null || guess.value < 1 || guess.value > 5 || guess.value == ""){
    // playSound()
    warning.style.display = "block";
    warning.innerHTML = "please enter a number between 1-5";
    setTimeout(()=> warning.style.display = "none", 3000);
    guess.value = "";
}else if(guess.value == randomNum){
    playSound1()
    display.innerHTML = "Correct!!!";
    number.innerHTML = randomNum;
    body.classList.remove("fail")
    body.classList.remove("body")
    body.classList.add("correct")
    

}else if(trials.innerHTML == 0){

    display.innerHTML = "Game Over!!!";
    body.classList.remove("fail")
    body.classList.remove("correct")
    body.classList.add("body")
    guess.value = ""
    number.innerHTML = "?"
    check.setAttribute("disabled", "true")
    msg.innerHTML = "Play again!!"
}else{
    // playSound2()
    body.classList.remove("body")
    body.classList.remove("correct")
    body.classList.add("fail")
    display.innerHTML = "Opps you're wrong!"
    msg.innerHTML = "Continue playing"
}
}

// playGames()
check.addEventListener('click', playGame);
reset.addEventListener('click', handleReset);
// Reset function
function handleReset(){
    window.location.reload()
}