class DrawUtil {
    public static drawX(ctx: CanvasRenderingContext2D, x: number, y: number) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(x + 3, y + 3);
        ctx.lineTo(x + 17, y + 17);
        ctx.moveTo(x + 3, y + 17);
        ctx.lineTo(x + 17, y + 3);
        ctx.stroke();
    }

    public static drawO(ctx: CanvasRenderingContext2D, x:number, y:number) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = 'red';
        ctx.beginPath()
        ctx.arc(x + 10, y + 10, 7, 0, Math.PI * 2);
        ctx.stroke()
    }
}

export default DrawUtil;