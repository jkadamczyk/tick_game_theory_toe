import { BOARD_SIZE } from "./Settings";

class CanvasUtil {
  public static calculateCanvasDimension(dimension: number) {
    const wholeSize = BOARD_SIZE * 20;
    const fitSize = Math.floor((dimension * 0.8) / 20) * 20;
    return wholeSize < fitSize ? wholeSize : fitSize;
  }
}

export default CanvasUtil;