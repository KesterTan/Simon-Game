let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let userClickedPattern = [];
let level = 0;
let started = false;

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        started = true;
        // console.log(gamePattern);
        // console.log(userClickedPattern);
    }    
})

$(".btn").click(function(event) {
    let userChosenColour = event.target.id;
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    level++;
    userClickedPattern = [];

    $("#level-title").text(`Level ${level}`);
    
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    let audio = new Audio(`sounds/${randomChosenColour}.mp3`);
    audio.play();
}

function playSound(name) {
    let audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}
function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
    // console.log(userClickedPattern);
    // console.log(gamePattern);
}

function checkAnswer(currentLevel) {
    // console.log(userClickedPattern.length);
    // console.log(gamePattern.length);
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout( () => {
                nextSequence();}, 1000
                );
        }
    } else {
        let audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout( () => {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}



