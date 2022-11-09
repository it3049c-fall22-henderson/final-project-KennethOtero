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

// Leaderboard to contain users and their scores
// Use Object.assign to add new players
// (e.g., Object.assign(snakeLeaderboard, {player2: {name: "James", score: 0}});
let snakeLeaderboard = {
    player1: {
        name: "Ken",
        score: 0
    }
}

// Create the game using our config
// let game = new Phaser.Game(config);