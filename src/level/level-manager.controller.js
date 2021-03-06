const { Sound } = PIXI.sound;
export default class LevelManager {
  BLOCK_WIDTH = 64;
  PATH_WALL = "../src/assets/levels/wall.png";
  PATH_PLAYER = "../src/assets/sprites/player/player-sheet.png";
  PATH_BARREL = "../src/assets/sprites/bomb/bomb_v2/bomb_sheet.png";
  WALL_SIGN = "X";
  PLAYER_SIGN = "P";
  CENTER_SHIFT = 4;
  wallArray = [];
  player;
  barrel;
  playerSheet = {};
  barrelSheet = {};
  liveBarrelCounter = 0;
  keys = {};

  constructor(app) {
    this.app = app;
    window.addEventListener("keypress", (e) => {
      this.keys[e.code] = true;
    });
    window.addEventListener("keyup", (e) => {
      this.keys[e.code] = false;
    });
    this.addResources();
    this.gameMusic();
  }

  gameMusic() {
    const gameMusic = Sound.from("../src/assets/audio/game-music.mp3");
    const playMusic = document.getElementById("playMusic");
    const stopMusic = document.getElementById("stopMusic");
    if (playMusic) {
      playMusic.addEventListener("click", function () {
        gameMusic.play();
      });
    }
    if (stopMusic) {
      stopMusic.addEventListener("click", function () {
        gameMusic.stop();
      });
    }
  }

  addResources() {
    this.app.loader.add("player", this.PATH_PLAYER);
    this.app.loader.add("barrel", this.PATH_BARREL);
  }

  startGameWithLevel(firstLevel) {
    let levelColumn = firstLevel.split(",");
    for (let i = 0; i < levelColumn.length; i++) {
      let levelRow = levelColumn[i];
      for (let y = 0; y < levelRow.length; y++) {
        let wall = PIXI.Sprite.from(this.PATH_WALL);

        if (levelRow.charAt(y) === this.WALL_SIGN) {
          wall.y = i * this.BLOCK_WIDTH;
          wall.x = y * this.BLOCK_WIDTH;
          this.app.stage.addChild(wall);
          this.wallArray.push(wall);
        }
        if (levelRow.charAt(y) === this.PLAYER_SIGN) {
          this.app.loader.load(this.setup(i * this.BLOCK_WIDTH, y * this.BLOCK_WIDTH));
        }
      }
    }
    return firstLevel;
  }
  setup(playerInitialXCoord, playerInitialYCoord) {
    this.createPlayerSheet();
    this.createBarrelSheet();

    this.createPlayer(playerInitialXCoord, playerInitialYCoord);
    this.app.ticker.add(() => {
      const stepInPixels = 4;
      if (this.keys["KeyD"] || this.keys["ArrowRight"]) {
        if (!this.player.playing) {
          this.player.textures = this.playerSheet.walkEast;
          this.player.play();
        }
        this.moveRight(stepInPixels);
      }
      if (this.keys["KeyA"] || this.keys["ArrowLeft"]) {
        if (!this.player.playing) {
          this.player.textures = this.playerSheet.walkWest;
          this.player.play();
        }
        this.moveLeft(stepInPixels);
      }
      if (this.keys["KeyS"] || this.keys["ArrowDown"]) {
        if (!this.player.playing) {
          this.player.textures = this.playerSheet.walkSouth;
          this.player.play();
        }
        this.moveBottom(stepInPixels);
      }
      if (this.keys["KeyW"] || this.keys["ArrowUp"]) {
        if (!this.player.playing) {
          this.player.textures = this.playerSheet.walkNorth;
          this.player.play();
        }
        this.moveTop(stepInPixels);
      }
      if (this.keys["Space"]) {
        this.dropToxicBomb(this.player.x, this.player.y, this.app);
      }
    });
  }

  createPlayer(playerInitialXCoord, playerInitialYCoord) {
    this.player = new PIXI.AnimatedSprite(this.playerSheet.walkEast);
    this.player.animationSpeed = 0.15;
    this.player.loop = false;
    this.player.x = playerInitialXCoord;
    this.player.y = playerInitialYCoord;
    this.player.height = 64;
    this.player.width = 64;
    this.app.stage.addChild(this.player);
  }

  dropToxicBomb() {
    this.liveBarrelCounter += 1;
    if (this.liveBarrelCounter < 2) {
      let toxicBarrel = new PIXI.AnimatedSprite(this.barrelSheet.barrelSpawn);
      toxicBarrel.position.x = this.player.x;
      toxicBarrel.position.y = this.player.y;
      toxicBarrel.animationSpeed = 0.15;
      toxicBarrel.loop = false;
      toxicBarrel.height = 64;
      toxicBarrel.width = 64;
      this.app.stage.addChild(toxicBarrel);

      const toxicBarrelDrop = Sound.from("../src/assets/audio/toxic-barrel-drop.wav");
      toxicBarrelDrop.play();

      setTimeout(() => {
        toxicBarrel.textures = this.barrelSheet.barrelExplosion;
        toxicBarrel.play();
        this.barrelExplosionSound();
        toxicBarrel.onComplete = () => {
          this.app.stage.removeChild(toxicBarrel);
          this.liveBarrelCounter = 0;
        };
      }, 2000);
    }
  }

  barrelExplosionSound() {
    const barrelExplosion = Sound.from("../src/assets/audio/toxic-barrel-explosion.wav");
    barrelExplosion.play();
  }

  playMusic() {
    console.log("play");
  }

  stopMusic() {
    console.log("stop");
  }

  createBarrelSheet() {
    let spriteSheet = new PIXI.BaseTexture.from(this.app.loader.resources["barrel"].url);
    let w = 64;
    let h = 64;

    this.barrelSheet["barrelSpawn"] = [new PIXI.Texture(spriteSheet, new PIXI.Rectangle(0, 0, w, h))];

    this.barrelSheet["barrelExplosion"] = [
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(0, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(2 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(3 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(4 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(5 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(6 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(7 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(8 * w, 0, w, h)),
    ];
  }

  createPlayerSheet() {
    let spriteSheet = new PIXI.BaseTexture.from(this.app.loader.resources["player"].url);
    let w = 64;
    let h = 64;

    this.playerSheet["standSouth"] = [new PIXI.Texture(spriteSheet, new PIXI.Rectangle(w, 0, w, h))];
    this.playerSheet["standWest"] = [new PIXI.Texture(spriteSheet, new PIXI.Rectangle(2 * w, 0, w, h))];
    this.playerSheet["standEast"] = [new PIXI.Texture(spriteSheet, new PIXI.Rectangle(3 * w, 0, w, h))];
    this.playerSheet["standNorth"] = [new PIXI.Texture(spriteSheet, new PIXI.Rectangle(4 * w, 0, w, h))];

    this.playerSheet["walkNorth"] = [
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(4 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(5 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(6 * w, 0, w, h)),
    ];
    this.playerSheet["walkEast"] = [
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(7 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(8 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];
    this.playerSheet["walkSouth"] = [
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(10 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(11 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(12 * w, 0, w, h)),
    ];
    this.playerSheet["walkWest"] = [
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(13 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(14 * w, 0, w, h)),
      new PIXI.Texture(spriteSheet, new PIXI.Rectangle(15 * w, 0, w, h)),
    ];
  }

  moveTop(pixelStep) {
    this.player.y -= pixelStep;
    let intersects = false;
    for (let i = 0; i < this.wallArray.length; i++) {
      let wall = this.wallArray[i];
      intersects = this.intersects(this.player, wall);

      if (intersects) {
        let xPlayerCenter = (this.player.x + this.player.width) / 2;
        let xWallCenter = (wall.x + wall.width) / 2;
        if (xPlayerCenter > xWallCenter + this.CENTER_SHIFT) {
          let shadowCopyPlayerRectangle = new PIXI.Rectangle();
          shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds());
          shadowCopyPlayerRectangle.x = shadowCopyPlayerRectangle.x + 65;
          if (this.intersects(shadowCopyPlayerRectangle, wall)) {
          } else {
            this.player.x += pixelStep;
          }
        }
        if (xPlayerCenter < xWallCenter - this.CENTER_SHIFT) {
          let shadowCopyPlayerRectangle = new PIXI.Rectangle();
          shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds());
          shadowCopyPlayerRectangle.x = shadowCopyPlayerRectangle.x - 65;
          if (this.intersects(shadowCopyPlayerRectangle, wall)) {
          } else {
            this.player.x -= pixelStep;
          }
        }
        break;
      }
    }

    if (intersects) {
      this.player.y += pixelStep;
    }
  }

  moveLeft(pixelStep) {
    this.player.x -= pixelStep;
    let intersects = false;
    for (let i = 0; i < this.wallArray.length; i++) {
      let wall = this.wallArray[i];
      intersects = this.intersects(this.player, wall);

      if (intersects) {
        let yPlayerCenter = (this.player.y + this.player.height) / 2;
        let yWallCenter = (wall.y + wall.height) / 2;
        if (yPlayerCenter > yWallCenter + this.CENTER_SHIFT) {
          let shadowCopyPlayerRectangle = new PIXI.Rectangle();
          shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds());
          shadowCopyPlayerRectangle.y = shadowCopyPlayerRectangle.y + 65;
          if (this.intersects(shadowCopyPlayerRectangle, wall)) {
          } else {
            this.player.y += pixelStep;
          }
        }
        if (yPlayerCenter < yWallCenter - this.CENTER_SHIFT) {
          let shadowCopyPlayerRectangle = new PIXI.Rectangle();
          shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds());
          shadowCopyPlayerRectangle.y = shadowCopyPlayerRectangle.y - 65;
          if (this.intersects(shadowCopyPlayerRectangle, wall)) {
          } else {
            this.player.y -= pixelStep;
          }
        }
        break;
      }
    }

    if (intersects) {
      this.player.x += pixelStep;
    }
  }

  moveBottom(pixelStep) {
    this.player.y += pixelStep;
    let intersects = false;
    for (let i = 0; i < this.wallArray.length; i++) {
      let wall = this.wallArray[i];
      intersects = this.intersects(this.player, wall);

      if (intersects) {
        let xPlayerCenter = (this.player.x + this.player.width) / 2;
        let xWallCenter = (wall.x + wall.width) / 2;
        if (xPlayerCenter > xWallCenter + this.CENTER_SHIFT) {
          let shadowCopyPlayerRectangle = new PIXI.Rectangle();
          shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds());
          shadowCopyPlayerRectangle.x = shadowCopyPlayerRectangle.x + 65;
          if (this.intersects(shadowCopyPlayerRectangle, wall)) {
          } else {
            this.player.x += pixelStep;
          }
        }
        if (xPlayerCenter < xWallCenter - this.CENTER_SHIFT) {
          let shadowCopyPlayerRectangle = new PIXI.Rectangle();
          shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds());
          shadowCopyPlayerRectangle.x = shadowCopyPlayerRectangle.x - 65;
          if (this.intersects(shadowCopyPlayerRectangle, wall)) {
          } else {
            this.player.x -= pixelStep;
          }
        }
        break;
      }
    }

    if (intersects) {
      this.player.y -= pixelStep;
    }
  }

  moveRight(pixelStep) {
    this.player.x += pixelStep;
    let intersects = false;
    for (let i = 0; i < this.wallArray.length; i++) {
      let wall = this.wallArray[i];
      intersects = this.intersects(this.player, wall);

      if (intersects) {
        let yPlayerCenter = (this.player.y + this.player.height) / 2;
        let yWallCenter = (wall.y + wall.height) / 2;
        if (yPlayerCenter > yWallCenter + this.CENTER_SHIFT) {
          let shadowCopyPlayerRectangle = new PIXI.Rectangle();
          shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds());
          shadowCopyPlayerRectangle.y = shadowCopyPlayerRectangle.y + 65;
          if (this.intersects(shadowCopyPlayerRectangle, wall)) {
          } else {
            this.player.y += pixelStep;
          }
        }
        if (yPlayerCenter < yWallCenter - this.CENTER_SHIFT) {
          let shadowCopyPlayerRectangle = new PIXI.Rectangle();
          shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds());
          shadowCopyPlayerRectangle.y = shadowCopyPlayerRectangle.y - 65;
          if (this.intersects(shadowCopyPlayerRectangle, wall)) {
          } else {
            this.player.y -= pixelStep;
          }
        }
        break;
      }
    }

    if (intersects) {
      this.player.x -= pixelStep;
    }
  }

  intersects(circle, rect) {
    let circleDistanceX = Math.abs(circle.x - rect.x);
    let circleDistanceY = Math.abs(circle.y - rect.y);

    let radiusDivider = 2.13;
    if (circleDistanceX > rect.width / radiusDivider + circle.width / radiusDivider) {
      return false;
    }
    if (circleDistanceY > rect.height / radiusDivider + circle.width / radiusDivider) {
      return false;
    }

    if (circleDistanceX <= rect.width / radiusDivider) {
      return true;
    }
    if (circleDistanceY <= rect.height / radiusDivider) {
      return true;
    }

    let cornerDistance_sq =
      (circleDistanceX - rect.width / radiusDivider) ^ (2 + (circleDistanceY - rect.height / radiusDivider)) ^ 2;

    return cornerDistance_sq <= ((circle.width / radiusDivider) ^ 2);
  }
}
