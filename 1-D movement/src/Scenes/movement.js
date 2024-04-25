class Movement extends Phaser.Scene {
    constructor() {
        super("movementScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        this.startX = 300;
        this.startY = 350;

    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        this.load.setPath("./assets/");

        this.load.image("playerKey","character_squareRed.png");

        this.load.image("arrowKey","item_arrow.png");
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        this.playerSprite = this.add.sprite(this.startX, this.startY, "playerKey");
        this.arrowSprite = this.add.sprite(this.startX, this.startY, "arrowKey");

        this.arrowSprite.angle = -90; //rotate sprite so it points up

        this.arrowSprite.visible = false;

        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.spaceBarKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);


    }


    update() {
        let my = this.my;    // create an alias to this.my for readability

        //When a is pushed move to the left and dont go past limit
        if (this.aKey.isDown) {
            this.playerSprite.x -= 1;
            if (this.playerSprite.x <= 0) this.playerSprite.x = 0;
        }

        //When d is pushed move to the right and dont go past limit
        if (this.dKey.isDown) {
            this.playerSprite.x += 1;
            if (this.playerSprite.x >= 800) this.playerSprite.x = 800;
        }
        
        //Check to see if the arrow doesn't already exist
        if (this.spaceBarKey.isDown && !this.arrowSprite.visible) {
            this.arrowSprite.x = this.playerSprite.x; // Align with the player x position
            this.arrowSprite.y = this.playerSprite.y; // Start at player y position
            this.arrowSprite.visible = true;
        }

        // When the arrow sprite is visible, make it move upwards
        if (this.arrowSprite.visible) {
            this.arrowSprite.y -= 2; // Adjust the speed of the arrow here
            if (this.arrowSprite.y < 0) {
                this.arrowSprite.visible = false; // Hide and reset the arrow when it goes off screen
            }
        }

    }

}