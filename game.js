let userClickedPattern = [];
let gamePattern = [];
let buttonColors = ["red", "blue", "green", "yellow"];
let level = 0; 
let numberOfClicks = 0;

let gameStart = false;

document.addEventListener('keypress', function(){
    if(gameStart === false) {
        nextSequence();
        gameStart = true; 
    }
})

function playSound(name) {
    let audio = new Audio('sounds/' + name + ".mp3");
    audio.play();
}  
 
function animatePress(currentColor) {
    document.getElementById(currentColor).classList.add("push");  
    setTimeout(function(){
        document.getElementById(currentColor).classList.remove("push");
    }, 100) 
} 

const nextSequence = () => { 
    level++;
    document.getElementById("title").innerText = "Level " + level;
    let randomNumber = Math.floor(Math.random() * 4) 
    let randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    let selected = document.querySelector("#" + randomChosenColor)
    
    selected.classList.add("push");
    setTimeout(function(){
        selected.classList.remove("push"); 
    }, 100);
    playSound(randomChosenColor);
    userClickedPattern = [];
    
} 
  
nextSequence(); 
 

for(let i = 0; i < buttonColors.length; i++) {
    document.querySelectorAll(".box")[i].addEventListener('click', function(){
        numberOfClicks++;
        let userChosenColor = this.id;
        userClickedPattern.push(userChosenColor);
        playSound(userChosenColor); 
        animatePress(userChosenColor);
        checkAnswer();
    });
}; 
   
 
function checkAnswer() { 
    if(gamePattern[numberOfClicks-1] === userClickedPattern[numberOfClicks-1]){
        console.log("It is a success"); 
        if(numberOfClicks === gamePattern.length) {
            console.log("It is now reached"); 
            setTimeout(() => {
                // 

                D

                numberOfClicks = 0;
                nextSequence();
            }, 1500) 
        } 
    }else{
        console.log("FAIL"); 
        document.getElementById("title").innerText = "Game Over - Press a key to play again";
        document.getElementsByTagName("body")[0].classList.add("game-over");
        setInterval(() => {
            document.getElementsByTagName("body")[0].classList.remove("game-over");
        }, 100);
        startOver();
    } 
    
    console.log(gamePattern);
    console.log(userClickedPattern); 
    console.log(numberOfClicks); 
 
}

 



// function playArray() { 
//     let index = 0;
//     var interval = setInterval(() => {
//         playSound(gamePattern[index++]);
//         animatePress(gamePattern[index++])
//         if(index === gamePattern.length) {
//             clearInterval(interval);
//         } 
//     }, 1000)
 
    
// }   
 
// I want to compare the last entry in the pattern with the last click I made.

  

  

    
function startOver() { 
    gameStart = false;
    level = 0;
    gamePattern = [];
}
 