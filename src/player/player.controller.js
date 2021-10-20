/* let keys = {};

export default class PlayerController {
  loadPlayer(app, player) {
    app.ticker.add(this.gameLoop(player));

    window.addEventListener("keydown", this.keysDown);
    window.addEventListener("keyup", this.keysUp);
  }

  keysDown(e) {
    keys[e.keyCode] = true;
  }

  keysUp(e) {
    keys[e.keyCode] = false;
  }

  gameLoop(player) {
    if (keys["87"] || keys["38"]) {
      player.y -= 100;
    }
    if (keys["65"] || keys["37"]) {
      player.x -= 100;
    }
    if (keys["83"] || keys["40"]) {
      player.y += 100;
    }
    if (keys["68"] || keys["39"]) {
      player.x += 100;
    }
    if (keys["32"]) {
      dropToxic(player.x, player.y, app);
    }
  }

  dropToxic(poitionX, positionY, app) {
    let toxicBarrel = PIXI.Sprite.from("../src/assets/sprites/toxic-barrel.png");
    app.stage.addChild(toxicBarrel);
    toxicBarrel.position.set(poitionX, positionY);
    toxicBarrel.height = 64;
    toxicBarrel.width = 64;
  }
}
 */
