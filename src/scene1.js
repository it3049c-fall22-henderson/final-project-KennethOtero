/**
 * Scene1 - Handles the logic for the game.
 */
class Scene1 {
    constructor() {
        // Snake alive state is set to true
        this.alive = true;

        // Set the snake's directions
        this.snakeDirection = "";

        // Set score of the game
        this.score = 0;
    }
    /**
     * preload() - Loads all assets needed for the game.
     */
    preload() {
        // Load the background
        this.load.image("background", "assets/Background.png");

        // Load the snake
        this.load.spritesheet("snakeBody", "assets/snake.jpg", {
            frameWidth: 16,
            frameHeight: 16
        });

        // Load the food
        this.load.spritesheet("snakeFood", "assets/Apple.png", {
            frameWidth: 16,
            frameHeight: 16
        });
    }

    /**
     * create() - Gets called after preload(). This method initializes the scene.
     */
    create() {
        // Place the background
        this.background = this.add.tileSprite(0, 0, config.width, config.height, "background");
        this.background.setOrigin(0,0);
        
        // Place the snake at the bottom center of the screen
        let snakeBody = this.snakeBody = this.physics.add.sprite(config.width / 2, config.height - 64, "snakeBody");

        // Place the food at the center of the screen
        let snakeFood = this.snakeFood = this.physics.add.sprite(config.width / 2, config.height / 2, "snakeFood");

        // Set collision on worldbounds so that the player/food does not exit the screen
        snakeBody.setCollideWorldBounds(true);
        snakeFood.setCollideWorldBounds(true);

        // Set score for the player and display it in the corner
        let style = { font: "20px Arial", fill: "#fff" };
        this.scoreText = this.add.text(10, 10, "SCORE: " + this.score, style);

        // Create cursor keypresses
        this.arrow = this.input.keyboard.createCursorKeys();
    }

    /**
     * update() - Gets called after create(). This method gets called 60 times
     * per second and contains game logic.
     */
    update() {
        // Exit if the snake is not alive
        if (!this.alive) return; 

        // Check if the snake has hit the food
        if (this.physics.overlap(this.snakeBody, this.snakeFood)) {
            this.hit();
        }

        // Get the snake's current direction from the user and move it
        this.moveSnake();
    }

    /**
     * hit() - Score when the snake collides with its food.
     */
    hit() {
        // Change the position of the food to a random location
        this.snakeFood.x = Phaser.Math.Between(100, 600);
        this.snakeFood.y = Phaser.Math.Between(100, 300);

        // Increment the score and update it on the screen
        this.score++;
        this.scoreText.setText("SCORE: " + this.score);
    }

    /**
     * moveSnake() - Moves the snake based on user input. Since the snake gets bigger with every score,
     * the snake cannot move in the opposite direction that it's traveling in, (e.g., moving left when
     * the snake is going right) to prevent it from colliding with itself.
     */
    moveSnake() {
        // Update the snake's current direction based on the user's input
        if (this.arrow.left.isDown && this.snakeDirection !== "RIGHT") {
            this.snakeDirection = "LEFT";
        } else if (this.arrow.right.isDown && this.snakeDirection !== "LEFT") {
            this.snakeDirection = "RIGHT";
        } else if (this.arrow.up.isDown && this.snakeDirection !== "DOWN") {
            this.snakeDirection = "UP";
        } else if (this.arrow.down.isDown && this.snakeDirection !== "UP") {
            this.snakeDirection = "DOWN";
        }

        // Move the snake depending on the user's chosen direction
        switch (this.snakeDirection) {
            case "LEFT":
                this.snakeBody.x--;
                break;
            case "RIGHT":
                this.snakeBody.x++;
                break;
            case "UP":
                this.snakeBody.y--;
                break;
            case "DOWN":
                this.snakeBody.y++;
                break;
        }
    }
}