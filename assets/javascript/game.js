
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
var obiWanLifeRemainingLife = 120
var obiWanLifeReduction = 10


$(document).ready(function () {

    var playerCharacterChoosen = false;
    var opponentChossen = false;
    var battleOngoing = false;

    $(".character").on("click", function () {
        if (playerCharacterChoosen == false) {
            $(".character").not(this).appendTo("#middle-row").addClass("choose-opponent");
            $(this).addClass("choosen");
            $(".choosen").off();
            playerCharacterChoosen = true;
        } else if (battleOngoing == false) {
            $(this).appendTo("#bottom-row").addClass("selected-opponent");
            battleOngoing = true;
        }
    });

    $("#attack").on("click", function () {
        battle();
    });

    function battle() {
        console.log("hello");
        battleOngoing = false;
    }

    function lifeReduction() {
        obiWanLifeRemainingLife = obiWanLifeRemainingLife - obiWanLifeReduction
        $("#Obi-Wan-Life").text(obiWanLifeRemainingLife);
        //console.log("reduction");
    }

});
