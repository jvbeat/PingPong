//ball variables
let xBall = 300;
let yBall = 200;
let diameter = 15;
let radius = diameter / 2;

//ball speed
let speedXBall = 6;
let speedYBall = 6;
let racketLength = 10;
let racketHeight = 90;
let racketBorder = 8;

//racket variables
let xRacket = 5;
let yRacket = 150;

//opponent variables
let xRacketOpponent = 585;
let yRacketOpponent = 150;
let speedYOpponent;
let missChance = 0;

let hit = false;

//score
let myScore = 0;
let opponentScore = 0;

//sounds
let racketHit;
let score;
let soundtrack;

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(0);
  showBall();
  moveBall();
  checkHitBorder();
  showRacket(xRacket, yRacket);
  moveMyRacket();
  checkHitRacket(xRacket, yRacket);
  showRacket(xRacketOpponent, yRacketOpponent);
  moveRacketOpponent();
  checkHitRacket(xRacketOpponent, yRacketOpponent);
  showScoreboard();
  scored();
}

function showBall() {
  circle(xBall, yBall, diameter);
}

function moveBall() {
  xBall += speedXBall;
  yBall += speedYBall;
}

function checkHitBorder() {
  if (xBall + radius > width || xBall - radius < 0) {
    speedXBall *= -1;
  }
  if (yBall + radius > height || yBall - radius < 0) {
    speedYBall *= -1;
  }
}

function showRacket(x, y) {
  rect(x, y, racketLength, racketHeight, racketBorder);
}

function moveMyRacket() {
  if (keyIsDown(UP_ARROW)) {
    yRacket -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRacket += 10;
  }
}

function checkHitRacket() {
  if (
    xBall - radius < xRacket + racketLength &&
    yBall - radius < yRacket + racketHeight &&
    yBall + radius > yRacket
  ) {
    speedXBall *= -1;
  }
}

function checkHitRacket(x, y) {
  hit = collideRectCircle(
    x,
    y,
    racketLength,
    racketHeight,
    xBall,
    yBall,
    radius
  );
  if (hit) {
    speedXBall *= -1;
    rackethit.play();
  }
}

function moveRacketOpponent(){
  speedYOpponent = yBall -yRacketOpponent - racketLength / 2 - 30;
  yRacketOpponent += speedYOpponent + missChance
  missChanceCalc()
}

function showScoreboard() {
  textSize(16);
  textAlign(CENTER);
  stroke(255);
  fill(0,255,0);
  rect(150, 10, 40, 20);
  fill(255);
  text(myScore, 170, 26);
  fill(255,0,0);
  rect(450, 10, 40, 20);
  fill(255);
  text(opponentScore, 470, 26);
}

function scored() {
  if (xBall > 590) {
    myScore += 1;
  }
  if (xBall < 10) {
    opponentScore += 1;
    score.play();
  }
}

function preload(){
  score = loadSound("sounds/score.mp3");
  rackethit = loadSound("sounds/rackethit.mp3");
  soundtrack = loadSound("sounds/soundtrack.mp3");
}

function missChanceCalc() {
  if (opponentScore >= myScore) {
    missChance += 1
    if (missChance >= 39){
    missChance = 40
    }
  } else {
    missChance -= 1
    if (missChance <= 35){
    missChance = 35
    }
  }
}