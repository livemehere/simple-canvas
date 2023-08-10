import {CanvasElement, CanvasElementProps} from "./CanvasElement";

type CanvasCircleProps = {
    radius: number;
} & Omit<CanvasElementProps,'width'|'height'>

export class Circle<T extends {} = {}> extends CanvasElement<T> {
    radius: number;
    constructor(props:CanvasCircleProps) {
        super({...props, width: props.radius*2, height: props.radius*2});
        this.type = 'circle';
        this.radius = (this as any).width;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.stroke?.color ?? 'transparent';
        ctx.lineWidth = this.stroke?.width ?? 0;
        ctx.setLineDash(this.stroke?.dash ?? []);
        ctx.lineDashOffset = this.stroke?.dashOffset ?? 0;
        ctx.beginPath();
        ctx.arc(this.position.x,this.position.y,this.radius,0,Math.PI*2);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }
}