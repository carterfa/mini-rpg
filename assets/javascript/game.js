let characterSelected = false;
let targetSelected = false;
let playerChoice = "";
let targetChoice = "";

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

    attack: function () {
        target.hp = target.hp - player.attack;
        player.hp = player.hp - target.counter;
        console.log(target.hp);
        console.log(player.hp);

    },

    check: function () {
        if (player.hp <= 0) {
            console.log("GAME OVER");
        } else if (target.hp <= 0) {
            console.log("YOU WIN");
        }

    }

}

$("#attackBtn").on("click", function () {
    if ((characterSelected = true) && (targetSelected = true)) {
        game.attack();
        game.check();
    }

})

$(".character").on("click", function () {
    if (characterSelected == false) {
        playerChoice = $(this).attr("id");
        characterSelected = true;
        $(this).appendTo("#playerZone");
    } else if (targetSelected == false) {
        targetSelected = true;
        targetChoice = $(this).attr("id");
        $(this).appendTo("#enemyZone");
    }

})


let fighterStats = {
    hp: 100,
    attack: 10,
    counter: 5,
    player: false,
    targeted: false
};

let knightStats = {
    hp: 100,
    attack: 10,
    counter: 5,
    player: false,
    targeted: false
};

let darkMageStats = {
    hp: 100,
    attack: 10,
    counter: 5,
    player: false,
    targeted: false
};

let rangerStats = {
    hp: 100,
    attack: 10,
    counter: 5,
    player: false,
    targeted: false
};