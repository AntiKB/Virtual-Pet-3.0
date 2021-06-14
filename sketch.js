var Dog , HungryDogImage , ContentDogImage;
var FoodObject;
var FeedDogButton , AddFoodStockButton;
var GameState;
var Time;
function preload(){
	ContentDogImage = loadImage("Sprites/ContentDog.png");
	HungryDogImage = loadImage("Sprites/HungryDog.png");
}
function setup(){
	createCanvas(500,800);

	Dog = createSprite(250,600,200,200);
	Dog.addImage(ContentDogImage);
	Dog.scale = 0.25;

	FeedDogButton = createButton('Feed Dog');
	FeedDogButton.position(325,25);
	FeedDogButton.mousePressed(() => {
		var FoodStock = FoodObject.getFoodStock();
		if(FoodStock > 0){
			FoodObject.deductFood();
			Dog.addImage(HungryDogImage);
		}
	})

	AddFoodStockButton = createButton('Add Food');
	AddFoodStockButton.position(400,25);
	AddFoodStockButton.mousePressed(() => {
		FoodObject.updateFoodStock();
	})

	FoodObject = new Food();
}
function draw(){
	background(46,139,87);
	drawSprites();
	noStroke();
	textSize(25);
	fill("BLACK");
	GameState = FoodObject.getGameState();
	console.log(GameState);
	Time = FoodObject.getTime();
	drawLastFed();
	checkGameState();
	FoodObject.display();
}
function drawLastFed(){
	var LastFed = FoodObject.getLastFed();
	if(LastFed < 12 && LastFed > 0){
		text("Last Feed: "+LastFed+"AM",100,40);
	}
	if(LastFed > 12 && LastFed < 24){
		text("Last Feed: "+(LastFed-12)+"PM",100,40);
	}
	if(LastFed == 0){
		text("Last Feed: 12 AM",100,40);
	}
	if(LastFed == 12){
		text("Last Feed: 12 PM",100,40);
	}
}
function hideGUI(){
	FeedDogButton.hide();
	AddFoodStockButton.show();
	Dog.addImage(HungryDogImage);
}
function showGUI(){
	FeedDogButton.show();
	AddFoodStockButton.hide();
	Dog.addImage(ContentDogImage);
}
function checkGameState(){
	if(GameState != undefined){
		if(GameState != "Hungry"){
			hideGUI();
		}
		else if(LastFed == Time + 1){
			FoodObject.Garden();
			showGUI();
		}
		else if(LastFed == Time+2){
			FoodObject.Bedroom();
			showGUI();
		}
		else if(LastFed >= Time+2 && LastFed <= Time+4){
			FoodObject.Washroom();
			showGUI();
		}
		else{
			Dog.display();
			GameState = "Hungry";
		}
	}
}