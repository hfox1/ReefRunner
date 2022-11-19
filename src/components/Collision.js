export default class Collision {
  constructor(scene) {
    this.scene = scene;
  }

  createCollision() {
    this.hitWorms = false;
    this.hitBubbles = false;
    this.hitStephen = false;

    this.scene.matter.world.on('collisionactive', (event, bodyA, bodyB) => {
      if (this.#fishNShark(bodyA, bodyB)) {
        // this.scene.cameras.main.shake(1000).on('complete', () => {
        this.scene.music.stop();
        this.scene.gameSpeed = 10;
        this.scene.scene.start('game-over', { score: this.scene.score.score });
        // });
      }

      if (this.#fishNWorms(bodyA, bodyB) && this.hitWorms == false) {
        this.scene.score.score += 1000;
        if (this.scene.plugins.get('handling').fishGravity < 20) {
          this.scene.plugins.get('handling').fishGravity += 5;
        }
        this.hitWorms = true;
        this.#kill(this.scene.powerups.worms);
        this.scene.time.addEvent({
          delay: 1000,
          callback: () => {
            this.hitWorms = false;
          },
        });
      }

      if (this.#fishNBubbles(bodyA, bodyB) && this.hitBubbles == false) {
        this.scene.score.score += 1000;
        if (this.scene.plugins.get('handling').fishGravity > -20) {
          this.scene.plugins.get('handling').fishGravity -= 5;
        }
        this.hitBubbles = true;
        this.#kill(this.scene.powerups.bubbles);
        this.scene.time.addEvent({
          delay: 1000,
          callback: () => {
            this.hitBubbles = false;
          },
        });
      }

      if (this.#fishNStephen(bodyA, bodyB) && this.hitStephen == false) {
        if (this.scene.plugins.get('handling').fishSpeed < 20) {
          this.scene.plugins.get('handling').fishSpeed += 1;
        }
        this.hitStephen = true;
        this.#kill(this.scene.powerups.octopusStephen);
        this.scene.time.addEvent({
          delay: 1000,
          callback: () => {
            this.hitStephen = false;
          },
        });
        this.scene.time.addEvent({
          delay: 5000,
          callback: () => {
            this.scene.plugins.get('handling').fishSpeed = 1;
          },
        });
      }

      if (this.#fishNRocks(bodyA, bodyB)) {
        this.scene.player.noCollision = false;
        this.scene.time.addEvent({
          delay: 500,
          callback: () => {
            this.scene.player.noCollision = true;
          },
        });
      }

      if (this.#fishNShips(bodyA, bodyB)) {
        this.scene.player.noCollision = false;
        this.scene.time.addEvent({
          delay: 500,
          callback: () => {
            this.scene.player.noCollision = true;
          },
        });
      }
    });
  }

  #kill(group) {
    group.getChildren().forEach((powerUp) => {
      group.killAndHide(powerUp);
    });
  }

  #fishNStephen(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'octopusStephen') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'octopusStephen')
    );
  }

  #fishNBubbles(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'bubbles') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'bubbles')
    );
  }

  #fishNShark(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'shark') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'shark')
    );
  }

  #fishNWorms(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'worm') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'worm')
    );
  }

  #fishNRocks(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'rock') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'rock')
    );
  }

  #fishNShips(bodyA, bodyB) {
    return (
      (bodyA.parent.label == 'fish1' && bodyB.parent.label == 'ship') ||
      (bodyB.parent.label == 'fish1' && bodyB.parent.label == 'ship')
    );
  }
}
