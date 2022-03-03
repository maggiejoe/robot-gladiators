var playerInfo = {
    name: window.prompt("What is your robot's name?"),
    health: 100,
    attack: 10,
    money: 10,
};

//You can also log multiple values at once like this
console.log(playerInfo.name, playerInfo.attack, playerInfo.health);

var enemyNames = ["Roborto", "Amy Android", "Robo Tumble"];
var enemyHealth = 50;
var enemyAttack = 12;

//function to generate a random numeric value
var randomNumber = function(min, max) {
    var value = Math.floor(Math.random() * (max - min +1) + min);

    return value;
};

var fight = function(enemyName) {
    // fight function statements
    //repeat and execute as long as the enemy-robot is alive
    while(playerInfo.health > 0 && enemyHealth > 0) {
        //if player choses to fight, then fight
        var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');

         // if player choses to skip
        if (promptFight === "skip" || promptFight === "SKIP") {
            // confirm player wants to skip
            var confirmSkip = window.confirm("Are you sure you'd like to quit?");

            // if yes (true) leave fight
            if (confirmSkip) {
                window.alert(playerInfo.name + " has decided to skip this fight. Goodbye!");
                //subtract money from playerInfo.money for skipping
                playerInfo.money = Math.max(0, playerInfo.money -10);
                console.log("playerInfo.money", playerInfo.money);
                break;
            }
        }   
        
        //remove enemy's health by subtracting the amount set in the playerinfo.attack variable
        // generate random damage value based on player's attack power
        var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack);
        enemyHealth = Math.max(0, enemyHealth - damage);
        console.log(
            playerInfo.name + " attacked " + enemyName + ". " + enemyName + " now has " + enemyHealth + " health remaining."
        );

        // check enemy's health
        if (enemyHealth <= 0) {
            window.alert(enemyName + " has died!");
                 
            // award player money for winning
            playerInfo.money = playerInfo.money + 20;
            //leave while() loop since eney mis dead
            break;
        } else {
            window.alert(enemyName + " still has " + enemyHealth + " health left.");
        }

        // remove player's health by subtracting the amount set in the enemyAttack variable
        var damage = randomNumber(enemyAttack - 3, enemyAttack);

        playerInfo.health = Math.max(0, playerInfo.health - damage);
        console.log(
            enemyName + " attacked " + playerInfo.name + ". " + playerInfo.name + " now has " + playerInfo.health + " health remaining."
        );            

        // check player's health
        if (playerInfo.health <= 0) {
            window.alert(playerInfo.name + " has died!");
            if (playerInfo.health > 0) {
                window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
            }
        } else {
            window.alert(playerInfo.name + " still has " + playerInfo.health + " health left.");
        }
    }
};

// function to start a new game
var startGame = function() {
    // reset player stats
    playerInfo.health = randomNumber();
    playerInfo.attack = 10;
    playerInfo.money = 10;
    for (var i = 0; i < enemyNames.length; i++) {
        if (playerInfo.health > 0) {
            window.alert("Welcome to Robot Gladiators! Round " + (i + 1) );
        var pickedEnemyName = enemyNames[i];

        enemyHealth = randomNumber(40, 60);

        fight(pickedEnemyName);

        // if we're not at the last enemy in the array
        if (playerInfo.health > 0 && i < enemyNames.length - 1) {
            //as if player wants to use the store before next round
            var storeConfirm = window.confirm("The fight is over, visit the store before the next round?");

            // if yes, take them to the store () function
            if (storeConfirm) {
            shop();
            }
        }
        } 
        else {
            window.alert("You have lost your robot in battle! Game Over!");
        }
    }

    // play again
    endGame();
};

//function to end the entire game
var endGame = function() {
    //if player is still alive, player wins!
    if (playerInfo.health >0) {
        window.alert("Great job, you've survived the game! You now have a score of " + playerInfo.money + ".");
    }
    else {
        window.alert("You've lost your robot in battle.");
    }

    // as player if they'd like to play again
    var playAgainConfirm = window.confirm("Would you like to play again?")

    if (playAgainConfirm) {
        //reset the game
        startGame();
    }
    else {
        window.alert("Thank you for playing Robot Gladiators! Come back soon!");
    }
}

var shop = function() {
    //as player what they'd like to do
    var shopOptionPrompt = window.prompt(
        "Would you like to REFILL your health, UPGRADE your attack, or LEAVE the store? Please enter one: 'REFILL', 'UPGRADE', OR 'LEAVE' to make a chioce."
    );

    // use swithc to carry out action
    switch (shopOptionPrompt) {
        case "REFILL": // new case
        case "refill":
            if (playerInfo.money >= 7) {
            window.alert("refilling palyer's health by 20 for 7 dollars.");

            // increase health and decrease money
            playerInfo.health = playerInfo.health + 20;
            playerInfo.money = playerInfo.money - 7;
        }
        else {
            window.alert("You don't have enough money!")
        }
        break;
        
        case "UPGRADE": // new case
        case "upgrade":
            if (playerInfo.money >= 7) {
            window.alert("Upgrading player's attack by 6 for 7 dollars.");

            // increase attack and decrease money
            playerInfo.attack = playerInfo.attack + 6;
            playerInfo.money = playerInfo.money - 7;
        }
        else {
            window.alert("You don't have enough money!");
        }
        break;
        
        case "LEAVE": // new case
        case "leave":
            window.alert("Leaving the store.");

            // do nothing, so function will end
            break;
        
        default:
            window.alert("You did not pick a valid option. Try again.");

            //call shop() again to force player to pick a valid optoin
            shop();
            break;
    }
};

// calling startGame function - start the game when the page loads
startGame();