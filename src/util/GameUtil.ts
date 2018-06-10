import Point from "../interfaces/Point";
import { BoardUtil } from "./BoardUtil";
import { CellValue } from "./Enum";
import { sortBy, find } from "lodash-es";
import { BOARD_SIZE } from "./Settings";

class GameUtil {
  public static getBestNextMove(
    board: CellValue[][],
    movesForward: number,
    sign: CellValue
  ): Point {
    const availableMoves: Point[] = this.getAvailableMoves(board);
    let movesWithWeights = availableMoves.map(move => ({
      move,
      weight: this.minMax(board, move, movesForward - 1, sign)
    }));

    movesWithWeights = sortBy(movesWithWeights, "weight");
    return movesWithWeights[movesWithWeights.length - 1].move;
  }

  public static minMax(
    board: CellValue[][],
    lastMove: Point,
    movesForward,
    sign
  ): number {
    if (movesForward > 0) {
      const value = this.getBoardValue(board, lastMove, sign);
      if (value !== 0) {
        return value * movesForward;
      }

      board[lastMove.x][lastMove.y] = sign;

      const availableMoves: Point[] = this.getAvailableMoves(board);
      const signForNextStep = sign === CellValue.X ? CellValue.O : CellValue.X;
      let movesWithWeights = availableMoves.map(move => ({
        move,
        weight: this.minMax(board, move, movesForward - 1, signForNextStep)
      }));

      board[lastMove.x][lastMove.y] = CellValue.NULL;

      movesWithWeights = sortBy(movesWithWeights, "weight");

      if (sign === CellValue.O) {
        return movesWithWeights[movesWithWeights.length - 1].weight;
      } else {
        return movesWithWeights[0].weight;
      }
    } else {
      return this.getBoardValue(board, lastMove, sign);
    }
  }

  public static getBoardValue(
    board: CellValue[][],
    lastMove: Point,
    sign: CellValue
  ): number {
    const coefficient = sign === CellValue.X ? -1 : 1;
    const opponentSign = sign === CellValue.X ? CellValue.O : CellValue.X;

    board[lastMove.x][lastMove.y] = sign;

    const inLinePlayer = this.checkHowMuchInLine(board, lastMove, sign);
    const inLineOpponent = this.checkHowMuchInLine(
      board,
      lastMove,
      opponentSign
    );


    board[lastMove.x][lastMove.y] = CellValue.NULL;

    if (inLinePlayer === 5) {
      return coefficient * 70000;
    } else if (inLineOpponent === 5) {
      return coefficient * 100000;
    } else if (inLinePlayer === 4) {
      return coefficient * 7000;
    } else if (inLineOpponent === 4) {
      return coefficient * 10000;
    } else if (inLinePlayer === 3) {
      return coefficient * 700;
    } else if (inLineOpponent === 3) {
      return coefficient * 1000;
    }

    return 0;
  }

  public static getAvailableMoves(board: CellValue[][]): Point[] {
    const markedAvailable: Point[] = [];
    for (let x = 0; x < BOARD_SIZE; x++) {
      for (let y = 0; y < BOARD_SIZE; y++) {
        if (board[x][y] !== CellValue.NULL) {
          const neighbors: Point[] = BoardUtil.getNeighbors({ x, y });
          neighbors.forEach((point: Point) => {
            if (
              find(markedAvailable, { x: point.x, y: point.y }) === undefined &&
              board[point.x][point.y] === CellValue.NULL
            ) {
              markedAvailable.push(point);
            }
          });
        }
      }
    }
    return markedAvailable;
  }

  public static checkGameWin(
    board: CellValue[][],
    move: Point,
    sign: CellValue
  ) {
    console.log("checking win status");
    const score = this.checkHowMuchInLine(board, move, sign);
    if (score === 5) {
      console.log("won");
      return true;
    }
    return false;
  }

  public static checkHowMuchInLine(
    board: CellValue[][],
    move: Point,
    sign: CellValue
  ): number {
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
    let finalScore = 0;
    let startingPoint = 0;
    if (board[move.x][move.y] === sign) {
      startingPoint = 1;
    }
    for (const el of neighborhood) {
      if (
        move.x + el[0] >= 0 &&
        move.x + el[0] <= 100 &&
        move.y + el[1] >= 0 &&
        move.y + el[1] <= 100 &&
        board[move.x + el[0]][move.y + el[1]] === sign
      ) {
        let score = 0;
        let counter = 1;
        while (
          move.x + counter * el[0] >= 0 &&
          move.x + counter * el[0] <= 100 &&
          move.y + counter * el[1] >= 0 &&
          move.y + counter * el[1] <= 100 &&
          board[move.x + counter * el[0]][move.y + counter * el[1]] === sign
        ) {
          score += 1;
          counter += 1;
          if (score > 5) {
            break;
          }
        }
        if (startingPoint === 1) {
          counter = -1;
          while (
            move.x + counter * el[0] >= 0 &&
            move.x + counter * el[0] <= 100 &&
            move.y + counter * el[1] >= 0 &&
            move.y + counter * el[1] <= 100 &&
            board[move.x + counter * el[0]][move.y + counter * el[1]] === sign
          ) {
            score += 1;
            counter -= 1;
            if (score > 5) {
              break;
            }
          }
        }
        if (score > finalScore) {
          finalScore = score;
        }
      }
    }
    return finalScore + startingPoint;
  }
}

export default GameUtil;
