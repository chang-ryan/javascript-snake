var gameBoardSize = 40;
var gamePoints = 0;
var gameSpeed = 100;

$(document).ready(function() {
  console.log("Ready!");
  createBoard();
  gameLoop();
});

var Snake = {
  position: [[20,20],[20,19],[20,18]], // initial snake with 3 pixel body
  size: 3,
  direction: 'r'
}

var Food = {
  position: [],
  present: false
}

function createBoard() {
  $("#game-board").empty();
  var size = gameBoardSize;

  for (i = 0; i < size; i++) {
    $("#game-board").append('<div class="row"></div>');
    for (j = 0; j < size; j++) {
      $(".row:last-child").append('<div class="pixel"></div>')
    }
  }
}

function moveSnake() {
  var head = Snake.position[0].slice();

  switch (Snake.direction) {
    case 'r':
      head[1] += 1;
      break;
    case 'l':
      head[1] -= 1;
      break;
    case 'u':
      head[0] -= 1;
      break;
    case 'd':
      head[0] += 1;
      break;
  }

  // draw head
  $(".row:nth-child(" + head[0] + ") > .pixel:nth-child(" + head[1] + ")").addClass("snake-pixel");

  // draw rest of body loop
  for (var i = 0; i < Snake.size; i++) {
    $(".row:nth-child(" + Snake.position[i][0] + ") > .pixel:nth-child(" + Snake.position[i][1] + ")").addClass("snake-pixel");
  }

  // if head touches food
  if (head.every(function(e,i) {
    return e === Food.position[i];
  })) {
    Snake.size++;
    Food.present = false;
    gamePoints += 8;
    $(".row:nth-child(" + Food.position[0] + ") > .pixel:nth-child(" + Food.position[1] + ")").removeClass("food-pixel");
  } else {
    $(".row:nth-child(" + Snake.position[Snake.size-1][0] + ") > .pixel:nth-child(" + Snake.position[Snake.size-1][1] + ")").removeClass("snake-pixel");
    Snake.position.pop();
  }

  Snake.position.unshift(head);
}

function genFood() {
  if (Food.present === false) {
    Food.position = [Math.floor((Math.random()*40) + 1),Math.floor((Math.random()*40) + 1)]
    Food.present = true;
    console.log("Food at: "+Food.position);
    $(".row:nth-child(" + Food.position[0] + ") > .pixel:nth-child(" + Food.position[1] + ")").addClass("food-pixel");
  }
}

function getKey() {
  $(document).keydown(function(key) {
    switch(key.which) {
      case 37: // left arrow key
        if (Snake.direction != 'r') { Snake.direction = 'l'; }
        break;
      case 38: // up arrow key
        if (Snake.direction != 'd') { Snake.direction = 'u'; }
        break;
      case 39: // right arrow key
        if (Snake.direction != 'l') { Snake.direction = 'r'; }
        break;
      case 40: // down arrow key
        if (Snake.direction != 'u') { Snake.direction = 'd'; }
        break;
    }
  });
}

function gameLoop() {
  setTimeout(function() {
    getKey();
    genFood();
    moveSnake();
    alive() ? gameLoop() : console.log("Game Over!");
  }, gameSpeed);
}

function alive() {
  // wall collision
  if (Snake.position[0][0] < 1 || Snake.position[0][0] > 40 || Snake.position[0][1] < 1 || Snake.position[0][1] > 40) {
    return false;
  }
  // self collision
  for (var i = 1; i < Snake.size; i++) {
    if ((Snake.position[0]).every(function(element,index) {
      return element === Snake.position[i][index];
    })) {
      return false;
    }
  }
  return true;
}

function gameOver() {
  setTimeout(function() {
    $(".row:nth-child(" + Snake.position[0][0] + ") > .pixel:nth-child(" + Snake.position[0][1] + ")").toggleClass("snake-pixel");
  }, 500);
}
