$(document).ready(function () {

    var Obi_Wan = 120;
    var Luke_Skywalker = 100;
    var Darth_Sidious = 150;
    var Darth_Maul = 180;
    var characterLife = { Obi_Wan, Luke_Skywalker, Darth_Sidious, Darth_Maul };
    console.log(characterLife);

    $(".character").on("click", function () {
        if (hasPlayerCharacterChosen == false) {
            $(".character").not(this).appendTo("#middle-row").addClass("choose-opponent");
            $(this).addClass("choosen");
            $(".choosen").off();
            yourFullLife = characterLife[$(this).attr("id")];
            hasPlayerCharacterChosen = true;
        } else if (opponentChosen_BattleIsPossible == false) {
            $(this).appendTo("#bottom-row").addClass("selected-opponent");
            opponentFullLife = characterLife[$(this).attr("id")];
            opponentLife = opponentFullLife;
            opponentChosen_BattleIsPossible = true;
        }
        //console.log(characterLife[$("#top-row > #button").attr("id")]);
    });

    $("#attack").on("click", function () {
        if (opponentChosen_BattleIsPossible) {
            initializeGame();
            battle();
        }
    });

    $("#restart").on("click", function () {
        restartGame();
    });

    var hasPlayerCharacterChosen = false;
    var opponentChosen_BattleIsPossible = false;
    var battleOnGoing = false;
    var counter = 1;
    var yourFullLife = 0;
    var opponentFullLife = 0;
    var yourLife = 0;
    var opponentLife = 0;

    function initializeGame() {
        if (!battleOnGoing) {
            yourLife = yourFullLife;
            battleOnGoing = true;
        }
    }

    function battle() {
        if (yourLife > 0) {
            if (opponentLife > 0) {
                attack()
                counter++;
            } else if ($("#middle-row").is(':empty')) {
                removeOpponent();
                youWin();
                showRestartButton();
            } else {
                removeOpponent();
                $("#your_attack").text("You have defeated " + $("#beaten_enemies > button").attr("id") + ", you can choose to fight another enemy.");
                $("#computer_attack").text("");
            }
        } else {
            opponentChosen_BattleIsPossible = false;
            console.log("You died");
            showRestartButton();
        }
    }

    function attack() {
        if (opponentChosen_BattleIsPossible = true) {
            var yourDamage = Math.min(50, (0.1 * (yourFullLife * counter)));
            var computerDamage = 0.1 * opponentFullLife;
            yourLife = Math.max(0, (yourLife - computerDamage));
            opponentLife = Math.max(0, (opponentLife - yourDamage));
            $("#top-row").find(".life").text(yourLife);
            $("#bottom-row").find(".life").text(opponentLife);
            $("#your_attack").text("You attacked " + $("#bottom-row > button").attr("id") + " for " + yourDamage + " damage.");
            $("#computer_attack").text($("#bottom-row > button").attr("id") + " attacked you for " + computerDamage + " damage");
        }
    }

    function restartGame() {
        console.log("restart game");
        hasPlayerCharacterChoosen = false;
        $("#beaten_enemies").find(".button").appendTo("#top-row").show().removeClass("selected-opponent").removeClass("choose-opponent");
        $("#middle-row").find(".button").appendTo("#top-row").show().removeClass("selected-opponent").removeClass("choose-opponent");
        $("#bottom-row").find(".button").appendTo("#top-row").show().removeClass("selected-opponent").removeClass("choose-opponent");
        $("#your_attack").text("");
        $("#computer_attack").text("");
        $("#top-row > button").each(function(){
            var localCharacter = $(this).attr("id");
            console.log(localCharacter);
            console.log($(this).find(".life").text());
            var newLife = characterLife[localCharacter];
            console.log(newLife);
            $(this).find(".life").text(newLife);
        });
    }

    function youWin() {
        console.log("You win!");
    }

    function removeOpponent(){
        opponentChosen_BattleIsPossible = false;
        $("#bottom-row").find(".button").appendTo("#beaten_enemies").hide();
    }

    function showRestartButton() {
        var restartGameButton = $('<input/>').attr({
            type: "button",
            id: "restartGame",
            value: "Play Again",
        });
        $("#restart").append(restartGameButton);
    }

    // bottom row is empty you won
});