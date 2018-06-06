import { CellState } from "./Enum";

export class CommonUtil {
    public static calculateCanvasDimension(dimension: number) {
        return Math.floor((dimension * 0.8) / 20) * 20;
    }

    public static initializeEmptyGameArray(): CellState[][] {
        const resultArray = new Array(100);
        for (let i = 0; i< 100; i++) {
            resultArray[i] = (new Array(100)).fill(CellState.NULL);
        }
        return resultArray;
    }
}