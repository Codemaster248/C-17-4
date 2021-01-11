var path, mainCyclist;
var pathImg, mainRacerImg1, mainRacerImg2, Pink, redImg, yellow;
var Pinkcrash, redcrash, yellowcrash, pinkCG, redCG, yellowCG;
var gameOverImg, restartImg, distance;
var obstacle11, obstacle22, obstacle33;
var END = 0;
var PLAY = 1;
var gameState = PLAY;

var distance = 0;

function preload() {
  pathImg = loadImage("images/Road.png");
  mainRacerImg1 = loadAnimation("images/mainPlayer1.png", "images/mainPlayer2.png");
  mainRacerImg2 = loadAnimation("images/mainPlayer3.png");
  Pink = loadAnimation("images/opponent1.png", "images/opponent2.png");
  Pinkcrash = loadAnimation("images/opponent3.png");

  red1 = loadAnimation("images/opponent4.png", "images/opponent5.png");
  redcrash = loadAnimation("images/opponent6.png");

  yellow = loadAnimation("images/opponent7.png", "images/opponent8.png");
  yellowcrash = loadAnimation("images/opponent9.png");
  bell = loadSound("sound/bell.mp3");
  gameOverImg = loadImage("images/gameOver.png");
  obstacle11 = loadImage("images/obstacle1.png");
  obstacle33 = loadImage("images/obstacle3.png")
  obstacle22 = loadImage("images/obstacle2.png")
}

function setup() {

  createCanvas(500, 300);

  // Moving background
  path = createSprite(100, 150);
  path.addImage(pathImg);
//  path.velocityX = -5;


  gameOver = createSprite(230, 130);
  gameOver.addImage(gameOverImg);
  gameOver.scale = 0.5;



  //creating boy running
  mainCyclist = createSprite(70, 150, 20, 20);
 // mainCyclist.addAnimation("SahilRunning", mainRacerImg1);
 mainCyclist.scale = 0.07;


  redCG = new Group();
  pinkCG = new Group();
  yellowCG = new Group();
  obCG1 = new Group();
  obCG2 = new Group();
  obCG3 = new Group();


}

function draw() {
 background(0);
 drawSprites();
 textSize(20);
 fill(255);
text("Distance: " + distance, 350, 30);
  if (gameState === PLAY) {
   mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
      path.velocityX = -5;

    gameOver.visible = false;
  distance = distance + Math.round(getFrameRate() / 50);

    var select_oppPlayer = Math.round(random(1, 3))

    if (World.frameCount % 150 === 0) {
      if (select_oppPlayer == 1) {
        spawnpinkCyclists();
      } else if (select_oppPlayer == 2) {
        spawnredCyclists();
      } else {
        spawnyellowCyclists();
      }
    }

    //  if (distance === 500) {
    var ob = Math.round(random(1, 3))
    if (World.frameCount % 100 == 0) {
      if (ob == 1) {
        ob1();
      } else if (ob == 2) {
        ob2();
      } else {
        ob3();
      }
    }
    if (keyDown("Space")) {
      bell.play();
    }
    mainCyclist.y = World.mouseY;

    edges = createEdgeSprites();
    mainCyclist.collide(edges);
    //code to reset the background
    if (path.x < 0) {
      path.x = width / 2;
    }
    if (distance === 500) {
      path.velocityX = -(5 + distance / 100)
    }
    if (mainCyclist.isTouching(pinkCG)) {
      gameState = END;
      pinkCG.destroyEach();
      var player1 = createSprite(430, Math.round(random(50, 250), 10, 10));
      player1.addAnimation("opponentPlayer1", Pinkcrash);
      player1.scale = 0.06;
      player1.lifetime = -1;
      pinkCG.add(player1);
   }
    if (mainCyclist.isTouching(redCG)) {
      gameState = END;
      redCG.destroyEach();
      var player2 = createSprite(430, Math.round(random(50, 250), 10, 10));
      player2.addAnimation("opponentPlayer2", redcrash);
      player2.scale = 0.06;
      player2.lifetime = -1;
      redCG.add(player2);
    }
    if (mainCyclist.isTouching(yellowCG)) {
      gameState = END;
      yellowCG.destroyEach();
      var player3 = createSprite(430, Math.round(random(50, 250), 10, 10));
      player3.addAnimation("opponentPlayer3", yellowcrash);
      player3.scale = 0.06;
      player3.lifetime = -1;
      yellowCG.add(player3);


    }
    if (mainCyclist.isTouching(obCG1)) {
      gameState = END;
      obCG1.destroyEach();
    }
    if (mainCyclist.isTouching(obCG3)) {
      gameState = END;
      obCG3.destroyEach();
    }
    if (mainCyclist.isTouching(obCG2)) {
      gameState = END;
      obCG2.destroyEach();
    }
  }
  if (gameState === END) {
    gameOver.visible = true;
    textSize(20);
    fill(255);
    text("Press Up to Restart", 200, 200);

    if (keyDown("up")) {
      reset();
    }
    path.velocityX = 0;
    mainCyclist.velocityX = 0
    mainCyclist.addAnimation("SahilRunning", mainRacerImg2);

    yellowCG.setLifetimeEach(-1);
    yellowCG.setVelocityXEach(0);
    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
    redCG.setLifetimeEach(-1);
    redCG.setVelocityXEach(0);


  }


}

function spawnpinkCyclists() {
  var player1 = createSprite(430, Math.round(random(50, 250), 10, 10));
  player1.addAnimation("opponentPlayer1", Pink);
  player1.scale = 0.06;
  player1.velocityX = -5
  player1.lifetime = 170;
  pinkCG.add(player1);

}

function spawnredCyclists() {
  var player2 = createSprite(430, Math.round(random(50, 250), 10, 10));
  player2.addAnimation("opponentPlayer2", red1);
  player2.scale = 0.06;
  player2.lifetime = 170;
  player2.velocityX = -5
  player2.debug = true;
  redCG.add(player2);
}

function spawnyellowCyclists() {
  var player3 = createSprite(430, Math.round(random(50, 250), 10, 10));
  player3.addAnimation("opponentPlayer2", yellow);
  player3.scale = 0.06;
  player3.velocityX = -5;
  player3.lifetime = 170;
  player3.debug = true;
  yellowCG.add(player3);
}

function reset() {
  gameState = PLAY;
  gameOver.visible = false;
  mainCyclist.addAnimation("SahilRunning", mainRacerImg1);


  pinkCG.destroyEach();
  yellowCG.destroyEach();
  redCG.destroyEach();

  distance = 0;

}

function ob1() {
  var obstacle1 = createSprite(430, Math.round(random(50, 250), 10, 10));
  obstacle1.addAnimation("obstacle1", obstacle11);
  obstacle1.scale = 0.06;
  obstacle1.velocityX = -5;
  obstacle1.lifetime = 170;
  obCG1.add(obstacle1);
}

function ob2() {
  var obstacle2 = createSprite(430, Math.round(random(50, 250), 10, 10));
  obstacle2.addAnimation("obstacle2", obstacle22);
  obstacle2.scale = 0.06;
  obstacle2.velocityX = -5;
  obstacle2.lifetime = 170;
  obCG2.add(obstacle2);
}

function ob3() {
  var obstacle3 = createSprite(430, Math.round(random(50, 250), 10, 10));
  obstacle3.addAnimation("obstacle3", obstacle33);
  obstacle3.scale = 0.06;
  obstacle3.velocityX = -5;
  obstacle3.lifetime = 170;
  obCG3.add(obstacle3);
}