import { StoreProvider } from "../../StoreProvider";
import CanvasUtil from "./CanvasUtil";
import { CellValue } from "./Enum";

class DrawUtil {
  public static drawX(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "blue";
    ctx.beginPath();
    ctx.moveTo(x + 3, y + 3);
    ctx.lineTo(x + 17, y + 17);
    ctx.moveTo(x + 3, y + 17);
    ctx.lineTo(x + 17, y + 3);
    ctx.stroke();
  }

  public static drawO(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.lineWidth = 3;
    ctx.strokeStyle = "red";
    ctx.beginPath();
    ctx.arc(x + 10, y + 10, 7, 0, Math.PI * 2);
    ctx.stroke();
  }

  public static drawBoardCells(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    // Drawing vertical lines
    let height = canvas.height;
    if (StoreProvider.getState().boardPosition.y + canvas.height / 20 === 100) {
      this.drawLine(ctx, 0, height, canvas.width, height);
    }
    height -= 20;
    while (height > 0) {
      this.drawLine(ctx, 0, height, canvas.width, height);
      height -= 20;
    }
    if (StoreProvider.getState().boardPosition.y === 0) {
      this.drawLine(ctx, 0, height, canvas.width, height);
    }
    // drawing horizontal lines
    let width = canvas.width;
    if (StoreProvider.getState().boardPosition.x + canvas.width / 20 === 100) {
      this.drawLine(ctx, width, 0, width, canvas.height);
    }
    width -= 20;
    while (width > 0) {
      this.drawLine(ctx, width, 0, width, canvas.height);
      width -= 20;
    }
    if (StoreProvider.getState().boardPosition.x === 0) {
      this.drawLine(ctx, width, 0, width, canvas.height);
    }
  }

  public static drawLine(
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    endX: number,
    endY: number
  ) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }

  public static clearCanvas(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  public static updateCanvasDimensions(
    canvas: HTMLCanvasElement,
    parentDiv: HTMLDivElement,
    canvasWrappingDiv: HTMLDivElement
  ) {
    const width = parentDiv.clientWidth;
    const height = parentDiv.clientHeight;
    const canvasWidth = CanvasUtil.calculateCanvasDimension(width);
    const canvasHeight = CanvasUtil.calculateCanvasDimension(height);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasWrappingDiv.style.width = canvasWidth + "px";
    canvasWrappingDiv.style.height = canvasHeight + "px";
  }

  public static drawAllXOs(ctx: CanvasRenderingContext2D) {
    const position = StoreProvider.getState().boardPosition;
    StoreProvider.getState().gameState.forEach((array, x) => {
      array.forEach((cellState, y) => {
        if (cellState === CellValue.X) {
          DrawUtil.drawX(ctx, (x - position.x) * 20, (y - position.y) * 20);
        } else if (cellState === CellValue.O) {
          DrawUtil.drawO(ctx, (x - position.x) * 20, (y - position.y) * 20);
        }
      });
    });
  }
}

export default DrawUtil;
