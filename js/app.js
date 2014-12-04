//TODO add gems to the game
//have player hold gems and bring them to the water to score points
//if they get hit they loses their gems
//Constants
var ROW_HEIGHT = 83,
    COL_WIDTH = 101,
    NUM_COL = 5,
    NUM_ENEMIES = 4,
    VERTICAL_OFFSET = 20,
    PLAYER_HOR_OFFSET = 14,
    ENEMY_SIZE = [101, 171],
    PLAYER_SIZE = [73, 171],
    GEM_SIZE = [101, 171];

//Super class for all entities
var Entity = function(col, row, sprite, size) {
    this.x = col * COL_WIDTH;
    this.y = row * ROW_HEIGHT - VERTICAL_OFFSET;
    //pos is for rectangular collision detection
    // implement specific offsets as needed in subclasses
    this.pos = [this.x, this.y];
    this.size = size;
    this.sprite = sprite;
};
//draw entity on screen
Entity.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
//pseudo classical inheritance
//subClass will inherit from SuperClass
var inherit = function(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
};

// Enemies our player must avoid
var Enemy = function(col, row) {
    this.speed = randomSpeed();
    Entity.call(this, col, row, 'images/enemy-bug.png', ENEMY_SIZE);
};
inherit(Enemy, Entity);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    //once Enemy moves off screen to the right reset position
    // set starting x position off screen to neg enemy width for smoother animation
    if (this.x > NUM_COL * COL_WIDTH) {
        this.x = -ENEMY_SIZE[0];
        this.y = getRandomInt(2, 4) * ROW_HEIGHT - VERTICAL_OFFSET;
    }
    this.pos = [this.x, this.y];
};

//Player class
var Player = function(col, row) {
    Entity.call(this, col, row, 'images/char-boy.png', PLAYER_SIZE);
    this.pos[0] += PLAYER_HOR_OFFSET;
    this.numGems = 0;
};
inherit(Player, Entity);
Player.prototype.update = function() {
    this.pos = [this.x + PLAYER_HOR_OFFSET, this.y];
};
//if player reaches river of collides with enemy then reset starting position
//and clear gem possession
Player.prototype.reset = function() {
    this.x = 2 * COL_WIDTH;
    this.y = 5 * ROW_HEIGHT - VERTICAL_OFFSET;
    this.numGems = 0;
    smallGems = [];
};
//handle adding to score inside handleInput when player brings gems to river
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            if (this.x > 0) this.x = this.x - COL_WIDTH;
            break;
        case 'right':
            if (this.x < 404) this.x = this.x + COL_WIDTH;
            break;
        case 'up':
            if (this.y > ROW_HEIGHT) {
                this.y = this.y - ROW_HEIGHT
            } else {
                score += this.numGems;
                updateHighestNumGems();
                this.reset();
            }
            break;
        case 'down':
            if (this.y < 5 * ROW_HEIGHT - VERTICAL_OFFSET)
                this.y = this.y + ROW_HEIGHT;
            break;
    }

};

//gems that the player can collect for points
var Gem = function(col, row) {
    Entity.call(this, col, row, 'images/Gem Orange.png', GEM_SIZE);
};
inherit(Gem, Entity);
Gem.prototype.update = function() {
    this.pos = [this.x, this.y];
};
//spawn gem in random square after player collides with it
Gem.prototype.reset = function() {
    this.x = getRandomInt(0, 5) * COL_WIDTH;
    this.y = getRandomInt(2, 4) * ROW_HEIGHT - VERTICAL_OFFSET;
};

//hearts drawn on the water to represent number of lives left
var Heart = function(col) {
    this.x = col * 24 + 5;
    this.y = 55;
    this.sprite = 'images/heart_small.png';
};
inherit(Heart, Entity);

//small gem icons drawn on water to represent number of gems player is holding
var SmallGem = function(col) {
    this.x = 505 - col *24 -5;
    this.y = 55;
    this.sprite = 'images/Gem Orange Small.ico';
};
inherit(SmallGem, Entity);

//Game state
var allEnemies = [],
    hearts = [],
    lives = 4,
    gem = new Gem(getRandomInt(0, 5), getRandomInt(2, 4)),
    player = new Player(2, 5),
    smallGems = [],
    isGameOver,
    score = 0,
    scoreEl = document.getElementById('score');

initHearts();
initEnemies();

function initHearts() {
    for (var i = 0; i < lives; i++) {
        hearts[i] = new Heart(i);
    }
}

function initEnemies() {
    for (var i = 0; i < NUM_ENEMIES; i++) {
        //columns 1 to 5
        var col = getRandomInt(0, 5);
        //rows 2 to 4
        var row = getRandomInt(1, 4);
        allEnemies[i] = new Enemy(col, row);
    }
}

//Keep track of high score
if (!(document.getElementById('high-score'))) {
    localStorage.setItem("high score", 0);
}
var highScore = localStorage.getItem("high score"),
    highScoreEl = document.getElementById('high-score');
highScoreEl.innerHTML = 'High Score: ' + highScore;

function updateHighScore() {
    if (score > localStorage.getItem("high score")) {
        localStorage.setItem("high score", score);
        highScore = localStorage.getItem("high score");
        highScoreEl.innerHTML = 'High Score: ' + highScore;

    }
}

//Keep track of highest number of gems held
if (!(localStorage.getItem("high gem"))) {
    localStorage.setItem("high gem", 0);
}
var highestNumGems = localStorage.getItem("high gem"),
    highestNumGemsEl = document.getElementById('high-gems');
highestNumGemsEl.innerHTML = 'Highest number of gems held: ' + highestNumGems;

function updateHighestNumGems() {
    if (player.numGems > localStorage.getItem("high gem")) {
        localStorage.setItem("high gem", player.numGems);
        highestNumGems = localStorage.getItem("high gem")
        highestNumGemsEl.innerHTML = 'Highest number of gems held: ' + highestNumGems;
    }
}

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