const buttonColors = ["green", "red", "yellow", "blue"];
var gamePattern = [];
var userClickedPattern = [];
var numberOfClicks = 0;
var level = 1;
let gameStart = false;
let listenersSet = false;


document.addEventListener("keypress", function(){
    if(gameStart === false) {
        register();
        nextSequence();
        gameStart = true; 
        document.getElementById("title").innerText = "Level " + level;
    }
})
 
const nextSequence = function() {
    document.querySelector("body").classList.remove("game-over");
    let randomNumber = Math.floor(Math.random() * 4) ;
    gamePattern.push(buttonColors[randomNumber]);
    animate(buttonColors[randomNumber]);
    playSound(buttonColors[randomNumber]);  
    userClickedPattern = [];   

}
 
function register() {
    for(var i = 0; i < buttonColors.length; i++) {
        document.querySelectorAll(".box")[i].addEventListener('click', userClick);
    }
}

function deregister() {
    for(var i = 0; i < buttonColors.length; i++) {
        document.querySelectorAll(".box")[i].removeEventListener('click', userClick)
    }
}

function userClick() {
    let button = this.id;
    numberOfClicks++;
    userClickedPattern.push(button);
    animate(button);
    checkAnswer(button);
} 



function checkAnswer(button) {
    if(gamePattern[numberOfClicks-1] === userClickedPattern[numberOfClicks-1]) {
        console.log("Success");
        playSound(button);
        if(numberOfClicks === gamePattern.length) { 
          setTimeout(() => {
            numberOfClicks = 0;
            playButtons();
          }, 1000);
          deregister();    
        }
    }else{
        console.log("Failed ");
        playSound('wrong');
        document.getElementById("title").innerText = failedMessages() + "\n Press a key to play again";
        document.getElementsByTagName("body")[0].classList.add("game-over");
        resetGame();    
    }
} 
 

function animate(color) {
    const button = document.getElementById(color);
    button.classList.add("push");
    setTimeout(() => {
        button.classList.remove("push");
    }, 100)
}

function playSound(color) {
    const audio = new Audio('sounds/' + color + ".mp3");
    audio.play(); 
  
}

function playButtons() {
    let index = 0;
    const interval = setInterval(() => { 
        if(index === gamePattern.length) { 
            clearInterval(interval);
            nextSequence(); 
            register();
        }else{
            animate(gamePattern[index]);
            playSound(gamePattern[index]);
            index++;
        }
    }, 1000); 
    level++;
    document.getElementById("title").innerText = "Level " + level;
}
 
function resetGame() { 
    document.getElementsByTagName("body")[0].style.color = "red";
    gamePattern = []; 
    userClickedPattern = []; 
    level = 1; 
    gameStart = false; 
    numberOfClicks = 0;
    deregister();
}  


function failedMessages() {
   
    let messages = 
    [
        "Oh dear... Oh dear, oh dear",
        "Chin up... ave' another go",
        "Are you....SERIOUS?",
        "Oh look this is just stupid....do it again",
        "HEY....! Play again",
        "Has anyone told you lately your beautiful? Try again",
        "BWHAHAHAHA - Oh man.... that was entertaining",
        "I seriously think you need to get outside",
        "Games aren't for everyone...Have you tried stamp collecting",
        "They say theres no such thing as perfection... I say they're wrong",
        "OH MY GOD... ",
        "Stressful...isn't it?",
        "Hey baby it's ALL good.",
        "I am trying not to laugh...HAHAHA"
    ];

    let message = Math.floor(Math.random() * messages.length);

    return messages[message];
}