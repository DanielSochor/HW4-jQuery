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
            yourFullLife = characterLife[$(this).attr("id")];
            yourLife = yourFullLife;
            hasPlayerCharacterChosen = true;
        } else if (opponentChosen_BattleIsPossible == false) {
            $(this).appendTo("#bottom-row").addClass("selected-opponent").removeClass("choose-opponent");
            opponentFullLife = characterLife[$(this).attr("id")];
            opponentLife = opponentFullLife;
            opponentChosen_BattleIsPossible = true;
        }
    });

    $("#attack").on("click", function () {
        if (opponentChosen_BattleIsPossible) {
            battle();
        }
    });

    $("#restart").on("click", function () {
        restartGame();
    });

    var hasPlayerCharacterChosen = false;
    var opponentChosen_BattleIsPossible = false;
    var hasRestartButtonBeenCreated = false;
    var counter = 1;
    var yourFullLife = 0;
    var opponentFullLife = 0;
    var yourLife = 0;
    var opponentLife = 0;

    function battle() {
        if (yourLife > 0) {
            if (opponentLife > 0) {
                console.log("battle1");
                attack()
                counter++;
            } else if ($("#middle-row").is(':empty')) {
                console.log("battle2");
                console.log("You win!");
                removeOpponent();
                showRestartButton();
            } else {
                console.log("battle3");
                removeOpponent();
                $("#your_attack").text("You have defeated " + $("#beaten_enemies > character").attr("id") + ", you can choose to fight another enemy.");
                $("#computer_attack").text("");
            }
        } else {
            console.log("battle4");
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
            $("#your_attack").text("You attacked " + $("#bottom-row > character").attr("id") + " for " + yourDamage + " damage.");
            $("#computer_attack").text($("#bottom-row > character").attr("id") + " attacked you for " + computerDamage + " damage");
        }
    }

    function restartGame() {
        counter = 1;
        //console.log("restart game");
        $("#beaten_enemies").find(".character").appendTo("#top-row").show().removeClass("selected-opponent").removeClass("choose-opponent");
        $("#middle-row").find(".character").appendTo("#top-row").show().removeClass("selected-opponent").removeClass("choose-opponent");
        $("#bottom-row").find(".character").appendTo("#top-row").show().removeClass("selected-opponent").removeClass("choose-opponent");
        $("#top-row > character").removeClass("chosen-character");
        $("#your_attack").text("");
        $("#computer_attack").text("");
        $("#top-row").find(".character").each(function(){
            //This restores the life shown for each character
            console.log("reload life");
            var localCharacter = $(this).attr("id");
            var newLife = characterLife[localCharacter];
            $(this).find(".life").text(newLife);
        });
        $("#restart").hide();
        hasPlayerCharacterChosen = false;
    }

    function removeOpponent(){
        opponentChosen_BattleIsPossible = false;
        $("#bottom-row").find(".character").appendTo("#beaten_enemies").hide();
    }

    function showRestartButton() {
    
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
    //life managament function can simplify this code
});