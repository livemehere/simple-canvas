import {CanvasElement} from "../elements/CanvasElement";
import {Position} from "./element";

export type CanvasEventType = CanvasMouseEventType;
export type CanvasMouseEventType = 'click' | 'mouseup' | 'mousemove' | 'mouseleave' | 'mouseover' |'mousepressed';

export type CanvasEvent =  CanvasBaseEvent|CanvasMouseEvent;

export type CanvasEventListener<T extends  CanvasEvent = CanvasEvent> = (event: T) => void;

/* 공통 이벤트 */
export type CanvasBaseEvent = {
    type: CanvasEventType;
    target: CanvasElement;
    elementPosition: Position;
}

/* 마우스 이벤트 */
export type CanvasMouseEvent = {
    mousePosition:Position;
} & CanvasBaseEvent;