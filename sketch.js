var PLAY=1;
var END=0;
var gameState=PLAY;

var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var survivalTime;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,600);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1

  ground = createSprite(400,350,100000,10);
  ground.velocityX=-4
  ground.scale = 1;
  ground.x=ground.width/2;
  console.log(ground.x);
  
  
  FoodGroup = new Group();
  obstacleGroup = new Group();
  score=0;
}
  
function draw() {

  background(255);
  text("Score: "+ score, 500,50);
 
  if(gameState === PLAY){
  
    spawnFood();
  spawnObstacles();
    
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("Survival Time: "+ survivalTime,100,50);
  if(keyDown("space") && monkey.y >= 200){
    monkey.velocityY = -12;
  }
  monkey.velocityY = monkey.velocityY + 0.8;
  monkey.collide(ground);
  
  
  if(ground.x<0){
    ground.x=ground.width/2;
  }
  if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+2;
  }
    
  if(obstacleGroup.isTouching(monkey)){
      obstacleGroup.destroyEach();
     gameState=END;
  }
    
  }
   else if (gameState === END) {
  textSize(50)
   text("Game Over ",230,300);
     
  FoodGroup.setLifetimeEach(-1);
   obstacleGroup.setLifetimeEach(-1);
 
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
     
    monkey.setVelocityX=0;
    ground.setVelocityX=0;
   monkey.collide(ground);
     monkey.visible=false;
   }
  

  drawSprites();
}

function spawnFood(){
  if(frameCount%100===0){
  var banana = createSprite(500,165,5,5);
  banana.addImage(bananaImage);
  banana.scale=0.1 ;
  banana.y=Math.round(random(120,200))
  banana.velocityX=-4;
  banana.lifetime=700;
  monkey.depth=banana.depth;
  monkey.depth+=1;
  FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if(frameCount%300===0){
   var obstacle = createSprite(500,320,10,10);
  obstacle.addImage(obstacleImage);
  obstacle.scale=0.15; 
  obstacle.velocityX=-4;
  obstacle.lifetime=800;
  obstacleGroup.add(obstacle);
  
  }
}


