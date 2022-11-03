// Create config settings for the game
let config = {
    width: 700,
    height: 500,
    backgroundColor: 0x000000, // Black
    scene: [Scene1, GameOver],
    physics: {
        default: "arcade"
    },
    parent: "game"
}

// Create the game using our config
let game = new Phaser.Game(config);