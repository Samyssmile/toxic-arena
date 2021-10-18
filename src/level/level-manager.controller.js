const {Sound} = PIXI.sound;

export default class LevelManager {
    BLOCK_WIDTH = 64;
    PATH_WALL = "../src/assets/levels/wall.png";
    WALL_SIGN = "X";
    PLAYER_SIGN = "P";
    CENTER_SHIFT=3;
    wallArray = [];

    player;
    firstLevel =
        "XXXXXXXXXXXX," +
        "XPEEEXXXXEEX," +
        "XXXXEXXXEEEX," +
        "XEEXEEEEEXEX," +
        "XEEXEXXEXEEX," +
        "XEEXEEEEEEX," +
        "XEEXEEEEEEEX," +
        "XEEXEEEXXXEX," +
        "XEEEEEEXEEEX," +
        "XEEXEEEXEEXX," +
        "XEEXEEEEEEEX," +
        "XXXXXXXXXXXX,";

    constructor(app) {
        this.app = app;
    }

    loadLevel() {
        console.log("Loading level. " + this.firstLevel);

        let levelColumn = this.firstLevel.split(",");
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
                    this.PATH_WALL = "../src/assets/levels/wall.png";
                    this.player = PIXI.Sprite.from("../src/assets/sprites/toxic-player-green.png");
                    this.player.getBounds();
                    console.log("Player loaded: " + this.player);
                    this.app.stage.addChild(this.player);
                    this.player.height = 64;
                    this.player.width = 64;
                    this.player.y = i * this.BLOCK_WIDTH;
                    this.player.x = y * this.BLOCK_WIDTH;
                }
            }
        }
        return this.firstLevel;
    }

    moveTop(pixelStep) {
        this.player.y -= pixelStep;
        let intersects = false;
        for (let i = 0; i < this.wallArray.length; i++) {
            let wall = this.wallArray[i];
            intersects = this.intersects(this.player, wall);

            if (intersects) {
                let xPlayerCenter = (this.player.x + this.player.width) / 2;
                let xWallCenter = (wall.x+wall.width)/2;
                if (xPlayerCenter>(xWallCenter+this.CENTER_SHIFT)){
                    let shadowCopyPlayerRectangle = new PIXI.Rectangle;
                    shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds())
                    shadowCopyPlayerRectangle.x = shadowCopyPlayerRectangle.x+65;
                    if (this.intersects(shadowCopyPlayerRectangle, wall)){
                    }else{
                        this.player.x +=pixelStep
                    }
                }
                if (xPlayerCenter<(xWallCenter-this.CENTER_SHIFT)){
                    let shadowCopyPlayerRectangle = new PIXI.Rectangle;
                    shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds())
                    shadowCopyPlayerRectangle.x = shadowCopyPlayerRectangle.x-65;
                    if (this.intersects(shadowCopyPlayerRectangle, wall)){
                    }else{
                        this.player.x -=pixelStep
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
                let yWallCenter = (wall.y+wall.height)/2;
                if (yPlayerCenter>(yWallCenter+this.CENTER_SHIFT)){
                    let shadowCopyPlayerRectangle = new PIXI.Rectangle;
                    shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds())
                    shadowCopyPlayerRectangle.y = shadowCopyPlayerRectangle.y+65;
                    if (this.intersects(shadowCopyPlayerRectangle, wall)){
                    }else{
                        this.player.y +=pixelStep
                    }
                }
                if (yPlayerCenter<(yWallCenter-this.CENTER_SHIFT)){
                    let shadowCopyPlayerRectangle = new PIXI.Rectangle;
                    shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds())
                    shadowCopyPlayerRectangle.y = shadowCopyPlayerRectangle.y-65;
                    if (this.intersects(shadowCopyPlayerRectangle, wall)){
                    }else{
                        this.player.y -=pixelStep
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
                let xWallCenter = (wall.x+wall.width)/2;
                if (xPlayerCenter>(xWallCenter+this.CENTER_SHIFT)){
                    let shadowCopyPlayerRectangle = new PIXI.Rectangle;
                    shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds())
                    shadowCopyPlayerRectangle.x = shadowCopyPlayerRectangle.x+65;
                    if (this.intersects(shadowCopyPlayerRectangle, wall)){
                    }else{
                        this.player.x +=pixelStep
                    }
                }
                if (xPlayerCenter<(xWallCenter-this.CENTER_SHIFT)){
                    let shadowCopyPlayerRectangle = new PIXI.Rectangle;
                    shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds())
                    shadowCopyPlayerRectangle.x = shadowCopyPlayerRectangle.x-65;
                    if (this.intersects(shadowCopyPlayerRectangle, wall)){
                    }else{
                        this.player.x -=pixelStep
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
                let yWallCenter = (wall.y+wall.height)/2;
                if (yPlayerCenter>(yWallCenter+this.CENTER_SHIFT)){
                    let shadowCopyPlayerRectangle = new PIXI.Rectangle;
                    shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds())
                    shadowCopyPlayerRectangle.y = shadowCopyPlayerRectangle.y+65;
                    if (this.intersects(shadowCopyPlayerRectangle, wall)){
                    }else{
                        this.player.y +=pixelStep
                    }
                }
                if (yPlayerCenter<(yWallCenter-this.CENTER_SHIFT)){
                    let shadowCopyPlayerRectangle = new PIXI.Rectangle;
                    shadowCopyPlayerRectangle = Object.assign(shadowCopyPlayerRectangle, this.player.getBounds())
                    shadowCopyPlayerRectangle.y = shadowCopyPlayerRectangle.y-65;
                    if (this.intersects(shadowCopyPlayerRectangle, wall)){
                    }else{
                        this.player.y -=pixelStep
                    }
                }
                break;
            }
        }

        if (intersects) {
            this.player.x -= pixelStep;
        }


    }

    isCollision(shadowCopyPlayer) {
        let collides = false;
        for (let i = 0; i < this.wallArray.length; i++) {
            let wall = this.wallArray[i];
            collides = this.intersects(shadowCopyPlayer, wall);
            if (collides) {
                break;
            }
        }
        return collides;
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

        let radiusDivider = 2.1;
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

        let cornerDistance_sq = (circleDistanceX - rect.width / radiusDivider) ^ (2 + (circleDistanceY - rect.height / radiusDivider)) ^ 2;

        return cornerDistance_sq <= ((circle.width / radiusDivider) ^ 2);
    }

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
