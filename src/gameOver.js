class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    init(data) {
        //The value of the final score is passed from the game scene to the game over scene, and accessible in Phaser's init method.
        this.finalScore = data.finalScore;
    }


    preload() {

    }

    create() {
        let gameOverStyle = { font: "40px Arial", fill: "#fff", fontStyle: 'bold' };

        //Creating and centering the game over message.
        this.gameOverMessageText = this.add.text(config.width / 2, config.height / 2 - 100, "Game Over\nScore: " + this.finalScore, gameOverStyle).setOrigin(0.5);

        // Show high score (pull high score from local storage)
        this.highScoreText = this.add.text(config.width / 2, config.height / 2, "High Score: ", {font: "40px Arial", fill: '#FFFF00'}).setOrigin(0.5);

        // Add restart scene text
        const restartButton = this.add.text(config.width / 2, config.height / 2 + 100, 'Restart Game', { font: "40px Arial", fill: '#00FF00' }).setOrigin(0.5);

        // Restart the scene on click
        restartButton.setInteractive({useHandCursor: true}).on('pointerdown', () => {
            // Get the scene
            let gameScene = this.scene.get('Scene1');

            // Reset game variables
            gameScene.snakeDirection = "";
            gameScene.score = 0;

            // Restart scene
            this.scene.start('Scene1');
        });
    }

    update() {

    }

    updateHighScore() {
        
    }
}