const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;
const canvasSize = 400;

let snake = [{ x: 160, y: 160 }];
let snakeDirection = { x: gridSize, y: 0 };
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;
let gamePaused = false;
let gameSpeed = 350;

const modal = document.getElementById("gameOverModal");
const finalScoreText = document.getElementById("finalScore");
const playAgainButton = document.getElementById("playAgain");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const resumeBtn = document.getElementById("resumeBtn");

const levelSlider = document.getElementById("levelSlider");
const levelValue = document.getElementById("levelValue");

levelSlider.addEventListener("input", function () {
  levelValue.innerText = levelSlider.value;
  gameSpeed = 350 - levelSlider.value * 30;
  if (gameInterval) {
    clearInterval(gameInterval);
    gameInterval = setInterval(updateGame, gameSpeed);
  }
});

function startGame() {
  score = 0;
  snake = [{ x: 160, y: 160 }];
  snakeDirection = { x: gridSize, y: 0 };
  placeFood();
  modal.style.display = "none";
  if (gameInterval) clearInterval(gameInterval);
  gameInterval = setInterval(updateGame, 350);
  gamePaused = false;
  pauseBtn.style.display = "inline-block";
  resumeBtn.style.display = "none";
  startBtn.style.display = "none";
}

function updateGame() {
  if (gamePaused) return;

  moveSnake();
  if (checkCollisions()) {
    playGameOverSound();
    clearInterval(gameInterval);
    showGameOver();
  }
  if (eatFood()) {
    playEatSound();
    score += 10;
    placeFood();
  } else {
    snake.pop();
  }
  drawGame();
}

function drawGame() {
  ctx.clearRect(0, 0, canvasSize, canvasSize);

  snake.forEach((segment) => {
    ctx.fillStyle = "#019494";
    ctx.fillRect(segment.x, segment.y, gridSize - 2, gridSize - 2);
  });

  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("🍎", food.x + gridSize / 2, food.y + gridSize / 2);

  document.getElementById("score").innerText = "Score: " + score;
}

function moveSnake() {
  const head = {
    x: snake[0].x + snakeDirection.x,
    y: snake[0].y + snakeDirection.y,
  };
  snake.unshift(head);
}

function eatFood() {
  const head = snake[0];

  return head.x === food.x && head.y === food.y;
}

function placeFood() {
  const x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  const y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
  food = { x, y };
}

function checkCollisions() {
  const head = snake[0];

  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize
  ) {
    return true;
  }

  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }

  return false;
}

function playEatSound() {
  const eatSound = document.getElementById("eatSound");
  eatSound.play();
}

function playGameOverSound() {
  const gameOverSound = document.getElementById("gameOverSound");
  gameOverSound.play();
}

function showGameOver() {
  finalScoreText.innerText = "Final Score: " + score;
  modal.style.display = "flex";
}

function pauseGame() {
  gamePaused = true;
  pauseBtn.style.display = "none"; // Hide Pause button
  resumeBtn.style.display = "inline-block"; // Show Resume button
}

function resumeGame() {
  gamePaused = false;
  resumeBtn.style.display = "none"; // Hide Resume button
  pauseBtn.style.display = "inline-block"; // Show Pause button
}

playAgainButton.addEventListener("click", startGame);

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
resumeBtn.addEventListener("click", resumeGame);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" && snakeDirection.y === 0) {
    snakeDirection = { x: 0, y: -gridSize };
  } else if (event.key === "ArrowDown" && snakeDirection.y === 0) {
    snakeDirection = { x: 0, y: gridSize };
  } else if (event.key === "ArrowLeft" && snakeDirection.x === 0) {
    snakeDirection = { x: -gridSize, y: 0 };
  } else if (event.key === "ArrowRight" && snakeDirection.x === 0) {
    snakeDirection = { x: gridSize, y: 0 };
  }
});
