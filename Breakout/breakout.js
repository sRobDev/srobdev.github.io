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
var brickColor = '#0095DD'
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
    bricks[c][r] = {x: 0, y: 0, status: 1};
  }
}

var score = 0;
var lives = 3;

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
      if(bricks[c][r].status == 1){
        var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
        var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = brickColor;
        ctx.fill();
        ctx.closePath();
      }
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
  } else if(y + paddleHeight > canvas.height - ballRadius){
    if(x > paddleX && x < paddleX + paddleWidth){
      dy = -dy;
    } else if(y > canvas.height - ballRadius){
      checkLives();
    }
  }

  if(x + dx > canvas.width - ballRadius || x + dx < ballRadius){
    changeBallColor();
    dx = -dx;
  }
}

function checkLives(){
  lives--;
  if(!lives){
    //alert('GAME OVER');
    document.location.reload();
  } else {
    x = canvas.width / 2;
    y = canvas.height - 30;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
  }
}
function checkBallImpact(){
  for(c = 0; c < brickColumnCount; c++){
    for(r = 0; r < brickRowCount; r++){
      var brick = bricks[c][r];

      //detect top hit
      //if y >
      if(detectTopCollision(brick)){
        // alert('ghetto pause')
        dy = -dy;
        brick.status = 0;
        score++;
        checkGameOver();
      }
    }
  }
}

function detectTopCollision(brick){
  if(x > brick.x &&
    x < brick.x + brickWidth &&
    y > brick.y &&
    y < brick.y + brickHeight + ballRadius &&
    brick.status == 1) return true;
}
function checkGameOver(){
  if(score == brickRowCount * brickColumnCount){
    //alert('You win!\n' + 'Score: ' + score);
    document.location.reload();
  }
}

function drawScore(){
  ctx.font = '16px Arial';
  ctx.fillStyle = brickColor;
  ctx.fillText('Score: ' + score, 8, 20);
}

function drawLives(){
  ctx.font = '16px Arial';
  ctx.fillStyle = brickColor;
  ctx.fillText('Lives: ' + lives, canvas.width - 65, 20);
}

function mouseMoveHandler(e){
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 + (paddleWidth / 2) && relativeX < canvas.width - (paddleWidth / 2)){
    paddleX = relativeX - paddleWidth / 2;
  }
}

function draw(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  checkBallImpact();

  checkPaddleCollision();
  checkBallCollision();

  x += dx;
  y += dy;
}

document.addEventListener('keydown', keyDownHandler, false);
document.addEventListener('keyup', keyUpHandler, false);
document.addEventListener('mousemove', mouseMoveHandler, false);

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
