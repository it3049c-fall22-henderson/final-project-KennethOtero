/**
 * The config object contains all the settings required for the Phaser 
 * engine (e.g., scene width and height).
 */
let config = {
    width: 0,
    height: 0,
    scene: Scene1,
    physics: {
        default: "arcade"
    }
}

/**
 * Creates the game via the config settings
 */
window.onload() = function() {
    let game = new Phaser.Game(config);
}