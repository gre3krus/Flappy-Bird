window.onload = init;
var backgroundcanvas = document.getElementById("background");
var gamecanvas = document.getElementById("game");
var columnTopcanvas = document.getElementById("columnTop");
var columnBottoncanvas = document.getElementById("columnBottom");
var titlecanvas = document.getElementById("title");
var recordcanvas = document.getElementById("record")
var infotitlecanvas = document.getElementById("infotitle");
var polosacanvas = document.getElementById("polosa")
var overcanvas = document.getElementById("gameover")


var ctxbackground = backgroundcanvas.getContext("2d");
var ctxgame = gamecanvas.getContext("2d");
var ctxcolumnTop = columnTopcanvas.getContext("2d");
var ctxcolumnBotton = columnBottoncanvas.getContext("2d");
var ctxtitle = titlecanvas.getContext("2d");
var ctxrecord = recordcanvas.getContext("2d");
var ctxinfotitle = infotitlecanvas.getContext("2d");
var ctxpolosa = polosacanvas.getContext("2d");
var ctxover = overcanvas.getContext("2d")


// game over

var gameover = new Image()
gameover.src = "img/Over.png"

// audio
let fly = new Audio()
fly.src = "audio/bad_pig.mp3"
fly.volume = 0.1

let coin = new Audio()
coin.src = "audio/coin.mp3"
coin.volume = 0.1

function jumpb() {
let jump = new Audio()
jump.src = "audio/jump.mp3"
jump.volume = 0.1
jump.play()
}

let over = new Audio()
over.src = "audio/mario-smert.mp3"
over.volume = 0.2
// =======

var gameWidth = 550;
var gameHeight = 650;
var imgBackground = new Image();
imgBackground.src = "img/fon.jpg";

var imgBird = new Image();
imgBird.src = "img/Flappy_Bird.png";

var imgBirdT = new Image();
imgBirdT.src = "img/Flappy_Bird_Top.png";

var imgBirdB = new Image();
imgBirdB.src = "img/Flappy_Bird_Button.png";

var maxJump = -1.5;
var grav = 0.5;
var beginspeed = 0;

var playerobj = {}
playerobj.drawY = 50;
playerobj.isUp = false;
playerobj.drawX = 30;
playerobj.width = 45;
playerobj.height = 32;

var imgPolosa = new Image();
imgPolosa.src = "img/ProgressBar.png";
var poloska = {};
poloska.drawX = 400;
poloska.drawY = 20;
poloska.height = 4;
poloska.width = 370;

var imgColumnButton = new Image();
imgColumnButton.src = "img/Pl_Down.png";

var imgColumnTop = new Image();
imgColumnTop.src = "img/Pl_Up.png";
var kolonnobj = {};
var rast = 45;
var max = 500;
var min = 250;
var speedColumn = 1.2;

var gameoverobj = {}

gameoverobj.drawX = 400
gameoverobj.drawY = 100
gameoverobj.width = 400
gameoverobj.height = 200

kolonnobj.drawX = 400;
kolonnobj.drawY = (max - min) * Math.random() + min;
kolonnobj.height = 598;
kolonnobj.width = 92;

//score and record
var CountOt = 0
var RecordOt
localStorage.getItem('record') > 0 ? RecordOt = localStorage.getItem('record') : RecordOt = 0



var isPlayIng = boolean;

function drawBackGround() {
  ctxbackground.drawImage(imgBackground, 0, 0, 600, 723,
    0, 0, gameWidth, gameHeight);
};

function gameOv() {
  ctxover.drawImage(gameover, 0, 0, 300, 150)
  document.querySelector("#restart").style.display = "block"
  document.querySelector("#restart").onclick = function(){
    location.reload()
  }

}

setInterval(restart, 1);
    function restart(){
      if (isPlayIng){
      location.reload()
    }
  }

// function gameOv() {
//   ctxover.drawImage(gameover, 0, 0, 300, 150)
//   document.getElementById("restart").style.display = "none"
//   if() {
//     location.reload()
//   }
// }

function drawBird(){
  ctxgame.clearRect(0, 0, gameWidth, gameHeight);
  ctxgame.drawImage(imgBird, 0, 0, playerobj.width, playerobj.height,
    playerobj.drawX, playerobj.drawY, 56, 40);

  if(beginspeed < 0)
  {ctxgame.clearRect(0, 0, gameWidth, gameHeight);
    ctxgame.drawImage(imgBirdT, 0, 0, playerobj.width, playerobj.height,
        playerobj.drawX, playerobj.drawY, 56, 40); } else 
        if(beginspeed >= 1.5){
    ctxgame.clearRect(0, 0, gameWidth, gameHeight);
    ctxgame.drawImage(imgBirdB, 0, 0, playerobj.width, playerobj.height,
        playerobj.drawX, playerobj.drawY, 56, 40);} else {
    ctxgame.clearRect(0, 0, gameWidth, gameHeight);
    ctxgame.drawImage(imgBird, 0, 0, playerobj.width, playerobj.height,
        playerobj.drawX, playerobj.drawY, 56, 40);
    if(playerobj.drawY >= gameHeight){
      location.reload();}}

    beginspeed += grav * 0.1;
    playerobj.drawY += beginspeed;

    if (playerobj.isUp){
      beginspeed = maxJump;
    }
    if (playerobj.drawY <= 0) { 
      beginspeed = 0;
      playerobj.drawY = 0; }
    };

function init() {
  backgroundcanvas.width = gameWidth;
  backgroundcanvas.height = gameHeight;
  gamecanvas.width = gameWidth;
  gamecanvas.height = gameHeight;
  columnTopcanvas.width = gameWidth;
  columnTopcanvas.height = gameHeight;
  columnBottoncanvas.width = gameWidth;
  columnBottoncanvas.height = gameHeight;
  titlecanvas.width = gameWidth;
  titlecanvas.height = gameHeight;
  recordcanvas.width = gameWidth;
  recordcanvas.height = gameHeight;
  polosacanvas.width = gameWidth;
  polosacanvas.height = gameHeight;

  drawBackGround()
  drawBird();

  document.addEventListener("keydown", checkKeyDown, false)
  document.addEventListener("keyup", checkKeyUp, false)
  ctxtitle.fillStyle = "#FFF";
  ctxtitle.font = "bold 30px Arial";
  ctxrecord.fillStyle = "gray"
  ctxrecord.font = "bold 30px Arial"
  ctxinfotitle.fillStyle = "lightgray";
  ctxinfotitle.font = "20px Arial";
};

function START() {
  isPlayIng=true;
    document.getElementById("start").style.display = "none";
    // fly.play()

    setInterval(logic, 1);
    function logic(){
      if (isPlayIng){
      drawBird();
      drawColumn();
    }
  }
}

setInterval(logic, 1);
function logic(){
  drawBird();
};

function checkKeyDown(e){
    let keyId = e.keyCode;
  if (keyId == "32"){
      playerobj.isUp = true;
      jumpb()
    }
};
function checkKeyUp(e){
let keyId = e.keyCode;
  if (keyId == "32"){
      playerobj.isUp = false;  
    }
};

function drawColumn(){
  var randomcolumn = (max - min) * Math.random() + min;

  ctxcolumnBotton.clearRect(0, 0, gameWidth, gameHeight);
  ctxcolumnBotton.drawImage(imgColumnButton, 0, 0, 92, 598,
    kolonnobj.drawX, kolonnobj.drawY, 70, 400);

  ctxcolumnTop.clearRect(0, 0, gameWidth, gameHeight);
  ctxcolumnTop.drawImage(imgColumnTop, 0, 0, 92, 589,
    kolonnobj.drawX, (kolonnobj.drawY - rast) - 500, 70, 400);

  kolonnobj.drawX = kolonnobj.drawX - speedColumn;

  if (kolonnobj.drawX <= 0 - kolonnobj.width){
    kolonnobj.drawX = 530;
    kolonnobj.drawY = randomcolumn;
    speedColumn +=0.03;
    CountOt++
    localStorage.setItem('record', CountOt)
    coin.play()
};

if((kolonnobj.drawX < playerobj.drawX + playerobj.width) &&
    (kolonnobj.drawX + kolonnobj.width >= playerobj.drawX) &&
    ((kolonnobj.drawY - 30) <= playerobj.drawY) &&
    (kolonnobj.drawY + kolonnobj.height >= playerobj.drawY + playerobj.height))
    { 
      isPlayIng = false;
      over.play()
      gameOv()
      
    };
if((kolonnobj.drawX < playerobj.drawX + playerobj.width) &&
    (kolonnobj.drawX + kolonnobj.width >= playerobj.drawX) &&
    ((kolonnobj.drawY - rast) - 100 > playerobj.drawY) &&
    ((kolonnobj.drawY - rast) + kolonnobj.height >= playerobj.drawY + playerobj.height))
    { 
      isPlayIng = false;
      over.play()
      gameOv()
      
    };

  ctxtitle.clearRect (0, 0, gameWidth, gameHeight);
  ctxtitle.fillText("Score: " + CountOt, 20, 30);
  ctxrecord.clearRect (0, 0, gameWidth, gameHeight)
  ctxrecord.fillText("Record: " + RecordOt, 20, 85);
  ctxinfotitle.clearRect(0, 0, gameWidth, gameHeight);
  ctxinfotitle.fillText("Speed column: " + Math.round(speedColumn * 10)  /10 + "km/h", 20, 50);
}

function poloska() {
  ctxgame.drawImage(imgPolosa, 0, 0, poloska.width, poloska.height,
    poloska.drawX, poloska.drawY, 400, 4);
}

