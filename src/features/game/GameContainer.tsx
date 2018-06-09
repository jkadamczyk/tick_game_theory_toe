import * as React from "react";
import { connect } from "react-redux";
import ActionCreators from "../../actions";
import Point from "../../interfaces/Point";
import { StoreProvider } from "../../StoreProvider";
import DrawUtil from "../../util/DrawUtil";
import { CellValue } from "../../util/Enum";
import GameUtil from "../../util/GameUtil";
import "./GameContainer.css";
import { max } from "lodash-es";

interface Props {
  setCell: (x, y, value) => any;
  boardUp: () => any;
  boardDown: () => any;
  boardLeft: () => any;
  boardRight: () => any;
  boardPosition: { x: number; y: number };
}

class GameContainer extends React.Component<Props, {}> {
  public canvas: HTMLCanvasElement;
  public canvasWrappingDiv: HTMLDivElement;
  public parentDiv: HTMLDivElement;

  public constructor(props) {
    super(props);
  }

  public componentDidMount() {
    this.drawCanvas();
    window.addEventListener("resize", this.drawCanvas);
    this.canvas.addEventListener("click", this.handleClick);
    window.addEventListener("keydown", this.handleArrowKeys);
  }

  public componentDidUpdate() {
    const ctx = this.canvas.getContext("2d");
    DrawUtil.clearCanvas(this.canvas);
    this.drawCanvas();
    DrawUtil.drawAllXOs(ctx);
  }

  public componentWillUnmount() {
    window.removeEventListener("resize", this.drawCanvas);
    this.canvas.removeEventListener("click", this.handleClick);
    window.removeEventListener("keydown", this.handleArrowKeys);
  }

  private drawCanvas = () => {
    DrawUtil.updateCanvasDimensions(
      this.canvas,
      this.parentDiv,
      this.canvasWrappingDiv
    );
    DrawUtil.drawBoardCells(this.canvas);
  };

  private handleClick = (event: MouseEvent) => {
    const ctx = this.canvas.getContext("2d");
    const boundingRect = this.canvasWrappingDiv.getBoundingClientRect();
    const mouseX = event.clientX - boundingRect.left;
    const mouseY = event.clientY - boundingRect.top;
    const destX = Math.floor(mouseX / 20);
    const destY = Math.floor(mouseY / 20);
    if (StoreProvider.getState().gameState[destX][destY] === 0) {
      DrawUtil.drawX(ctx, destX * 20, destY * 20);
      this.props.setCell(destX, destY, CellValue.X);
      GameUtil.checkGameWin(StoreProvider.getState().gameState, {x: destX, y: destY}, CellValue.X);
      this.opponentMove();
    }
  };

  private opponentMove() {
    const ctx = this.canvas.getContext("2d");
    const board = StoreProvider.getState().gameState;
    const possibleMoves: Point[] = GameUtil.getAvailableMoves(board);
    const toChose = possibleMoves.map(move => GameUtil.getBoardValue(board, move, CellValue.O));
    const maxIndex = toChose.indexOf(max(toChose));
    // console.log(GameUtil.getBoardValue(board, possibleMoves[randomIndex], CellValue.O));
    DrawUtil.drawO(ctx, possibleMoves[maxIndex].x * 20, possibleMoves[maxIndex].y * 20);
    this.props.setCell(possibleMoves[maxIndex].x, possibleMoves[maxIndex].y, CellValue.O);
  }

  private handleArrowKeys = (event: KeyboardEvent) => {
    const { boardUp, boardDown, boardLeft, boardRight } = this.props;
    const position = StoreProvider.getState().boardPosition;
    switch (event.key) {
      case "ArrowUp":
        if (position.y > 0) {
          boardUp();
        }
        break;
      case "ArrowDown":
        if (position.y + this.canvas.height / 20 < 100) {
          boardDown();
        }
        break;
      case "ArrowLeft":
        if (position.x > 0) {
          boardLeft();
        }
        break;
      case "ArrowRight":
        if (position.x + this.canvas.width / 20 < 100) {
          boardRight();
        }
        break;
    }
  };

  public render() {
    console.log("render");
    return (
      <div ref={ref => (this.parentDiv = ref)} className="GameContainer">
        <div ref={ref => (this.canvasWrappingDiv = ref)}>
          <canvas ref={ref => (this.canvas = ref)} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = store => ({
  boardPosition: store.boardPosition
});

const mapDispatchToProps = dispatch => {
  return {
    setCell: (x, y, value) => dispatch(ActionCreators.setCell(x, y, value)),
    boardUp: () => dispatch(ActionCreators.moveBoardUp()),
    boardDown: () => dispatch(ActionCreators.moveBoardDown()),
    boardLeft: () => dispatch(ActionCreators.moveBoardLeft()),
    boardRight: () => dispatch(ActionCreators.moveBoardRight())
  };
};

const Game = connect(
  mapStateToProps,
  mapDispatchToProps
)(GameContainer);
export default Game;
