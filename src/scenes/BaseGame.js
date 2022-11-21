export default class BaseGame extends Phaser.Scene {
  constructor(sceneName) {
    super(sceneName);
  }

  preload() {
    //during development
    this.sound.setVolume(0.1);

    // pre game button
    this.load.image('pre-game-button', '/assets/titles/pre-start-button.jpg');
    // load start button
    this.load.image('start-game-button', 'assets/titles/start-game-button.png');

    // load end game button
    this.load.image('end-game-button', 'assets/titles/game-over-button.png');

    // load start again button
    this.load.image('start-again-button', 'assets/titles/start-again-button.png');

    // load faster text when game speed increases
    this.load.image('faster-title', 'assets/titles/faster-title.png');

    // load music
    this.load.audio('theme', 'assets/audio/gamePlay/themeLLQ.mp3');
    this.load.audio('gameOverMusic', 'assets/audio/gameOver/gameover.mp3');
    this.load.audio('startGameMusic', 'assets/audio/startGame/startGameMusicUB.mp3');
    this.load.audio('FASTER', 'assets/audio/gamePlay/FASTER.mp3');

    // load in physics files
    this.load.json('obstacles-physics', 'assets/obstacles/obstacles-physics.json');
    this.load.json('fish-physics', 'assets/players/fish-physics.json');
    this.load.json('powerup-physics', 'assets/powerups/powerups-physics.json');

    // load static background
    this.load.svg('background', 'assets/background/whole-background1.svg', {
      width: 480,
      height: 270,
    });

    // load moving background
    this.load.svg('background0', 'assets/background/layer-0.svg', { width: 3500, height: 3481 });
    this.load.svg('background1', 'assets/background/layer-1.svg', { width: 1920, height: 1080 });
    this.load.svg('background2', 'assets/background/layer-2.svg', { width: 1920, height: 1080 });
    this.load.svg('background3', 'assets/background/layer-3.svg', { width: 1920, height: 1080 });
    this.load.svg('background4', 'assets/background/layer-4.svg', { width: 1920, height: 1080 });
    this.load.svg('background5', 'assets/background/layer-5.svg', { width: 1920, height: 1080 });
    this.load.svg('background6', 'assets/background/layer-6.svg', { width: 1920, height: 1080 });

    // load player
    this.load.atlas(
      'player',
      'assets/players/player-eel-spritesheet.png',
      'assets/players/player-fish.json',
    );

    // load obstacles
    this.load.svg('rockObstacle', 'assets/obstacles/obstacle-rock.svg');
    this.load.image('shipObstacle', 'assets/obstacles/obstacle-ship-wreck.png');
    this.load.image('sharkObstacle', 'assets/obstacles/obstacle-eel.png');

    // load powerups
    this.load.image('wormPower', 'assets/powerups/powerup-worm.png');
    this.load.image('octopusStephen', 'assets/powerups/octopus-stephen.png');
    this.load.image('bubblePower1', 'assets/powerups/bubbles1.png');
    this.load.atlas(
      'bubblePower',
      'assets/powerups/bubbles-spritesheet.png',
      'assets/powerups/bubbles.json',
    );
  }

  setStaticBackground() {
    // background
    this.add.image(0, 0, 'background').setOrigin(0, 0).setScale(4);
  }
}
