
// Thank you for preordering Wheel of Fortune** !!!!!
// ** Denotes beta

// Here are the Special Features!:
// -Handles phrases not just single words
// -Game understands if letter has already been selected
// -Only accepts alphanumeric characters
// -Handles upper and lower case condition of each letter
// -Each task is broken down into separate functions with very clear names
// -We're tried to make the job of the TA easier

// document.onkeydown = function (event) {
//     var userEntry = event.key;

// }

$(document).ready(function () {

    var Obi_Wan = 120;
    var Luke_Skywalker = 100;
    var Darth_Sidious = 150;
    var Darth_Maul = 180;
    var chracterLife = { Obi_Wan, Luke_Skywalker, Darth_Sidious, Darth_Maul };
    console.log(chracterLife);
    var counter = 1;

    var hasPlayerCharacterChoosen = false;
    var isBattleOngoing = false;
    var characterStartingLife = 0;
    var opponentStartingLife = 0;
    var yourDamage = 0;
    var computerDamage = 0;
    var characterRemainingLife = 0;
    var opponentRemainingLife = 0;
    var characterLifeSet = false;
    var gameSetUp = false;
    var yourDamage = 0;
    var computerDamage = 0;

    $(".character").on("click", function () {
        if (hasPlayerCharacterChoosen == false) {
            $(".character").not(this).appendTo("#middle-row").addClass("choose-opponent");
            $(this).addClass("choosen");
            $(".choosen").off();
            characterStartingLife = chracterLife[$(this).attr("id")];
            hasPlayerCharacterChoosen = true;
        } else if (isBattleOngoing == false) {
            $(this).appendTo("#bottom-row").addClass("selected-opponent");
            choosenOpponent = this.value;
            opponentStartingLife = chracterLife[$(this).attr("id")];
            isBattleOngoing = true;
        }
        //setUpGame(characterStartingLife, opponentStartingLife);
        //characterLife(characterStartingLife, opponentStartingLife); 
    });

    $("#attack").on("click", function () {
        //console.log(choosenCharacterRemainingLife);
        //console.log(choosenOpponentRemainingLife);
        setUpGame();
        //battle(yourDamage,computerDamage);
        battle();
    });

    function setUpGame() {
        if (gameSetUp == false) {
            console.log("game set up");
            characterRemainingLife = characterStartingLife;
            opponentRemainingLife = opponentStartingLife;
            yourDamage = 0.1 * characterStartingLife * counter;
            computerDamage = 0.1 * opponentStartingLife;
            gameSetUp = true;
        } else {
            console.log("game already set up");
        }
    }

    function battle() {
        var you = $("#top-row > .button").prop("id");
        console.log(you);
        var opponent = $("#bottom-row > .button").prop("id");
        console.log(opponent);
        console.log(characterStartingLife);
        console.log(opponentStartingLife);
        console.log("characterRemainingLife: " + characterRemainingLife);
        console.log("characterRemainingLife: " + opponentRemainingLife);
        if ((characterRemainingLife > 0) && (opponentRemainingLife > 0)) {
            characterRemainingLife = characterRemainingLife - computerDamage;
            opponentRemainingLife = opponentRemainingLife - (counter * yourDamage);
            console.log("game in play");
            counter++;
            console.log(characterRemainingLife);
            console.log(opponentRemainingLife);
            $("#top-row").find(".life").text(characterRemainingLife);
            $("#bottom-row").find(".life").text(opponentRemainingLife);
            if ((characterRemainingLife <= 0) && (opponentRemainingLife >= 0)) {
                $("#top-row").find(".life").text("0");
                isBattleOngoing = false;
                console.log("opponent has won");
            } else if ((characterRemainingLife >= 0) && (opponentRemainingLife <= 0)) {
                $("#bottom-row").find(".life").text("0");
                isBattleOngoing = false;
                console.log("character has won");
                $("#bottom-row").remove(".button");
            }
        }
        $("#your_attack").text("You attacked " + opponent + " for " + yourDamage + " damage.");
        $("#computer_attack").text(opponent + " attacked you for " + computerDamage + " damage");
        //if opponent life falls below zero make them disappear
    }

    function resetGame() {

    }
});


