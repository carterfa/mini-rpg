let characterSelected = false;
let targetSelected = false;
let gameOver = false;

let playerChoice = "";
let targetChoice = "";

let enemyCount = 3;
let attackMult = 1;

let player = {
    hp: 0,
    attack: 0,
};

let target = {
    hp: 0,
    counter: 0,
};

const characters = {

    fighter: {
        hp: 200,
        attack: 20,
        counter: 5,
    },

    knight: {
        hp: 175,
        attack: 25,
        counter: 25,
    },

    mage: {
        hp: 250,
        attack: 5,
        counter: 15,
    },

    ranger: {
        hp: 75,
        attack: 50,
        counter: 50,
    },

};


const game = {

    //sets all stats back to initial values
    reset: function () {
        characterSelected = false;
        targetSelected = false;
        gameOver = false;
        playerChoice = "";
        targetChoice = "";
        enemyCount = 3;
        attackMult = 1;

        $("#playerZone").empty();
        $("#enemyZone").empty();

        $("#playerZone").hide();
        $("#enemyZone").hide();

        $("#resetBtn").hide();
        $("#attackBtn").hide();
        $("#selectZone").show();

        $("#topMessage").text("Select a character to begin.");

        $("#fighter").show();
        $("#mage").show();
        $("#knight").show();
        $("#ranger").show();


        //window.location.reload(true);

    },

    //attack calculations
    attack: function () {
        target.hp = target.hp - (attackMult * player.attack);
        player.hp = player.hp - target.counter;

        attackMult++;

        console.log("Player HP " + player.hp);
        console.log("Target HP " + target.hp);

        $("#enemyZone .hpDisplay").text("HP: " + target.hp);
        $("#playerZone .hpDisplay").text("HP: " + player.hp);
        //$("#playerZone .attackDisplay").text("Attack: " + (attackMult*player.attack));
    },

    //runs game over or win state
    check: function () {

        if (player.hp <= 0) {

            gameOver = true;

            $("#topMessage").text("GAME OVER");
            $("#attackBtn").hide();
            $("#playerZone").empty();

        } else if (target.hp <= 0) {

            $("#topMessage").text("Opponent defeated! Choose a new enemy!");
            $("#enemyZone").empty();

            targetSelected = false;

            enemyCount--;
            //checks for win state
            if (enemyCount == 0) {

                $("#topMessage").text("All enemies defeated! You are the champion!");
                $("#attackBtn").hide();

            }
        }

    },

}

$(document).ready(function () {

    //attack button
    $("#attackBtn").on("click", function () {
        if (gameOver == false) {
            if ((characterSelected == true) && (targetSelected == true)) {

                game.attack();
                game.check();
            }
        }
    })

    //reset button
    $("#resetBtn").on("click", function () {
        game.reset();
    })

    //character selection
    $(".character").on("click", function () {
        if (characterSelected == false) {

            playerChoice = $(this).attr("id");
            characterSelected = true;
            console.log(playerChoice);
            console.log(playerChoice.hp)
            console.log(playerChoice.attack)

            $(this).clone().appendTo("#playerZone");
            $(this).hide();

            player = characters[playerChoice];

            $("#playerZone").prepend($("<p>").text("CHARACTER:"));

            $("#resetBtn").show();
            $("#playerZone").show();
            $("#topMessage").text("Character selected! Choose an enemy!");

        } else if (targetSelected == false) {
            targetChoice = $(this).attr("id");
            console.log(targetChoice);

            if (targetChoice !== playerChoice) {

                targetSelected = true;

                $(this).clone().appendTo("#enemyZone");
                $(this).hide();

                target = characters[targetChoice];
                $("#enemyZone").prepend($("<p>").text("OPPONENT:"));

                $("#enemyZone").show();
                $("#topMessage").text("Click the attack button to fight!");
                $("#attackBtn").show();
            }
        }

    })
})