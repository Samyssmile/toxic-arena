import LevelManager from "./level/level-manager.controller.js";

let app = new PIXI.Application({ width: 768, height: 768 , backgroundColor: 123207});

document.body.appendChild(app.view);

let levelManager = new LevelManager(app);
levelManager.loadLevel();

let keys = {};
let keysDiv;

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
  const stepInPixels = 2;
  if (keys["87"] || keys["38"]) {
    levelManager.moveBottom(stepInPixels);

  }else
  if (keys["65"] || keys["37"]) {
    levelManager.moveLeft(stepInPixels);

  }else
  if (keys["83"] || keys["40"]) {
    levelManager.moveTop(stepInPixels);

  }else
  if (keys["68"] || keys["39"]) {
    levelManager.moveRight(stepInPixels);

  }else
  if (keys["32"]) {
    levelManager.dropToxicBomb();
  }
}


