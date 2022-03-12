// Use UP arrow key to move up
// Use DOWN arrow key to move down
// Reach 1500 distance to win a medal!

var path,mainCyclist;
var player1,player2,player3;
var pathImg,mainRacerImg1,mainRacerImg2;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg,cycleBell;

var pinkCG, yellowCG,redCG; 

var WIN = "win";
var END = "end";
var PLAY = "play";
var gameState = PLAY;

var distance=0;
var gameOver, restart;

var music;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadAnimation("mainPlayer1.png","mainPlayer2.png");
  mainRacerImg2= loadAnimation("mainPlayer3.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  cycleBell = loadSound("bell.mp3");
  gameOverImg = loadImage("gameOver.png");

  music = loadSound("TS - Beat Y.mp3");

  finishLineImg = loadImage("FinishLine.png");
}

function setup(){
  
createCanvas(1200,300);
// Moving background
path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;



//creating boy running
mainCyclist  = createSprite(70,150);
mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
mainCyclist.scale=0.07;
  
//set collider for mainCyclist


  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
 
FinishLine = createSprite(1150, 150);
FinishLine.addImage(finishLineImg);
FinishLine.scale = 2;
FinishLine.visible = false;

// mainCyclist.setCollission("rectangle",0,0,40,40);
mainCyclist.setCollider("rectangle",0,0,40,40);
// mainCyclist.setCollission("rectangle",0,0,40,40,50);
// mainCyclist.setCollider("rectangle",0,0,40,40,50);
mainCyclist.depth = 54;

pinkCG = new Group();
yellowCG = new Group();
redCG = new Group();
playMusic();


}


function draw() {
  background(0);

  drawSprites();
  textSize(20);
  fill(255);
  text("Distance: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);

   
   if(distance==1393)
   {
     FinishLine.visible = true;
     mainCyclist.velocityX = 10;
     path.velocityX = 10;
   }
   else
   {
    path.velocityX = -(6 + 2*distance/150);
   }
  
  if(keyDown("Up_ARROW"))
   mainCyclist.y -= 10;
  else if(keyDown("DOWN_ARROW"))
  {
    mainCyclist.y += 10;
  }
  
   edges= createEdgeSprites();
   mainCyclist .collide(edges);
  
  //code to reset the background
  if(path.x < 0 ){
    path.x = width/2;
  }
  
    //code to play cycle bell sound
  if(keyDown("space")) {
    cycleBell.play();
  }
  

  //  if (distance >= 150)
  //  {
  //    path.velocityX = 0;
  //  }
   if (mainCyclist.x == FinishLine.x)
   {
     mainCyclist.velocityX = 0;
     gameState = WIN;
   }

  //creating continous opponent players
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(pinkCG.isTouching(mainCyclist)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(yellowCG.isTouching(mainCyclist)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(redCG.isTouching(mainCyclist)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
    music.stop();
    textSize(20);
    fill(255);
    text("Press Up Arrow to Restart the game!", 500,200);

    path.velocityX = 0;
    mainCyclist.velocityY = 0;
    mainCyclist.addAnimation("SahilRunning",mainRacerImg2);

    mainCyclist.velocityX = 0;

    pinkCG.setVelocityXEach(0);
    pinkCG.setLifetimeEach(-1);
  
    yellowCG.setVelocityXEach(0);
    yellowCG.setLifetimeEach(-1);
  
    redCG.setVelocityXEach(0);
    redCG.setLifetimeEach(-1);
    

    // if(keyDown("UP_ARROW")) {
    //   reset;
    // }

    // if(key("UP_ARROW")) {
    //   reset();
    // }

    // if(keyDown()) {
    //   reset();
    // }

    if(keyDown("UP_ARROW")) {
      reset();
      playMusic();
    }
}
  if (gameState === WIN)
  {
    pinkCG.destroyEach();
    redCG.destroyEach();
    yellowCG.destroyEach();
    mainCyclist.visible = false;
    music.stop();

    textSize(50);
    fill(255, 0, 0)
    text("You Win!", 520, 50);

    createLink();
    noLoop(); 
  }

}



function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        pinkCG.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        yellowCG.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        redCG.add(player3);
}

//function reset{
//  gameState = END;
//  gameOver.visible = false;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroyEach();
//  yellowCG.destroyEach();
//  redCG.destroyEach();
  
//  distance = 0;
// }

//function reset{
//  gameState = PLAY;
//  gameOver.visible = true;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroy();
//  yellowCG.destroy();
//  redCG.destroy();
  
//  distance = 0;
// }

function reset(){
 gameState = PLAY;
 gameOver.visible = false;
 mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
 mainCyclist.velocityX = 0;
 FinishLine.visible = false;
 
 mainCyclist.x = 70;
 mainCyclist.y = 150;

 pinkCG.destroyEach();
 yellowCG.destroyEach();
 redCG.destroyEach();
  
 distance = 0;
}

//function reset(){
//  gameState = END;
//  gameOver.visible = true;
//  mainCyclist.addAnimation("SahilRunning",mainRacerImg1);
  
//  pinkCG.destroyEach();
//  yellowCG.destroyEach();
//  redCG.destroyEach();
  
//  distance = 50;
// }


function playMusic()
{
  music.play()
}

function createLink()
{
  
  var col = color(255, 255, 255);
  var link = createA("medal.html", "Click here to collect your medal", "_blank");

  link.position(550, 70);

  link.style('color', col);
  
}