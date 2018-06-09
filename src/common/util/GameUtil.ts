import { CellValue } from "./Enum";
import Point from "./Point";
import { BoardUtil } from "./BoardUtil";

class GameUtil {
  public static getAvailableMoves(board: CellValue[][], ): Point[] {
    const markedAvailable: Point[] = [];
    for (const [column, colVal] of board.entries()) {
      for (const [row, val] of colVal.entries()) {
        if (val !== CellValue.NULL) {
          const neighbors: Point[] = BoardUtil.getNeighbors({x: column, y: row});
          for (const point of neighbors) {
            if (board[point.x][point.y] === CellValue.NULL && markedAvailable.indexOf(point) < 0) {
              markedAvailable.push(point);
            }
          }
        }
      }
    }
    return markedAvailable;
  }

  public static checkGameWin(board: CellValue[][], destX: number, destY: number, sign: CellValue) {
    console.log('checking win status');
    const neighborhood = [
      [-1,-1],
      [0,-1], 
      [1,-1], 
      [1, 0],
      [1, 1],
      [0, 1],
      [-1, 1],
      [-1, 0]
    ];
    for (const el of neighborhood) {
      if (board[destX + el[0]][destY + el[1]] === sign) {
        let score = 1;
        let counter = 1;
        while (board[destX + (counter * el[0])][destY + (counter * el[1])] === sign) {
          score += 1;
          counter +=1
          if (score > 5) {
            break;
          }
        }
        counter = -1;
        while (board[destX + (counter * el[0])][destY + (counter * el[1])] === sign) {
          score +=1;
          counter -= 1;
          if (score > 5) {
            break;
          }
        }
        if (score === 5) {
          console.log('won');
          return true;
        } else {
          break;
        }
      }
    }
    return false;
  }
}

export default GameUtil;