var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleGroundGroup, invisibleGround;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300);
  tower.addImage("tower",towerImg);
  tower.velocityY = 3;

  doorsGroup= new Group();
  climbersGroup= new Group();
  invisibleGroundGroup= new Group();

  ghost= createSprite(200, 200, 50, 50);
  ghost.addImage("ghost", ghostImg);
  ghost.scale= 0.3;
  spookySound.loop();


  
}

function draw() {
  background(200);
  
 
   
    if(gameState=== "play"){
      if(tower.y > 400){
        tower.y = 300
      }
      spawnDoors()
      if(keyDown("up_arrow")){
        ghost.velocityY= -5;
      }
      ghost.velocityY= ghost.velocityY+ 0.8;
  
      if(keyDown("right_arrow")){
        ghost.x = ghost.x+ 3;
      }
  
      if(keyDown("left_arrow")){
        ghost.x= ghost.x+ -3;
      }
      if(invisibleGroundGroup.isTouching(ghost)|| ghost.y> 600){
        ghost.destroy();
        gameState="end"
      }
      drawSprites()
    }

if(gameState==="end"){
  stroke("Yellow");
  fill("Black");
  textSize(30);
  text(" Game Over ", 230, 250);

}

    

  }


function spawnDoors(){
  if(frameCount%240===0){
    door= createSprite(200, -50);
    door.addImage(doorImg);
    door.x= Math.round(random(120,400));
    door.velocityY= 3;
    door.lifetime= 600;
    doorsGroup.add(door);

    climber= createSprite(200, 10);
    climber.addImage(climberImg);
    climber.x= door.x;
    climber.velocityY= 3;
    climber.lifetime= 600;
    climbersGroup.add(climber);
    door.depth= climber.depth;
   // climber.depth=ghost.depth;
    //door.depth+=1;
    ghost.depth+= 2;
  
    invisibleGround= createSprite(200, 15);
    invisibleGround.x= door.x;
      invisibleGround .velocityY= 3;
   invisibleGround.lifetime= 600;
   invisibleGroundGroup.add(door);
   invisibleGround.width= climber.width
   invisibleGround.height=2;
   invisibleGround.visible= false;

  }
}