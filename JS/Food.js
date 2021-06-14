var database;
var GameState;
var FoodStock;
var LastFed;
var Time;
var MilkImage;
var BedroomImage , GardenImage , WashroomImage;
class Food{
    constructor(){
        database = firebase.database();

        MilkImage = loadImage("Sprites/Milk.png");
        BedroomImage = loadImage("Sprites/Bedroom.png");
        GardenImage = loadImage("Sprites/Garden.png");
        WashroomImage = loadImage("Sprites/Washroom.png");

        var ReadFoodStock = database.ref('Food');
        ReadFoodStock.on("value",this.readFoodStock);

        var ReadLastFed = database.ref('LastFed');
	    ReadLastFed.on("value",this.readLastFed);

        var ReadGameState = database.ref('GameState');
        ReadGameState.on("value",this.readGameState);
    }
    readFoodStock(data){
        FoodStock = data.val();
    }
    readLastFed(data){
        LastFed = data.val();
    }
    readGameState(data){
        GameState = data.val();
    }
    getLastFed(){
        return LastFed;
    }
    getFoodStock(){
        return FoodStock;
    }
    getGameState(){
        return GameState;
    }
    getTime(){
        return Time;
    }
    updateFoodStock(){
        FoodStock = FoodStock+1;
        database.ref('/').update({
            'Food': FoodStock
        })
    }
    deductFood(){
        FoodStock = FoodStock-1;
        LastFed = hour();
        database.ref('/').update({
            'LastFed': LastFed
        })
        database.ref('/').update({
            'Food': FoodStock
        })
    }
    updateGameState(State){
        database.ref('/').update({
            GameState : State
        });
    }
    Bedroom(){
        background(BedroomImage,500,250);
        GameState = "Sleeping";
        updateGameState();
    }
    Garden(){
        background(GardenImage,500,250);
        GameState = "Playing";
        updateGameState();
    }
    Washrooom(){
        background(WashroomImage,500,250);
        GameState = "Bathing";
        updateGameState();
    }
    writeGameState(){
        Time = hour();
        if(Time == (LastFed+1)){
            update("Playing");
            Garden();
        }
        else if(Time == (LastFed+2)){
            update("Sleeping");
            Bedroom();
        }
        else if(Time > (LastFed+2) && Time < (LastFed+4)){
            update("Bathing");
            Washroom();
        }
        else{
            update("Hungry");
            background(46,139,87);
        }
        updateGameState();
    }
    display(){
        imageMode(CENTER);
        var x = 0;
        var y = 100;
        for(var i = 0;i < FoodStock;i++){
            x = x+48;
            image(MilkImage,x,y,48,48);
            if(x >= 460){
                y = y+48;
                x = 0;
            }
        }
    }
}