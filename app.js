// ------> Initialization <----------

let score = 0;
const brickRows = 5;
const brickCols = 9;

//--------> Buttons DOM <---------

const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const playBtn = document.getElementById("play-btn");

// --------> DOM <----------

const rulesContainer = document.getElementById("rules-container");
const game = document.getElementById("game");
const canvasContainer = document.getElementById("canvas-container");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

// ----------> Event Listeners <----------

rulesBtn.addEventListener("click", () => {
  rulesContainer.classList.add("show");
});
closeBtn.addEventListener("click", () => {
  rulesContainer.classList.remove("show");
});
window.addEventListener("click", (e) => {
  if (e.target === rulesContainer) {
    rulesContainer.classList.remove("show");
  }
});
playBtn.addEventListener("click", () => {
  game.classList.add("hide");
  canvasContainer.classList.add("show");
  breakOutGame();
  // setTimeout(breakOutGame, 1000);
});

//-------- THE GAME FUCNTION -----------

function breakOutGame() {
  window.addEventListener("keydown", keyDown);
  window.addEventListener("keyup", keyUp);
  // --------> Ball prop <---------
  const ball = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    size: 10,
    dx: 4,
    dy: 4,
    speed: 10,
  };
  // -------> Paddle prop <--------
  const paddle = {
    x: canvas.width / 2 - 50,
    y: canvas.height - 30,
    w: 100,
    h: 10,
    dx: 0,
    speed: 8,
  };
  // -------> Brick prop <--------
  const brick = {
    w: 70,
    h: 20,
    margin: 10,
    xOffset: 45,
    yOffset: 60,
    visible: true,
  };

  const bricks = [];
  for (let i = 0; i < brickRows; i++) {
    bricks[i] = [];
    for (let j = 0; j < brickCols; j++) {
      const x = brick.xOffset + (brick.w + brick.margin) * j;
      const y = brick.yOffset + (brick.h + brick.margin) * i;

      bricks[i][j] = {x, y, ...brick};
    }
  }

  // -------> Draw Ball <---------
  function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
    ctx.fillStyle = "#2f3061";
    ctx.fill();
    ctx.closePath();
  }
  // --------> Draw Paddle <-------
  function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
    ctx.fillStyle = "#2f3061";
    ctx.fill();
    ctx.closePath();
  }
  // --------> Draw Score <--------
  function drawScore() {
    ctx.beginPath();
    ctx.font = "20px Product Sans";
    ctx.fillText(`Score: ${score}`, canvas.width - 100, 40);
    ctx.closePath();
  }
  // --------> Draw Bricks <-------
  function drawBricks() {
    bricks.forEach((rows) => {
      rows.forEach((brick) => {
        ctx.beginPath();
        ctx.rect(brick.x, brick.y, brick.w, brick.h);
        ctx.fillStyle = brick.visible ? "#2f3061" : "transparent";
        ctx.fill();
        ctx.closePath();
      });
    });
  }

  // ------> Move Paddle <--------
  function keyDown(e) {
    if (e.key === "ArrowLeft") {
      paddle.dx = -paddle.speed;
    } else if (e.key === "ArrowRight") {
      paddle.dx = paddle.speed;
    }
  }
  function keyUp(e) {
    if (e.key === "ArrowRight" || e.key === "ArrowLeft") paddle.dx = 0;
  }
  function movePaddle(e) {
    paddle.x += paddle.dx;

    if (paddle.x < 0) {
      paddle.x = 0;
    }
    if (paddle.x + paddle.w > canvas.width) {
      paddle.x = canvas.width - paddle.w;
    }
  }

  // ------> Move Ball <--------
  function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
    //Check Wall collision
    if (ball.x - ball.size < 0 || ball.x + ball.size > canvas.width) {
      ball.dx *= -1;
    }
    if (ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
      ball.dy *= -1;
    }
    //Check Paddle collision
    if (
      ball.x - ball.size > paddle.x &&
      ball.x + ball.size < paddle.x + paddle.w &&
      ball.y + ball.size > paddle.y
    ) {
      ball.dy = -ball.speed;
    }

    //Check brick collision
    bricks.forEach((row) => {
      row.forEach((brick) => {
        if (brick.visible) {
          if (
            ball.x - ball.size > brick.x &&
            ball.x + ball.size < brick.x + brick.w &&
            ball.y + ball.size > brick.y &&
            ball.y - ball.size < brick.y + brick.h
          ) {
            ball.dy *= -1;
            brick.visible = false;
            updateScore();
          }
        }
      });
    });
    if (ball.y + ball.size > canvas.height) {
      score = 0;
      showAllBricks();
    }

    function updateScore() {
      score++;
      if (score % (brickRows * brickCols) == 0) {
        showAllBricks();
      }
    }
  }
  function showAllBricks() {
    bricks.forEach((row) => {
      row.forEach((brick) => {
        brick.visible = true;
      });
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle();
    drawScore();
    drawBricks();
  }

  function updateCanvas() {
    movePaddle();
    moveBall();
    draw();

    requestAnimationFrame(updateCanvas);
  }

  updateCanvas();
}
