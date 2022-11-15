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

// Leaderboard to contain users and their scores
// Use Object.assign to add new players: key = name, value = score
// (e.g., Object.assign(snakeLeaderboard, {Ken: 0});
let snakeLeaderboard = {
    Ken: 0
}

// Create the game using our config
// let game = new Phaser.Game(config);