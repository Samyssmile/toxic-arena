import LevelManager from "./level/level-manager.controller.js";

let app = new PIXI.Application({ width: 768, height: 768 });

document.body.appendChild(app.view);

let levelManager = new LevelManager();
levelManager.loadLevel(app);

let keys = {};
let keysDiv;

let player = PIXI.Sprite.from("../src/assets/sprites/toxic-player-green.jpg");
app.stage.addChild(player);
player.height = 64;
player.width = 64;

window.addEventListener("keydown", keysDown);
window.addEventListener("keyup", keysUp);

app.ticker.add(gameLoop);
keysDiv = document.querySelector("#keys");

function keysDown(e) {
  keys[e.keyCode] = true;
}

function keysUp(e) {
  keys[e.keyCode] = false;
}

function gameLoop() {
  if (keys["87"] || keys["38"]) {
    player.y -= 5;
  }
  if (keys["65"] || keys["37"]) {
    player.x -= 5;
  }
  if (keys["83"] || keys["40"]) {
    player.y += 5;
  }
  if (keys["68"] || keys["39"]) {
    player.x += 5;
  }
  if (keys["32"]) {
    dropToxic(player.x, player.y);
  }
}

function dropToxic(poitionX, positionY) {
  let toxicBarrel = PIXI.Sprite.from("../src/assets/sprites/toxic-barrel.png");
  app.stage.addChild(toxicBarrel);
  toxicBarrel.position.set(poitionX, positionY);
  toxicBarrel.height = 64;
  toxicBarrel.width = 64;
}
