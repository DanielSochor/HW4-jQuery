
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

    var Obi_Wan = 120;
    var Luke_Skywalker = 100;
    var Darth_Sidious = 150;
    var Darth_Maul = 180;
    var chracterLife = {Obi_Wan,Luke_Skywalker,Darth_Sidious,Darth_Maul};
    console.log(chracterLife);
    var counter = 1;

    var hasPlayerCharacterChoosen = false;
    var isBattleOngoing = false;
    //var choosenCharacter = 0;
    //var choosenOpponent = 0;
    var choosenCharacterStartingLife = 0;
    var choosenOpponentStartingLife = 0;
    var yourDamage = 0;
    var computerDamage = 0;
    var choosenCharacterRemainingLife = 0;
    var choosenOpponentRemainingLife = 0;

    $(".character").on("click", function () {
        if (hasPlayerCharacterChoosen == false) {
            $(".character").not(this).appendTo("#middle-row").addClass("choose-opponent");
            $(this).addClass("choosen");
            $(".choosen").off();
            //choosenCharacter = this.value;
            choosenCharacterStartingLife = chracterLife[$(this).attr("id")];
            //console.log(choosenCharacterStartingLife);
            hasPlayerCharacterChoosen = true;
        } else if (isBattleOngoing == false) {
            $(this).appendTo("#bottom-row").addClass("selected-opponent");
            choosenOpponent = this.value;
            choosenOpponentStartingLife = chracterLife[$(this).attr("id")];
            //console.log(choosenOpponentRemainingLife);
            //console.log(choosenOpponent);
            isBattleOngoing = true;
        }
    });

    var choosenCharacterRemainingLife = choosenCharacterStartingLife;
    var choosenOpponentRemainingLife = choosenOpponentStartingLife;

    $("#attack").on("click", function () {
        console.log(choosenCharacterRemainingLife);
        console.log(choosenOpponentRemainingLife);
        yourDamage = 0.1 * choosenCharacterStartingLife * counter;
        computerDamage = 0.1 * choosenOpponentStartingLife;
        battle();
    });

    function battle() {
        if ((choosenCharacterRemainingLife > 0) && (choosenOpponentRemainingLife > 0)) {
           choosenCharacterRemainingLife = choosenCharacterRemainingLife - computerDamage;
           choosenOpponentRemainingLife = choosenOpponentRemainingLife - (counter * yourDamage);
            console.log("game in play");
            counter ++;
            console.log(choosenCharacterRemainingLife);
            console.log(choosenOpponentRemainingLife);
        } else {
            isBattleOngoing = false;
        }

        $("#your_attack").text("You attacked for " + yourDamage + " damage.");
        $("#computer_attack").text("attacked you for " + computerDamage + " damage");
    }

    function lifeReduction() {
        obiWanLifeRemainingLife = obiWanLifeRemainingLife - obiWanLifeReduction
        $("#Obi-Wan-Life").text(obiWanLifeRemainingLife);
        //console.log("reduction");
    }

});
