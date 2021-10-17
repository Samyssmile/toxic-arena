import LevelManager from "./level/level-manager.controller.js";

let app = new PIXI.Application({ width: 768, height: 768 });

document.body.appendChild(app.view);

let levelManager = new LevelManager();
levelManager.loadLevel(app);

let keys = {};

let player = PIXI.Sprite.from("../src/assets/sprites/toxic-player-green.png");
player.height = 64;
player.width = 64;
app.stage.addChild(player);
app.stage.setChildIndex(player, 1);

window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

app.ticker.add(gameLoop);

function keysDown(e) {
  keys[e.keyCode] = true;
}

function keysUp(e) {
  keys[e.keyCode] = false;
}

function gameLoop() {
  if (keys["87"] || keys["38"]) {
    player.y -= 6;
  } else if (keys["65"] || keys["37"]) {
    player.x -= 6;
  } else if (keys["83"] || keys["40"]) {
    player.y += 6;
  } else if (keys["68"] || keys["39"]) {
    player.x += 6;
  }
  if (keys["32"]) {
    dropToxic(player.x, player.y);
  }
}

function dropToxic(poitionX, positionY) {
  let toxicBarrel = PIXI.Sprite.from("../src/assets/sprites/toxic-barrel.png");
  toxicBarrel.position.set(poitionX, positionY);
  toxicBarrel.height = 64;
  toxicBarrel.width = 64;

  app.stage.addChild(toxicBarrel);
  app.stage.setChildIndex(toxicBarrel, 0);
}
