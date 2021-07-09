const buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let levelNumber = 0;
let userPattern = [];
const timer = ms => new Promise(res => setTimeout(res, ms))

$(document).on("keydown", function () {
    if (levelNumber === 0) {
        newRound();
    }
})

$(".btn").on("click", async function () {
    let chosenColor = this.id;
    userPattern.push(chosenColor);
    await flashAndPlay(chosenColor)
    if(userPattern.length === gamePattern.length) {
        for (let i = 0; i < userPattern.length; i++) {
            if (userPattern[i] !== gamePattern[i]) {
                $("body").css("background-color", "red").animate({opacity: 0}, 100).delay(300).animate({opacity: 1}, 100).css("background-color", "#011F3F");
                let sound = new Audio("sounds/wrong.mp3")
                $("h1").text("Game Over! Press a key to start again.")
                await sound.play();
                gamePattern = [];
                levelNumber = 0;
                userPattern = [];
                return;
            }
        }
        await timer(700);
        await newRound();
    }
})

async function newRound() {
    levelNumber += 1;
    userPattern = [];
    $("h1").text("Level " + levelNumber);
    let randomColor = buttonColors[nextSequence()];
    gamePattern.push(randomColor);
    for (let i = 0; i < gamePattern.length; i++) {
        await flashAndPlay(gamePattern[i]);
    }
}

function nextSequence() {
    return Math.floor(Math.random() * 4);
}

async function flashAndPlay(color) {
    $("." + color).animate({opacity: 1}, 100).delay(300).animate({opacity: 0.25}, 100);
    let sound = new Audio("sounds/" + color + ".mp3")
    await sound.play();
    await timer(700);
    sound.pause();
    sound.currentTime = 0;
}




