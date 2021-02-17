//Create variables here
var dog,dogImg,happyDogImg,dataBase,foodS,foodStock
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  happyDogImage = loadImage("images/dogImg1.png");
}

function setup() {
  createCanvas(500, 500);
  dataBase = firebase.database();
  foodStock = dataBase.ref("Food");
  foodStock.on("value",readStock);
  foodStock.set(20);

  dog = createSprite(250,350,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  
}


function draw() {  
  background("green");

  if(foodS!= undefined){
    textSize(20);
    fill(255);
    text("NOTE : Press UP Arrow TO Feed DRAGO Milk",50,50);
    text("Food Remaining:"+foodS,150,150);
  }

  if(keyWentDown(DOWN_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImage);
  }

  if(keyWentUp(UP_ARROW)){
  
    dog.addImage(dogImage);
  }

  if(foodS === 0){
    foodS = 20;
  }
  

  drawSprites();
  //add styles here

}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref("/").update({
    Food:x
  });
}

function readStock(data){
  foodS = data.val();
}



