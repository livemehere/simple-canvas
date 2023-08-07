import {CanvasElement} from "../elements/CanvasElement";

export type CanvasElementType = 'rect' | 'circle' | 'text' | 'image' | 'line' | 'polygon';

export type Position = {
    x: number;
    y: number;
}

export type Stroke = {
    color: string;
    width: number;
    dash?: number[];
    dashOffset?: number;
}


export type CloneOption = {
    widthEvent?: boolean;
    widthUpdate?: boolean;
}