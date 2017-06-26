var ballColor = '#0095DD';

var ballColors = [
  'red', 'blue', 'yellow', 'orange', 'pink', 'brown', 'green', 'cyan', 'crimson',
  'chocolate', 'darkgreen', 'darksalmon', 'dodgerblue', 'fuchsia'
];
var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

//ball initial x and y coordinates
var x = canvas.width / 2;
var y = canvas.height - 30;

//delta applied to the ball
var dx = 2;
var dy = -2;

var ballRadius = 10;

//paddle properties
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width - paddleWidth) / 2;
var paddleColor = "#0095DD";

//control vars
var rightPressed = false;
var leftPressed = false;

//Brick vars
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;
var bricks = [];
for(c = 0; c < brickColumnCount; c++){
  bricks[c] = [];
  for(r = 0; r < brickRowCount; r++){
    bricks[c][r] = {x: 0, y: 0};
  }
}

function changeBallColor(){
  ballColor = ballColors[Math.floor((Math.random() * 14) + 1)];
}

function drawBall(){
  ctx.beginPath();
  ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.closePath();
}

function drawPaddle(){
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
  ctx.fillStyle = paddleColor;
  ctx.fill();
  ctx.closePath();
}

function drawBricks(){
  for(c = 0; c < brickColumnCount; c++){
    for(r = 0; r < brickRowCount; r++){
      
    }
  }
}

function checkPaddleCollision(){
  if(rightPressed && paddleX < canvas.width - paddleWidth){
    paddleX += 7;
  } else if(leftPressed && paddleX > 0){
    paddleX -= 7;
  }
}

function checkBallCollision(){
  if(y + dy < ballRadius){
    changeBallColor();
    dy = -dy;
  } else if(y + dy > canvas.height - ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy * 1.2;
    } else {
      alert("GAME OVER");
      document.location.reload();
    }
  }

  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
    changeBallColor();
    dx = -dx;
  }
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBall();
  drawPaddle();
  
  checkPaddleCollision();
  checkBallCollision();

  x += dx;
  y += dy;
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);

function keyDownHandler(e){
  if(e.keyCode == 39){
    rightPressed = true;
  } else if(e.keyCode == 37){
    leftPressed = true;
  }
}

function keyUpHandler(e){
  if(e.keyCode == 39){
    rightPressed = false;
  } else if(e.keyCode == 37){
    leftPressed = false;
  }
}

setInterval(draw, 10);