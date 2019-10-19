let characterSelected = false;
let targetSelected = false;
let playerChoice = "";
let targetChoice = "";
let enemyCount = 3;

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
            player.attack = 5;

        }
    },

    loadTarget: function () {
        if (targetChoice === "fighter") {

            target.hp = 200;
            target.attack = 20;

        } else if (targetChoice === "knight") {
            target.hp = 175;
            target.attack = 25;

        } else if (target.Choice === "mage") {
            target.hp = 100;
            target.attack = 5;

        } else if (target.Choice === "ranger") {
            target.hp = 75;
            target.attack = 5;

        }
    },

    attack: function () {
        target.hp = target.hp - player.attack;
        player.hp = player.hp - target.counter;
        console.log("Player HP " + player.hp);
        console.log("Target HP " + target.hp)

    },

    check: function () {

        if (player.hp <= 0) {
            console.log("GAME OVER");
        } else if (target.hp <= 0) {
            console.log("DEFEATED ENEMY");
            let imageID = "#" + targetChoice;
            $(imageID).remove();
            targetSelected = false;
            enemyCount--;
            console.log(enemyCount);
            if (enemyCount == 0){
                console.log("ALL ENEMIES DEFEATED!");
            }
        }

    }

}

$(document).ready(function () {
    $("#attackBtn").on("click", function () {
        if ((characterSelected == true) && (targetSelected == true)) {
            
            game.attack();
            game.check();
        }

    })

    $(".character").on("click", function () {
        if (characterSelected == false) {
            playerChoice = $(this).attr("id");
            characterSelected = true;
            $(this).appendTo("#playerZone");
            game.loadPlayer();
        } else if (targetSelected == false) {
            targetSelected = true;
            targetChoice = $(this).attr("id");
            $(this).appendTo("#enemyZone");
            game.loadTarget();
        }

    })
})