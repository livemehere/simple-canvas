import {CanvasManager} from "../CanvasManager";
import {CanvasElementType, Position, Stroke} from "../types/element";
import { CanvasEventListener, CanvasMouseEvent} from "../types/event";


export type CanvasElementProps = {
    position: Position;
    width: number;
    height: number;
    fillColor: string;
    stroke?: Stroke
    id?: string;
    className?: string;
    zIndex?: number;
}

export class CanvasElement {
    canvasManager!: CanvasManager; // CanvasManager 에서 draw 직전 반드시 주입됩니다.
    type!:CanvasElementType // 새로운 엘리먼트 클래스를 만들때 반드시 생성자에서 type 을 지정해야 합니다.
    position: Position;
    id: string;
    className?: string;
    width: number;
    height: number;
    fillColor: string;
    stroke?: Stroke;
    zIndex: number;
    update?: () => void;

    /* 마우스 이벤트 */
    _isMouseEnter: boolean = false;
    onMouseOver?: CanvasEventListener<CanvasMouseEvent>;
    onMouseLeave?: CanvasEventListener<CanvasMouseEvent>;
    onClick?: CanvasEventListener<CanvasMouseEvent>;
    onMousePressed?: CanvasEventListener<CanvasMouseEvent>;

    constructor({zIndex,position, width, height, fillColor, stroke, id, className}: CanvasElementProps) {
        this.id = id ?? Math.random().toString(36).slice(2)
        this.className = className;
        this.position = position;
        this.width = width;
        this.height = height;
        this.fillColor = fillColor;
        this.stroke = stroke;
        this.zIndex = zIndex ?? 0;
    }

    draw(ctx: CanvasRenderingContext2D) {
        throw new Error('You have to implement the method draw!');
    }

}