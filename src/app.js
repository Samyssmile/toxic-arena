import LevelManager from "./level/level-manager.controller.js";
import LevelService from "./level/level.service.js";

let app = new PIXI.Application({width: 1024, height: 1024, backgroundColor: 0xE28743});

document.body.appendChild(app.view);

let levelService = new LevelService();
let levelManager = new LevelManager(app);

levelManager.startGameWithLevel(levelService.getNextLevel());

let keys = {};

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
    const stepInPixels = 4;
    if (keys["87"] || keys["38"]) {
        levelManager.moveTop(stepInPixels);
    } else if (keys["65"] || keys["37"]) {
        levelManager.moveLeft(stepInPixels);
    } else if (keys["83"] || keys["40"]) {
        levelManager.moveBottom(stepInPixels);
    } else if (keys["68"] || keys["39"]) {
        levelManager.moveRight(stepInPixels);
    }
    if (keys["32"]) {
        levelManager.dropToxicBomb();
    }
}
