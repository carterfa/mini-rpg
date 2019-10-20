let characterSelected = false;
let targetSelected = false;
let gameOver = false;
let playerChoice = "";
let targetChoice = "";
let enemyCount = 3;

let playerDisplay = "";
let targetDisplay = "";

let player = {
    hp: 100,
    attack: 10,
    counter: 5,
};

let target = {
    hp: 100,
    attack: 10,
    counter: 5,
};

const game = {

    loadPlayer: function () {
        if (playerChoice === "fighter") {

            player.hp = 200;
            player.attack = 20;

        } else if (playerChoice === "knight") {
            player.hp = 175;
            player.attack = 25;

        } else if (playerChoice === "mage") {
            player.hp = 100;
            player.attack = 5;

        } else if (playerChoice === "ranger") {
            player.hp = 75;
            player.attack = 15;

        }
        playerDisplay = $("<p>").text("HP: "+player.hp);
        playerDisplay.attr("id","playerDisplay");
        $("#playerZone").append(playerDisplay);
    },

    loadTarget: function () {

        if (targetChoice === "fighter") {
            target.hp = 200;
            target.counter = 20;

        } else if (targetChoice === "knight") {
            target.hp = 175;
            target.counter = 25;

        } else if (targetChoice === "mage") {
            target.hp = 175;
            target.counter = 5;

        } else if (targetChoice === "ranger") {
            target.hp = 150;
            target.counter = 10;

        }
        targetDisplay = $("<p>").text("HP: "+target.hp);
        targetDisplay.attr("id","targetDisplay");
        $("#enemyZone").append(targetDisplay);
    },

    attack: function () {
        target.hp = target.hp - player.attack;
        player.hp = player.hp - target.counter;
        player.attack = player.attack + player.attack;
        console.log("Player HP " + player.hp);
        console.log("Target HP " + target.hp);
        targetDisplay.text("HP: "+target.hp);
        playerDisplay.text("HP: "+player.hp);
    },

    check: function () {

        if (player.hp <= 0) {
            gameOver = true;
            $("#topMessage").text("GAME OVER");
            $("#attackBtn").hide();
            $("#playerZone").empty();
        } else if (target.hp <= 0) {
            console.log("DEFEATED ENEMY");
            $("#enemyZone").empty();
            targetSelected = false;
            enemyCount--;
            if (enemyCount == 0) {
                $("#topMessage").text("ALL ENEMIES DEFEATED! YOU ARE THE CHAMPION!");
                $("#attackBtn").hide();
            }
        }

    }

}

$(document).ready(function () {
    $("#attackBtn").on("click", function () {
        if (gameOver == false) {
            if ((characterSelected == true) && (targetSelected == true)) {

                game.attack();
                game.check();
            }
        }
    })

    $(".character").on("click", function () {
        if (characterSelected == false) {
            playerChoice = $(this).attr("id");
            characterSelected = true;
            $(this).appendTo("#playerZone");
            game.loadPlayer();
            $("#topMessage").text("Character selected! Choose an enemy!");
        } else if (targetSelected == false) {
            targetChoice = $(this).attr("id");
            console.log(targetChoice);
            if (targetChoice !== playerChoice) {
                targetSelected = true;
                $(this).appendTo("#enemyZone");
                game.loadTarget();
                $("#topMessage").text("Click the attack button to fight!");
                $("#attackBtn").show();
            }
        }

    })
})