var gameBoardSize = 40;
var gamePoints = 0;
var gameSpeed = 200;

$(document).ready(function() {
  console.log("Ready!");
  render();
  gameLoop();
});

var Snake = {
  position: [[20,20],[20,19],[20,18]], // initial snake with 3 pixel body
  size: 3,
  direction: 'r'
}

function render() {
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
  var head = $.extend(true, [], Snake.position).shift();

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

  $(".row:nth-child(" + head[0] + ") > .pixel:nth-child(" + head[1] + ")").addClass("snake-pixel");
  for (var i = 1; i < Snake.size; i++) {
    $(".row:nth-child(" + Snake.position[i][0] + ") > .pixel:nth-child(" + Snake.position[i][1] + ")").addClass("snake-pixel");
  }
  //Snake.position.unshift(head);
  //$(".row:nth-child(" + Snake.position[Snake.size-1][0] + ") > .pixel:nth-child(" + Snake.position[Snake.size-1][1] + ")").removeClass("snake-pixel");
  //Snake.position.pop();
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
  getKey();
  setTimeout(function() {
    moveSnake();
    //alive() ? gameLoop() : console.log("Game Over!");
  }, gameSpeed)
}

function alive() {
  if (Snake.position[0][0] < 1 || Snake.position[0][0] > 40 || Snake.position[0][1] < 1 || Snake.position[0][1] > 40) {
    return false;
  }
  return true;
}
