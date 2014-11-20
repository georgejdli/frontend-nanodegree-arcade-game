// Enemies our player must avoid
var Enemy = function() {
    //give each enemy a random starting position
    //columns 1 to 5
    this.x = getRandomInt(0, 5) * 101;
    //rows 2 to 5
    this.y = getRandomInt(1, 5) * 83;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.speed = randomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed * dt;
    //once Enemy moves off screen to the right
    // set starting x position to 0
    if (this.x > 505) {
        this.x = 0;
        this.y = getRandomInt(1, 5) * 83;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //starting position
    this.x = 2 * 101;
    //bottom row
    this.y = 5 * 83;
    this.sprite = 'images/char-boy.png';


};
Player.prototype.update = function(dt) {

};
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x > 0 ? this.x = this.x - 101 : this.x = 404;
            break;
        case 'right':
            this.x < 404 ? this.x = this.x + 101 : this.x = 0;
            break;
        case 'up':
            this.y > 83 ? this.y = this.y - 83 : this.y = 415;
            break;
        case 'down':
            this.y < 415 ? this.y = this.y + 83 : this.y = 415;
            break;
    }

};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
(function () {
    for (var i = 0; i < 6; i++) {
        allEnemies[i] = new Enemy();
    }
})();

var player = new Player();

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
