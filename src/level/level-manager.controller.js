const { Sound } = PIXI.sound;

export default class LevelManager {
  BLOCK_WIDTH = 64;
  PATH_WALL = "../src/assets/levels/wall.png";
  PATH_PLAYER = "../src/assets/sprites/player/player-sheet.png";
  WALL_SIGN = "X";
  PLAYER_SIGN = "P";
  CENTER_SHIFT = 4;
  wallArray = [];

  player;
  playerSheet = {};

  constructor(app) {
    this.app = app;
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
          this.app.loader.add("player", this.PATH_PLAYER);
          this.app.loader.load(this.setup(i * this.BLOCK_WIDTH, y * this.BLOCK_WIDTH));
        }
      }
    }
    return firstLevel;
  }

  setup(playerInitialXCoord, playerInitialYCoord) {
    this.createPlayerSheet();
    this.createPlayer(playerInitialXCoord, playerInitialYCoord);
    //COM der gameLoop wird nicht genutzt
    this.app.ticker.add(this.gameLoop());
  }

  //COM wollen wir den player nicht auslagern sodass der player seine eigene datei hat wo er erzeugt wird.
  createPlayer(playerInitialXCoord, playerInitialYCoord) {
    this.player = new PIXI.AnimatedSprite(this.playerSheet.walkEast);
    //COM der anchor ist hier falsch du bestimmst weiter unten die position ?
    this.player.anchor.set(0.5);
    this.player.animationSpeed = 0.2;
    this.player.loop = true;
    this.player.x = playerInitialXCoord;
    this.player.y = playerInitialYCoord;
    this.player.height = 64;
    this.player.width = 64;
    this.app.stage.addChild(this.player);
    this.player.play();
  }
  createPlayerSheet() {
    let ssheet = new PIXI.BaseTexture.from(this.app.loader.resources["player"].url);
    let w = 64;
    let h = 64;

    this.playerSheet["standSouth"] = [new PIXI.Texture(ssheet, new PIXI.Rectangle(1 * w, 0, w, h))];
    this.playerSheet["standWest"] = [new PIXI.Texture(ssheet, new PIXI.Rectangle(2 * w, 0, w, h))];
    this.playerSheet["standEast"] = [new PIXI.Texture(ssheet, new PIXI.Rectangle(3 * w, 0, w, h))];
    this.playerSheet["standNorth"] = [new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h))];

    this.playerSheet["walkNorth"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(4 * w, 0, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(5 * w, 0, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(6 * w, 0, w, h)),
    ];
    this.playerSheet["walkEast"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(7 * w, 0, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(8 * w, 0, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(9 * w, 0, w, h)),
    ];
    this.playerSheet["walkSouth"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(10 * w, 0, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(11 * w, 0, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(12 * w, 0, w, h)),
    ];
    this.playerSheet["walkWest"] = [
      new PIXI.Texture(ssheet, new PIXI.Rectangle(13 * w, 0, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(14 * w, 0, w, h)),
      new PIXI.Texture(ssheet, new PIXI.Rectangle(15 * w, 0, w, h)),
    ];

    //COM wird nicht genutzt ?
    let numberOfFrames = 4;
  }

  gameLoop() {
    //COM wird nicht genutzt
    const stepInPixels = 4;
  }

  //COM moveTop Bottom Left Right ist sehr viel gleicher code ich werde den zusammenfügen.
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

  collisionDetection(playerSprite, wallSprite) {
    let playerBox = playerSprite.getBounds();
    let wallBox = wallSprite.getBounds();

    playerSprite.get;

    return (
      playerBox.x + playerBox.width > wallBox.x &&
      playerBox.x < wallBox.x + wallBox.width &&
      playerBox.y + playerBox.height > wallBox.y &&
      playerBox.y < wallBox.y + wallBox.height
    );
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
  //COM sollte bei den Playercontrolls sein und nicht im level manager
  dropToxicBomb() {
    let toxicBarrel = PIXI.Sprite.from("../src/assets/sprites/toxic-barrel.png");
    this.app.stage.addChild(toxicBarrel);
    toxicBarrel.position.set(this.player.x, this.player.y);
    toxicBarrel.height = 64;
    toxicBarrel.width = 64;
    const boobSound = Sound.from("../src/assets/audio/toxic-place.wav");
    boobSound.play();
  }
}
