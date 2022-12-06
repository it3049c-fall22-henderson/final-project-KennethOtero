// Create config settings for the game
let config = {
    width: 700,
    height: 500,
    backgroundColor: 0x000000, // Black
    scene: Scene1,
    physics: {
        default: "arcade"
    },
    parent: "game"
}

if(High_Score <= score)
{High_Score = score;}

//High_Score = score;

document.getElementById("").innerHTML = "Score = " + score;
document.getElementById("").innerHTML = "High Score = " + High_Score;

StoreInLocalStorage();

function StoreInLocalStorage()
{
    localStorage.snake = JSON.stringify(snake);
        localStorage.High_Score = JSON.stringify(High_Score);
}

function GetFromLocalStorage()
{
    if(!localStorage.snake)
    {
        localStorage.snake = JSON.stringify([]);
        snake = {
            x : 160,
            y : 160 ,
            cells : [{x:160 , y:160} , {x:144 , y:160}],
        };
    }
}
if (!localStorage.High_Score)
{
    localStorage.High_Score = JSON.stringify();
}
else
{
    High_Score = JSON.parse(localStorage.High_Score);
}
// Create the game using our config
// let game = new Phaser.Game(config);

