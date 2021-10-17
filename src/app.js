import LevelManager from "./level/level-manager.controller.js";


let app = new PIXI.Application({ width: 768, height: 768 });

document.body.appendChild(app.view);

let levelManager = new LevelManager();
levelManager.loadLevel(app);





