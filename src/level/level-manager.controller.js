export default class LevelManager {

    firstLevel =
        "XXXXXX," +
        "XEEEEX," +
        "XEEXEX," +
        "XEEXEX," +
        "XXXXXX,"

    loadLevel() {
        console.log("Loading level. "+this.firstLevel)
        return this.firstLevel;
    }

}
