import * as React from "react";
import { connect } from "react-redux";
import ActionCreators from "../../actions";
import DrawUtil from "../../common/util/DrawUtil";
import { CellValue } from "../../common/util/Enum";
import { StoreProvider } from "../../StoreProvider";
import "./GameContainer.css";
import GameUtil from "../../common/util/GameUtil";
import Point from "../../common/util/Point";

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
      GameUtil.checkGameWin(StoreProvider.getState().gameState ,destX, destY, CellValue.X);
      this.opponentMove();
    }
  };

  private opponentMove() {
    const ctx = this.canvas.getContext("2d");
    const possibleMoves: Point[] = GameUtil.getAvailableMoves(StoreProvider.getState().gameState);
    const randomIndex = Math.floor(Math.random() * (possibleMoves.length - 1));
    console.log(possibleMoves);
    DrawUtil.drawO(ctx, possibleMoves[randomIndex].x * 20, possibleMoves[randomIndex].y * 20);
    this.props.setCell(possibleMoves[randomIndex].x, possibleMoves[randomIndex].y, CellValue.O);
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
      default:
        console.log("unrecognized key event");
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
