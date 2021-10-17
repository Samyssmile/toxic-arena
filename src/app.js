import LevelManager from "./level/level-manager.controller.js";

let app = new PIXI.Application({ width: 640, height: 360 });

document.body.appendChild(app.view);

var levelManager = new LevelManager();
