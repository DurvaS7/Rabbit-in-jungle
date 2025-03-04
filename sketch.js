// variable all the objects
var garden,rabbit,apple,redl,reset,carrot,startButton;
//variable img of all object
var gardenImg,rabbitImg,appleImg,redlImg,resetImg,carrotImg,introImg,startButtonImg;
//define game state using variable 
var score = 0;
var INTRO=2
var PLAY=1;
var END=0;
var gameState=INTRO;
//load all img 
function preload(){
  gardenImg = loadImage("garden.jpg");
  rabbitImg = loadImage("rabbit.png");
  appleImg = loadImage("apple.png");
  redlImag = loadImage("redl.png");
  resetImg = loadImage("reset.png");
  carrotImg = loadImage("carrot.png");
  startButtonImg= loadImage("start.png");
  introImg = loadImage("intro.jpg");
} 
//create object
function setup(){
//size of the canvas
createCanvas(windowWidth,windowHeight);
//raabit for the game
rabbit = createSprite(width/2,height-100,50,50);
rabbit.scale =0.15;
rabbit.addImage(rabbitImg);
rabbit.setCollider("rectangle",100,100,rabbit.width,rabbit.height);
rabbit.visible=false;
//reset button to restart the game
reset = createSprite(width/2,height/2);
reset.addImage("reset.png",resetImg);
reset.visible= false;
reset.scale=0.1;
//start button to start the game
startButton= createSprite(width/2,height/2 + 100);
startButton.addImage(startButtonImg);
startButton.scale=0.2;
//grouping the elements of the game 
appleG=new Group();
redlG=new Group();  
carrotG=new Group();
}
//desing of the game
function draw() {
  // intro page of the game
  if (gameState === INTRO){
    background(introImg);
    textSize(40);
    fill("blue");
    textAlign(CENTER);
    text("Wellcome to Rabbit Game",width/2,height/3);
    textSize(25);
    text("Catch apples and carrots to score points",width/2,height/2 - 50);
    text("Avoid red obstacles",width/2,height/2);
// start the game after pressing this button
    if (mousePressedOver(startButton)){
      gameState = PLAY;
      startButton.visible=false;
      rabbit.visible=true;
    }
    //play state of the game
  } else if (gameState === PLAY){
    //change in bg
    background(gardenImg);
    //move rabbit with x axies of the plain with mouse
    rabbit.x = World.mouseX;
    edges= createEdgeSprites();
    rabbit.collide(edges);
   //calling the function of the elements 
    spawnApple();
    spawnRedl();
    spawnCarrot();
     //when rabbit touches the apple
      if (appleG.isTouching(rabbit)) {
        appleG.forEach(function(apple){
          if (apple.isTouching(rabbit)){
            score += 1;
            apple.remove();
          }
        });
    //when rabbit touches the carrots
      } else if(carrotG.isTouching(rabbit)){
        carrotG.forEach(function(carrot){
         if (carrot.isTouching(rabbit)){
          score += 1;
          carrot.remove();
         }
         });
        //when rabbit touches the red leaves
      }else if(redlG.isTouching(rabbit)) {
          gameState = END;
          rabbit.x = width/2;
      }
     }
     //when game state is end
      else if (gameState === END) {
        //velocities of all elements are 0
       appleG.velocityX = 0;
       redlG.velocityX = 0;
       carrotG.velocityX= 0;
      // life time of each elements are -1
       appleG.setLifetimeEach(-1);
       redlG.setLifetimeEach(-1);
       carrotG.setLifetimeEach(-1);
      // reset button visible
       reset.visible = true;
      // destroy the elements on present page 
       appleG.destroyEach();
       redlG.destroyEach();
       carrotG.destroyEach();
      // when pressed reset button
     if(mousePressedOver(reset)) {
      restart();
  }
  }
  //score 
  drawSprites();
  textSize(30);
  fill(255);
  text("Score: "+score,width/20,50);
}
// apple 
function spawnApple(){
  if(frameCount%80 ===0){
apple=createSprite(random(50,width-50),70,10,10);
   //apple.x=Math.round;
    apple.addImage(appleImg);
    apple.scale=0.1;
    apple.velocityY=5;
    apple.lifetime=150;
    apple.depth=rabbit.depth;
    rabbit.depth=rabbit.depth+1;
    appleG.add(apple);
  }    
}
// red leaves
  function spawnRedl(){
  if(frameCount%40 ===0){
  redl=createSprite(random(40,width-30),20,10,10);
  redl.scale=0.1;
  redl.addImage(redlImag);
  redl.velocityY=7;
  redl.lifetime = 150;
  redl.depth=rabbit.depth;
  rabbit.depth=rabbit.depth+1
  redlG.add(redl);
}
}
//carrot
function spawnCarrot(){
  if(frameCount%60 ===0){
  carrot=createSprite(random(40,width-50),60,10,10);
  carrot.scale=0.02;
  carrot.addImage(carrotImg);
  carrot.velocityY=5;
  carrot.lifetime = 150;
  carrot.depth=rabbit.depth;
  rabbit.depth=rabbit.depth+1
  carrotG.add(carrot);
}
}
// restrat the game
function restart(){
  gameState = PLAY;
  reset.visible = false;
  appleG.destroyEach();
  redlG.destroyEach();
  carrotG.destroyEach();
  rabbit.x=width/2;
  score = 0;
  
}