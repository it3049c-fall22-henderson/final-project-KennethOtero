/**
 * Scene1 - Handles the logic for the game.
 */
class Scene1 {
    /**
     * preload() - Loads all assets needed for the game.
     */
    preload() {

    }

    /**
     * create() - Gets called after preload(). This method initializes the scene.
     */
    create() {

    }

    /**
     * update() - Gets called after create(). This method gets called 60 times
     * per second and contains game logic.
     */
    update() {

    }
}

// Create config settings for the game
let config = {
    width: 0,
    height: 0,
    scene: Scene1,
    physics: {
        default: "arcade"
    }
}

// Create the game using our config
let game = new Phaser.Game(config);