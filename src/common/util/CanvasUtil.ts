class CanvasUtil {
  public static calculateCanvasDimension(dimension: number) {
    return Math.floor((dimension * 0.8) / 20) * 20;
  }
}

export default CanvasUtil;