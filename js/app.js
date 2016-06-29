// Simplified y coordinates for assigning position of enemies
var laneThree = 224;
var laneTwo = 141;
var laneOne = 58;

// Stores the lanes
var lanes =[laneOne, laneTwo, laneThree];

var speeds = [200, 225, 285, 350, 450];

// Sets image and starting position of Player
var Player = function() {
    this.sprite = 'images/char-boy.png';
    this.x = 202;
    this.y = 390;

// Sets player to starting position. Use when collision or win
    this.resetPlayer = function() {
        this.x = 202;
        this.y = 390;
    };
// Gets x coordinate of player.  Used for collision detection
    this.getXPosition = function() {
        return this.x;
    };
// Gets y coordinate of player.  Used for collision detection.
     this.getYPosition = function() {
        return this.y;
    };

};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.update = function() {
    if (this.win()) {
        this.resetPlayer();
    }
};

// Takes the keyboard input and changes x and y position
// of player appropriately
Player.prototype.handleInput = function(direction) {
    console.log("handle input ");
    if (direction === 'left' && this.x > 50) {
        this.x = this.x - 101;
    }
    if (direction === 'right' && this.x < 400) {
        this.x = this.x + 101;
    }
    if (direction === 'up' && this.y > 40) {
        this.y = this.y - 83;
    }
    if (direction === 'down' && this.y < 390) {
        this.y = this.y + 83;
    }
};
// Determines when player reaches water
Player.prototype.win = function() {
    if (this.y === -25) {
        return true;
    }
};
// Instantiates new Player object
var player = new Player();

// Enemy constructor. Sets image, starting x and y coordinates, speed, lane
var Enemy = function() {

    this.x = 0;
    this.y = 0;
    this.sprite = 'images/enemy-bug.png';

    // Sets speed randomly from 5 options in speeds array
    this.setRandomSpeed = function() {
        this.speed = speeds[Math.floor((Math.random() * 5))];
    };

    // Sets lane randomly from 3 options in lanes array
    this.setRandomLane = function() {
        this.y = lanes[Math.floor((Math.random() * 3))];
    };
    this.setRandomSpeed();
    this.setRandomLane();
};
//Compares x and y positions of enemies and player to determine when a collision should register
Enemy.prototype.collision = function() {
    //On  lanes one two and three it is possible for the player and enemies y position to match exactly
    //The range for x coordinates is a result of trial and error of what looked right
    if (player.getYPosition() === this.y &&  (this.x > player.getXPosition() - 50 && this.x < player.getXPosition() + 60)) {
        return true;
    }
    else {
        return false;
    }
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// Checks x position is less than the edge of the canvas (606)
    if (this.x < 606) {
        this.x = this.x + this.speed * dt;
// Checks if a collision has occurred
        if (this.collision()) {
            player.resetPlayer();
        }

    }
// If enemy reaches edge of canvas without collision sets the enemy
// to a new random lane, random speed and to position 0 on the left
// edge of the canvas to begin again.
    else {

        this.setRandomLane();
        this.setRandomSpeed();

        this.x = 0;
    }

};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {

    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//  Instantiate enemies
var enemy1 = new Enemy(0);
var enemy2 = new Enemy(0);
var enemy3 = new Enemy(0);

//Create and populate array to hold the different Enemy types
var allEnemies = [enemy1, enemy2, enemy3];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
