// Create Enemy object
var Enemy = function(x,y,speed) {
  this.x = x;
  this.y = y;
  this.speed = Math.floor(Math.random() * (100 - 10)) + 10;
  this.height = 65;
  this.width = 80;
  this.sprite = 'images/enemy-bug.png';
};

// Update Enemy object position when rightmost boundary of board is reached
Enemy.prototype.update = function(dt) {
  this.x += this.speed * dt;
    if (this.x > 505) {
        this.x = 0;
      }
};

// Render/draw Enemy sprite on screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Create Player object
var Player = function(x,y) {
  this.x = x;
  this.y = y;
  this.height = 80;
  this.width = 70;
  this.sprite = 'images/char-boy.png';
};

// Resets player position back to starting position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
};

// Moves player around game area, calls game_win function if water is reached
Player.prototype.update = function(dt) {
  if (this.x < 0 || this.x > 400) {
    if (this.x < 0) {
        this.x = 0;
    }
    else {
      this.x = 400;
    }
  }
  if (this.y < 0 || this.y > 400) {
    if (this.y < 0) {
        player.game_win();
        }
        else {
          this.y = 400;
        }
    }
  player.checkCollisions();
};

// Display game win message and reset
Player.prototype.game_win = function() {
  setTimeout (function() {
    alert('You won! Yay! The game will now be reset.');
    player.reset();
    },0);
};

// Render/draw Player sprite on screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Detect player-enemy collisions
Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    if ((this.x < allEnemies[i].x + allEnemies[i].width) &&
        (this.x + this.width > allEnemies[i].x) &&
        (this.y < allEnemies[i].y + allEnemies[i].height) &&
        (this.height + this.y > allEnemies[i].y)) {
          setTimeout (function() {
            alert('Oh no! Collision! The game will be reset.');
            player.reset();
          },0);
    }
  }
};

// Translate keystroke input from EventListener into Player sprite position
Player.prototype.handleInput = function(key) {
  if (key === 'left') {
    this.x -= 101;
  }
  if (key === 'up') {
    this.y -= 82.5;
  }
  if (key === 'right') {
    this.x += 101;
  }
  if (key === 'down') {
    this.y += 82.5;
  }
};

// Instantiate Player object
var player = new Player(100,400);

// Instantiate Enemy objects
var enemy1 = new Enemy(175,55,100);
var enemy2 = new Enemy(175,140,100);
var enemy3 = new Enemy(175,225,100);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enemy1,enemy2,enemy3];

// Listen for key presses and send keys to Player.handleInput() method
document.addEventListener('keyup', function(e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
