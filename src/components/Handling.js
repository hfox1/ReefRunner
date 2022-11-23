export default class Handling extends Phaser.Plugins.BasePlugin {
  constructor(pluginManager) {
    super(pluginManager);

    this.fishGravity = 0;
    this.gravity = 20;
    this.fishSpeed = 1;
    this.velocity = 25;
  }
}
