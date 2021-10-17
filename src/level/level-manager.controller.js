export default class LevelManager {
  BLOCK_WIDTH = 64;
  PATH_WALL = "../src/assets/levels/wall.png";
  WALL_SIGN = "X";
  PLAYER_SIGN = "P";

  firstLevel =
    "XXXXXXXXXXXX," +
    "XEEEEXXXXEEX," +
    "XXXXEXXXEEEX," +
    "XEEXEEEEEEEX," +
    "XEEXEXXEXEXX," +
    "XEEXEEEEEEEX," +
    "XEEXEEEEEEEX," +
    "XEEXEEEXXXEX," +
    "XEEEEEEXEEEX," +
    "XEEXEEEXEEEX," +
    "XEEXEEEEEEEX," +
    "XXXXXXXXXXXX,";

  loadLevel(app) {
    console.log("Loading level. " + this.firstLevel);

    let levelColumn = this.firstLevel.split(",");
    for (let i = 0; i < levelColumn.length; i++) {
      let levelRow = levelColumn[i];
      for (let y = 0; y < levelRow.length; y++) {
        let wall = PIXI.Sprite.from(this.PATH_WALL);
        if (levelRow.charAt(y) === this.WALL_SIGN) {
          wall.y = i * this.BLOCK_WIDTH;
          wall.x = y * this.BLOCK_WIDTH;
          app.stage.addChild(wall);
        }
        if (levelRow.charAt(y) === this.PLAYER_SIGN) {
          PATH_WALL = "../src/assets/levels/wall.png";
          let player = PIXI.Sprite.from("../src/assets/sprites/toxic-player-green.png");
          app.stage.addChild(player);
          player.height = 64;
          player.width = 64;
          player.y = i * this.BLOCK_WIDTH;
          player.x = y * this.BLOCK_WIDTH;
          /* player.position.set(i * this.BLOCK_WIDTH, y * this.BLOCK_WIDTH); */
        }
      }
    }
    return this.firstLevel;
  }
}
