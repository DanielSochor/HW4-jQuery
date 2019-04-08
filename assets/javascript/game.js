$(document).ready(function () {

    var Obi_Wan = 120;
    var Luke_Skywalker = 100;
    var Darth_Sidious = 150;
    var Darth_Maul = 180;
    var characterLife = { Obi_Wan, Luke_Skywalker, Darth_Sidious, Darth_Maul };
    console.log(characterLife);

    $(".button").on("click", function () {
        console.log("has player chosen: " + hasPlayerCharacterChosen);
        if (hasPlayerCharacterChosen == false) {
            $(".button").not(this).appendTo("#middle-row").addClass("choose-opponent");
            //$(this).addClass("chosen-character");
            //$(".chosen-character").off();
            yourFullLife = characterLife[$(this).attr("id")];
            hasPlayerCharacterChosen = true;
            console.log("test");
        } else if (opponentChosen_BattleIsPossible == false) {
            console.log("2nd click");
            $(this).appendTo("#bottom-row").addClass("selected-opponent").removeClass("choose-opponent");
            opponentFullLife = characterLife[$(this).attr("id")];
            opponentLife = opponentFullLife;
            opponentChosen_BattleIsPossible = true;
        }
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
                opponentChosen_BattleIsPossible = false;
                removeOpponent();
                youWin();
                showRestartButton();
            } else {
                removeOpponent();
                $("#your_attack").text("You have defeated " + $("#beaten_enemies > button").attr("id") + ", you can choose to fight another enemy.");
                $("#computer_attack").text("");
            }
        } else {
            battleOnGoing = false;
            opponentChosen_BattleIsPossible = false;
            console.log("You died");
            showRestartButton();
        }
    }

    function attack() {
        if (opponentChosen_BattleIsPossible = true) {
            battleOnGoing = true;
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
        counter = 1;
        console.log("restart game");
        $("#beaten_enemies").find(".button").appendTo("#top-row").show().removeClass("selected-opponent").removeClass("choose-opponent");
        $("#middle-row").find(".button").appendTo("#top-row").show().removeClass("selected-opponent").removeClass("choose-opponent");
        $("#bottom-row").find(".button").appendTo("#top-row").show().removeClass("selected-opponent").removeClass("choose-opponent");
        $("#top-row > button").removeClass("chosen-character");
        $("#your_attack").text("");
        $("#computer_attack").text("");
        $("#top-row > button").each(function(){
            var localCharacter = $(this).attr("id");
            var newLife = characterLife[localCharacter];
            $(this).find(".life").text(newLife);
        });
        hideRestartButton();
        hasPlayerCharacterChosen = false;
    }

    function youWin() {
        console.log("You win!");
    }

    function removeOpponent(){
        battleOnGoing = false;
        opponentChosen_BattleIsPossible = false;
        $("#bottom-row").find(".button").appendTo("#beaten_enemies").hide();
    }

    function showRestartButton() {
        var hasRestartButtonBeenCreated = false;
        if (!hasRestartButtonBeenCreated) {
            console.log("first restart");
            var restartGameButton = $('<input/>').attr({
                type: "button",
                id: "restartGame",
                value: "Play Again",
            });
            $("#restart").append(restartGameButton);
            hasRestartButtonBeenCreated = true;
        } else {
            console.log("second restart or greater");
            $("#restart").show();
        }
    }

    function hideRestartButton() {
        $("#restart").hide();
    }

    //life managament function can simplify this code
});