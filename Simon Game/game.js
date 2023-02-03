var userClickedPattern = [];

var gamePattern = [];

var started = false;

var level = 0;

var buttonColors = ["red","blue","green","yellow"];

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
        
    }
});

$(".btn").click(function() { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    

    playSound(userChosenColour);
    animatePress(userChosenColour);  
    checkAnswer(userClickedPattern.length-1);  
});





function nextSequence(){
    userClickedPattern = [];
    level++;

    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

}

function playSound(input){
    var audio = new Audio("sounds/" + input + ".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
      
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
            $("#level-title").text("Game Over, Press Any Key to Restart");

        },200);

        startOver();

      
    }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
  }




  


