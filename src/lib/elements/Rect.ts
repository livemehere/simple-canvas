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

    clone(cloneOption?:CloneOption){
        const cloned = new Rect({
            position: {
                x: this.position.x,
                y: this.position.y,
            },
            width: this.width,
            height: this.height,
            fillColor: this.fillColor,
            stroke: {
                color: this.stroke?.color ?? 'transparent',
                width: this.stroke?.width ?? 0,
                dash: this.stroke?.dash ?? [],
                dashOffset: this.stroke?.dashOffset ?? 0,
            },
            className: this.className,
        });

        if(cloneOption?.widthEvent){
            cloned.onMouseOver = this.onMouseOver?.bind(cloned);
            cloned.onMouseLeave = this.onMouseLeave?.bind(cloned);
            cloned.onClick = this.onClick?.bind(cloned);
            cloned.onMousePressed = this.onMousePressed?.bind(cloned);
        }

        if(cloneOption?.widthUpdate){
            cloned.update = this.update?.bind(cloned);
        }

        return cloned;
    }

}