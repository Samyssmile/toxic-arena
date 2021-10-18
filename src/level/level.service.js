export default class LevelService{

    levelStack = [];


    constructor() {
        let firstLevel =
            "XXXXXXXXXXXXXXXX," +
            "XPEEEXXXXEEXEEEX," +
            "XXXXEXXXEEEXEEEX," +
            "XEEEEEEEEXEXEEEX," +
            "XEEXEXXEXEEXEXEX," +
            "XXXXEEEEEEXEEXEX," +
            "XEEXEEEEEEEEEXEX," +
            "XEEXEEEXXXEXEEEX," +
            "XEEEEEEXEEEXEEXX," +
            "XEEXEEXXEEXXEEEX," +
            "XEEXEEEEEXXXEEEX," +
            "XEEXEEEEEEEXEEEX," +
            "XEEXEEEXXEEXEEXX," +
            "XEEXEEEXEEEXEXXX," +
            "XEEXEEEXEEEXEEXX," +
            "XXXXXXXXXXXXXXXX,";

        this.levelStack.push(firstLevel);
    }

    getNextLevel(){
        return this.levelStack[0];
    }

}