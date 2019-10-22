let characterSelected = false;
let targetSelected = false;
let gameOver = false;
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

    //sets all stats back to initial values
    reset: function () {
        characterSelected = false;
        targetSelected = false;
        gameOver = false;
        playerChoice = "";
        targetChoice = "";
        enemyCount = 3;

        player = {
            hp: 100,
            attack: 10,
            counter: 5,
        };

        target = {
            hp: 100,
            attack: 10,
            counter: 5,
        };

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

    //Sets stats for chosen character
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
            player.attack = 10;

        }
        
        $("#playerZone").prepend($("<p>").text("Your Character:"));
    },

    //sets stats for enemy selection
    loadTarget: function () {

        if (targetChoice === "fighter") {
            target.hp = 200;
            target.counter = 50;

        } else if (targetChoice === "knight") {
            target.hp = 175;
            target.counter = 25;

        } else if (targetChoice === "mage") {
            target.hp = 175;
            target.counter = 15;

        } else if (targetChoice === "ranger") {
            target.hp = 75;
            target.counter = 25;

        }
        
        $("#enemyZone").prepend($("<p>").text("Your Opponent:"));
    },

    //attack calculations
    attack: function () {
        target.hp = target.hp - player.attack;
        player.hp = player.hp - target.counter;
        player.attack = player.attack + player.attack;

        console.log("Player HP " + player.hp);
        console.log("Target HP " + target.hp);
        
        $("#enemyZone .hpDisplay").text("HP: " + target.hp);
        $("#playerZone .hpDisplay").text("HP: " + player.hp);
        $("#playerZone .attackDisplay").text("Attack: " + player.attack);
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

    $("#attackBtn").on("click", function () {
        if (gameOver == false) {
            if ((characterSelected == true) && (targetSelected == true)) {

                game.attack();
                game.check();
            }
        }
    })

    $("#resetBtn").on("click", function () {
        game.reset();
    })

    $(".character").on("click", function () {
        if (characterSelected == false) {
            
            playerChoice = $(this).attr("id");
            characterSelected = true;
            
            $(this).clone().appendTo("#playerZone");
            $(this).hide();
            
            game.loadPlayer();
           
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
               
                game.loadTarget();
                
                $("#enemyZone").show();
                $("#topMessage").text("Click the attack button to fight!");
                $("#attackBtn").show();
            }
        }

    })
})