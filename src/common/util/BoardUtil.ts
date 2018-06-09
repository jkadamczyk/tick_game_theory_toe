import { CellValue } from "./Enum";
import Point from "./Point";

export class BoardUtil {
  public static initializeEmptyGameArray(): CellValue[][] {
    const resultArray = new Array(100);
    for (let i = 0; i < 100; i++) {
      resultArray[i] = new Array(100).fill(CellValue.NULL);
    }
    return resultArray;
  }

  public static getNeighbors(element: Point): Point[] {
    const neighbors: Point[] = [];
    const neighborhood = [
      [-1, -1],
      [0, -1],
      [1, -1],
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0]
    ];
    neighborhood.forEach(neighbor => {
      if (element.x + neighbor[0] >= 0 && element.y + neighbor[1] >= 0) {
        neighbors.push({
          x: element.x + neighbor[0],
          y: element.y + neighbor[1]
        });
      }
    });
    return neighbors;
  }
}
