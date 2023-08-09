import {CanvasElement, CanvasElementProps} from "./CanvasElement";
import {CloneOption} from "../types/element";

export class Rect extends CanvasElement {
    constructor(props:CanvasElementProps) {
        super(props);
        this.type = 'rect';
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.fillColor;
        ctx.strokeStyle = this.stroke?.color ?? 'transparent';
        ctx.lineWidth = this.stroke?.width ?? 0;
        ctx.setLineDash(this.stroke?.dash ?? []);
        ctx.lineDashOffset = this.stroke?.dashOffset ?? 0;
        ctx.beginPath();
        ctx.rect(this.position.x,this.position.y,this.width,this.height);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

}