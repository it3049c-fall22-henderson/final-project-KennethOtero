/**
 * Scene1 - Handles the logic for the game.
 */
class Scene1  extends Phaser.Scene {
    constructor() {

        super({ key: 'Scene1' });

        // Snake alive state is set to true
        this.alive = true;

        // Set the snake's directions
        this.snakeDirection = "";

        //current direction angle
        this.currentAngle = 0;

        // Set score of the game
        this.score = 0;

        this.SNAKEX = 21
        this.SNAKEY = 21    


    }
    /**
     * preload() - Loads all assets needed for the game.
     */
    preload() {
        // Load the background
        this.load.image("background", "assets/Background.png");

        //Load the snake pieces
        this.load.spritesheet("snakeHead", "assets/snakeHead.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("snakeBody", "assets/snakeBody.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("snakeTurn", "assets/snakeTurn.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("snakeTail", "assets/snakeTail.png", {
            frameWidth: 16,
            frameHeight: 16
        });

        this.load.spritesheet("snakeTurn_clockwise", "assets/snakeTurn_clock.png", {
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
        

        this.snakeGroup = this.physics.add.group();
        this.firstNodePosition = new Phaser.Geom.Point(this.SNAKEX, this.SNAKEY);
        this.firstNode = this.snakeGroup.create(this.SNAKEX * 16, this.SNAKEY * 16, 'snakeHead');
        this.firstNode.setOrigin(0.5)

        this.tail = this.snakeGroup.create((this.SNAKEX * 16 + 16), this.SNAKEY * 16, 'snakeTail');
        this.tail.setOrigin(0.5)

        this.trailingNodes = new Phaser.Geom.Point(this.SNAKEX, this.SNAKEY)



        this.speed = 75
        this.moveDelay = 0

        // Set up event for if the snake collides with the world bounds.
        this.firstNode.body.setCollideWorldBounds(true);
        this.firstNode.body.onWorldBounds = true
        this.physics.world.on('worldbounds', () => {
            this.gameOver()
        });

        // Place the food at the center of the screen
        let snakeFood = this.snakeFood = this.physics.add.sprite(config.width / 2, config.height / 2, "snakeFood");

        // Set collision on worldbounds so that the player/food does not exit the screen
        snakeFood.setCollideWorldBounds(true);

        // Set score for the player and display it in the corner
        let style = { font: "20px Arial", fill: "#fff" };
        this.scoreText = this.add.text(8, 8, "SCORE: " + this.score, style);

        // Create cursor keypresses
        this.arrow = this.input.keyboard.createCursorKeys();
    }

    /**
     * update() - Gets called after create(). This method gets called 60 times
     * per second and contains game logic.
     */
    update(timeElasped) {

        // Update the snake's current direction based on the user's input
        if (this.arrow.left.isDown && this.snakeDirection !== "LEFT" && this.snakeDirection !== "RIGHT") {
            this.snakeDirection = "LEFT";
            this.currentAngle = 0;
        } else if (this.arrow.right.isDown && this.snakeDirection !== "LEFT" && this.snakeDirection !== "RIGHT") {
            this.snakeDirection = "RIGHT";
            this.currentAngle = -180;
        } else if (this.arrow.up.isDown && this.snakeDirection !== "UP" && this.snakeDirection !== "DOWN") {
            this.snakeDirection = "UP";
            this.currentAngle = 90;
        } else if (this.arrow.down.isDown && this.snakeDirection !== "UP" && this.snakeDirection !== "DOWN") {
            this.snakeDirection = "DOWN";
            this.currentAngle = -90;
        }

        //Only start to move or check for hits after the player has started movement
        if (this.snakeDirection !== ""){
            //Without this the snake moves too fast
            if(timeElasped >= this.moveDelay){
                this.moveSnake(timeElasped);
            }

            // Check if the snake has hit the food
            if (this.physics.overlap(this.snakeGroup, this.snakeFood)) {
                this.hit();
            }
        }
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

        //get previous ending angle
        var addAngle = this.snakeGroup.getLast(true).angle;
        //set previous tail to a body part
        this.snakeGroup.getLast(true).setTexture("snakeBody");
        //add the new tail
        var sectionToAdd = this.snakeGroup.create(this.trailingNodes.x, this.trailingNodes.y, 'snakeTail');
        sectionToAdd.setOrigin(0.5,0.5);
        //set new tail to same angle as old tail
        sectionToAdd.angle = addAngle;
    }

    /**
     * moveSnake() - Moves the snake based on user input. Since the snake gets bigger with every score,
     * the snake cannot move in the opposite direction that it's traveling in, (e.g., moving left when
     * the snake is going right) to prevent it from colliding with itself.
     */
    moveSnake(timeElasped) {

         // Move the snake based on user input
        if (this.snakeDirection === "LEFT") {
            this.firstNodePosition.x--;
        } else if (this.snakeDirection === "RIGHT") {
            this.firstNodePosition.x++;
        } else if (this.snakeDirection === "UP") {
            this.firstNodePosition.y--;
        } else if (this.snakeDirection === "DOWN") {
            this.firstNodePosition.y++;
        }

        Phaser.Actions.ShiftPosition(this.snakeGroup.getChildren(), this.firstNodePosition.x * 16, this.firstNodePosition.y * 16, 1, this.trailingNodes);
        this.updateSnake(true);

        this.moveDelay = timeElasped + this.speed;

        //This checks for snake collisions with itself
        // The 2nd argument is the compare object. In other words, this will return a match if the x position and y position of any snake nodes equals the x or y position of the first node, the head.
        // 1 is the offset. If we don't have that, we'd be checking if the position of the first node equaled the position of the first node
        if(Phaser.Actions.GetFirst(this.snakeGroup.getChildren(), { x: this.firstNode.x, y: this.firstNode.y }, 1)){
            this.gameOver()
        }


    }

    //Used to update the snake
    updateSnake(){
        var first = true;
        var prevA = this.currentAngle;
        var p = 0; // placeholder variable for switching prevA and part.angle
        this.snakeGroup.getChildren().forEach(function (part){
            //changes head direction
            if (first){
                part.angle = prevA;
                first = false;
            //changes body direction
            }else {
                //turns
                if (prevA != part.angle){
                    if ((prevA < part.angle && !(part.angle ===90 && prevA === -180)) || (part.angle === -180 && prevA === 90)){ // moving counter clockwise
                        part.setTexture("snakeTurn");
                    } else { // moving clockwise
                        part.setTexture("snakeTurn_clockwise");
                    }  
                    p = part.angle;
                    part.angle = prevA;
                    prevA = p;
                //moving straight
                } else{
                    part.setTexture("snakeBody");
                    p = part.angle;
                    part.angle = prevA;
                    prevA = p;
                }
            }

        });
        //adds tail to last piece
        this.snakeGroup.getLast(true).setTexture("snakeTail");
    }

    /***
     * Navigates to the game over screen. A game should be over if the head of the snake exists the world, or collides with its body.
     */
    gameOver(){

        this.scene.start("GameOver", {"finalScore": this.score})
        
    }

    
}