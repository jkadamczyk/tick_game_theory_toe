import { StoreProvider } from "../../StoreProvider";
import { CommonUtil } from "./CommonUtil";

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
    let height = canvas.height - 20;
    while (height > 0) {
      this.drawLine(ctx, 0, height, canvas.width, height);
      height -= 20;
    }
    if (StoreProvider.getState().boardPosition.y === 0) {
      this.drawLine(ctx, 0, height, canvas.width, height);
    }
    // drawing horizontal lines
    let width = canvas.width - 20;
    while (width > 0) {
      this.drawLine(ctx, width, 0, width, canvas.height);
      width -= 20;
    }
    if (StoreProvider.getState().boardPosition.y === 0) {
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

  public static updateCanvasDimensions(canvas: HTMLCanvasElement, parentDiv: HTMLDivElement, canvasWrappingDiv: HTMLDivElement) {
    const width = parentDiv.clientWidth;
    const height = parentDiv.clientHeight;
    const canvasWidth = CommonUtil.calculateCanvasDimension(width);
    const canvasHeight = CommonUtil.calculateCanvasDimension(height);
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    canvasWrappingDiv.style.width = canvasWidth + "px";
    canvasWrappingDiv.style.height = canvasHeight + "px";
  }
}

export default DrawUtil;
