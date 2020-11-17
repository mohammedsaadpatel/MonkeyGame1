//the variables,groups and sprites
var monkey , monkey_running,monkey_out
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground

function preload(){
  
  //loading Images
  monkey_out = loadAnimation("sprite_0.png");
  
    monkey_running =                loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png",  "sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  //creating monkey
  monkey = createSprite(80,315,20,20)
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1
  
  //creating ground
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x  = ground.width/2
  console.log (ground.x) 
  
   //creating Groups
  obstacleGroup = createGroup();
  FoodGroup = createGroup();
  
  
  score = 0
  
}

function draw() {
  background(225);
  
  //texting score
  stroke("green");
  textSize(20);
  fill("green");
  text("Score:"+score,300,50 ) 
   
  if (ground.x<0){
    ground.x  = ground.width/2
  }
  
  //space jumping system
  if ((keyDown("space"))&& monkey.y >=250){
    monkey.velocityY = -12;
  }
  
  //gravity
  monkey.velocityY = monkey.velocityY + 0.8
  
  //monkey colliding ground
  monkey.collide(ground);
  
  
  if (monkey.isTouching(FoodGroup)){
     score = score+3
     FoodGroup.destroyEach();
  }
  
  //texting survivalTime
  var survivalTime = 0;
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate());
  text("Survival Time:"+ survivalTime,100,50); 
  
  
  spawnObstacles()
  spawnBananas();
  drawSprites();
}

function spawnBananas(){
  if (frameCount % 100 === 0){ 
    banana = createSprite(380,180,20,20);
    banana.velocityX = -6;
    banana.addImage(bananaImage) 
    banana.scale = 0.09
    banana.lifetime = 90;
    
    //sending in groups
    FoodGroup.add(banana) 
  }
  
}

function spawnObstacles(){
  if (frameCount % 130 === 0){
     obstacle = createSprite(380,320,10,10);
     obstacle.velocityX = -6;
     obstacle.addImage(obstacleImage);
     obstacle.scale = 0.13 
     obstacle.lifetime = 100;
    
    //sending in groups  
    obstacleGroup.add(obstacle);
     
  }
}


