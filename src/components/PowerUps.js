export default class PowerUp {
  constructor(scene) {
    this.scene = scene;
    // this.screenWidth = this.scene.cameras.
    // this.screenHeight = this.scene.cameras.height;
  }

  createPowerUps() {
    // load in physics files
    this.physics = this.scene.cache.json.get('powerup-physics');

    this.tick = 0;

    // create and populate obstacle groups
    this.#createGroups();
    this.#populateGroups();
    // this.#bubbleAnimation();
  }

  updatePowerUps() {
    this.tick += 1;

    // add cans of worms
    if (this.tick % 10 != 0) {
      let XPosWorms = Math.floor(Math.random() * (1920 * 0.4)) + 1920 * 0.6;
      this.scaleWorms = 0.5;
      this.#powerupCallback(this.worms, XPosWorms, -100, this.scaleWorms);
    }
    // add stephens
    if (this.tick % 200 == 0) {
      let XPosStephen = Math.floor(Math.random() * (1920 * 0.4)) + 1920 * 0.6;
      this.scaleStephen = 0.4;
      this.#powerupCallback(this.octopusStephen, XPosStephen, 100, this.scaleStephen);
    }

    // add bubbles
    if (this.tick % 10 == 0) {
      let XPosBubbles = Math.floor(Math.random() * (1920 * 0.4)) + 1920 * 0.6;
      this.scaleBubbles = 0.5;
      this.#powerupCallback(this.bubbles, XPosBubbles, 1200, this.scaleBubbles);
    }

    this.#controlPowerUp(this.worms, -1, 0.6, -200, this.scaleWorms);
    this.#controlPowerUp(this.octopusStephen, -0.9, 0, -150, this.scaleStephen);
    this.#controlPowerUp(this.bubbles, -1, -1, -200, this.scaleBubbles);
  }

  #createGroups() {
    this.worms = this.scene.add.group();
    this.octopusStephen = this.scene.add.group();
    this.bubbles = this.scene.add.group();
  }

  #populateGroups() {
    // make sure you don't get more objects on the the screen than there are in the group!
    for (let i = 0; i < 1; i++) {
      this.worms.add(
        this.scene.matter.add.image(-200, -200, 'wormPower', null, { shape: this.physics.worm }),
      );
      this.octopusStephen.add(
        this.scene.matter.add.image(-200, -200, 'octopusStephen', null, {
          shape: this.physics.octopusStephen,
        }),
      );
      this.bubbles.add(this.#bubblesAnimation());
    }
  }

  #powerupCallback(group, XPos, YPos, scale) {
    // only add child if there is one available in the pool
    if (group.countActive() < group.getLength()) {
      group.get(XPos, YPos).setActive(true).setVisible(true).setScale(scale);
    }
  }

  #bubblesAnimation() {
    if (IS_TOUCH) {
      return this.scene.matter.add.image(-200, -200, 'bubblePower', null, {
        shape: this.physics.bubbles,
      });
    } else {
      let bubbleImage = this.scene.matter.add.sprite(-200, -200, 'bubblePower', null, {
        shape: this.physics.bubbles,
      });

      let bubblesMove = {
        key: 'bubbles-move',
        frames: [
          { key: 'bubblePower', frame: 'bubbles1.png' },
          { key: 'bubblePower', frame: 'bubbles2.png' },
          { key: 'bubblePower', frame: 'bubbles3.png' },
        ],
        frameRate: 2,
        repeat: -1,
      };

      // this.scene.anims.create(bubblesMove);
      // bubbleImage.anims.load('bubbles-move');
      // bubbleImage.anims.play('bubbles-move');

      return bubbleImage;
    }
  }

  #controlPowerUp(group, VelX, VelY, upperLim, scale) {
    group.incX(VelX * this.scene.gameSpeed);
    group.incY(VelY * this.scene.gameSpeed);
    group.getChildren().forEach((powerup) => {
      powerup.setAngle(0);
      powerup.setVelocityX(0);
      powerup.setVelocityY(0);

      if (powerup.y > 1080 - (scale * powerup.height) / 2) {
        powerup.y = 1080 - (scale * powerup.height) / 2;
      }

      if (powerup.active && (powerup.y < upperLim || powerup.x < -80)) {
        group.killAndHide(powerup);
      }
    });
  }
}
