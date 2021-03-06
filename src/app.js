import LevelManager from "./level/level-manager.controller.js";
import LevelService from "./level/level.service.js";

let app = new PIXI.Application({ width: 1024, height: 1024, backgroundColor: 0xe28743 });
document.body.appendChild(app.view);

const levelService = new LevelService();
const levelManager = new LevelManager(app);

levelManager.startGameWithLevel(levelService.getNextLevel());

function playMusic() {
  console.log("play");
}
