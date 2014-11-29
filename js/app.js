//TODO give players a stamina factor, need to gather gems to recover stamina
//isn't this kind of the same as having lives?
//no, stamina goes down when you move
//maybe lose stamina when bugs hit you?
//or have a separate lives system?
var rowSprites = {
    "1": 0,
    "2": 1 * 83 - 20,
    "3": 2 * 83 - 20,
    "4": 3 * 83 - 20,
    "5": 4 * 83 - 20,
    "6": 5 * 83 - 20
};

// Enemies our player must avoid
var Enemy = function() {
    //give each enemy a random starting position
    //columns 1 to 5
    this.x = getRandomInt(0, 5) * 101;
    //rows 2 to 4
    this.y = rowSprites[getRandomInt(2, 5)];
    this.width = 101;
    this.pos = [this.x, this.y];
    this.size = [101, 171];
    this.sprite = 'images/enemy-bug.png';
    this.speed = randomSpeed();
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //once Enemy moves off screen to the right
    // set starting x position off screen to -101
    if (this.x > 505) {
        this.x = -101;
        this.y = rowSprites[getRandomInt(2, 5)];

    }
    this.pos = [this.x, this.y];
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 5;
    ctx.strokeRect(this.x, this.y, 101, 171);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    //starting position
    this.x = 2 * 101;
    //bottom row
    this.y = rowSprites[6];
    this.pos = [this.x + 14, this.y];
    this.size = [73, 171];
    this.sprite = 'images/char-boy.png';
};
Player.prototype.update = function(dt) {
    this.pos = [this.x + 14, this.y];
};
Player.prototype.reset = function() {
    this.x = 2 * 101;
    this.y = rowSprites[6];
};
Player.prototype.render = function() {
    ctx.strokeStyle = 'blue';
    ctx.lineWidth = 5;
    ctx.strokeRect(this.x + 14, this.y, 73, 101);
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
Player.prototype.handleInput = function(keyPress) {
    var stepSizeVert = 83,
        stepSizeHor = 101;
    switch (keyPress) {
        case 'left':
            if (this.x > 0) this.x = this.x - stepSizeHor;
            break;
        case 'right':
            if (this.x < 404) this.x = this.x + stepSizeHor;
            break;
        case 'up':
            this.y > stepSizeVert ? this.y = this.y - stepSizeVert : this.y = rowSprites[6];
            break;
        case 'down':
            if (this.y < rowSprites[6]) this.y = this.y + stepSizeVert;
            break;
    }

};
//Game state
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
(function () {
    for (var i = 0; i < 4; i++) {
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

var isGameOver;
// The score
var score = 0;
var scoreEl = document.getElementById('score');
//scoreEl.innerHTML = "Score: " + score;

//need to update x and y coordinates upon reset
// reset() also doesn't do anything right now
//setTimeout(init, 5000);