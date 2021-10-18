import LevelManager from "./level/level-manager.controller.js";
import LevelService from "./level/level.service.js";

let app = new PIXI.Application({width: 1024, height: 1024, backgroundColor: 0xE28743});

document.body.appendChild(app.view);

let levelService = new LevelService();
let levelManager = new LevelManager(app);

levelManager.startGameWithLevel(levelService.getNextLevel());