class GameOver extends Phaser.Scene{


constructor(){
    super({ key: 'GameOver' });
}

init(data){
    //The value of the final score is passed from the game scene to the game over scene, and accessible in Phaser's init method.
    this.finalScore = data.finalScore;
}


preload(){


}

create(){

    let gameOverStyle = { font: "40px Arial", fill: "#fff", fontStyle: 'bold' };

    //Creating and centering the game over message.
    this.gameOverMessageText = this.add.text(config.width / 2, config.height / 2, "Game Over\nScore: " + this.finalScore, gameOverStyle).setOrigin(0.5)



}
replay(){
    document.getElementByIdById('endScreen').style.display='none';
}

update() {

}

}

