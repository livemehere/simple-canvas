import {CanvasElement} from "./elements/CanvasElement";
import {Position} from "./types/element";

type CanvasManagerProps = {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;
    bgColor?: string;
}

export class CanvasManager {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    width: number;
    height: number;
    bgColor: string;
    dpi: number = window.devicePixelRatio || 1;
    elements: CanvasElement[];
    mouse: Position = {x: 0, y: 0};
    isMousePressed: boolean = false;

    constructor({canvas, width, height, bgColor}: CanvasManagerProps) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.bgColor = bgColor ?? 'transparent';
        this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        this.canvas.width = width * this.dpi;
        this.canvas.height = height * this.dpi;
        this.canvas.style.width = `${width}px`;
        this.canvas.style.height = `${height}px`;
        this.ctx.scale(this.dpi, this.dpi);

        this.elements = [];

        this.canvas.addEventListener('mousemove', this._setMousePosition.bind(this));
        this.canvas.addEventListener('mousedown', () => {
            this.isMousePressed = true;
            for(const element of this.elements) {
                if (element.onClick && this._isCollideWithMouse(element)) {
                    console.log('click!')
                    element.onClick({
                        type: 'click',
                        target: element,
                        mousePosition: this.mouse,
                        elementPosition: element.position,
                    })
                }
                break;
            }
        })
        this.canvas.addEventListener('mouseup', () => {
            this.isMousePressed = false;
        });
        this.animate();
    }

    draw() {
        this.elements.sort((a, b) => a.zIndex - b.zIndex);
        this.elements.forEach((element) => {
            /* 엔트리로서, 캔버스 상태에 접근할 수 있도록 주입 */
            element.canvasManager = this;

            /* 마우스와 엘리먼트 상태를 검사하여 callback 실행 */
            this._checkStatusWithMouse(element);

            element.update?.();
            element.draw(this.ctx);
        })
    }

    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.bgColor;
        this.ctx.fillRect(0, 0, this.width, this.height);

        requestAnimationFrame(this.animate.bind(this));
        this.draw();
    }

    _setMousePosition(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
    }

    addElement(element: CanvasElement) {
        this.elements.push(element);
    }

    removeElement(element: CanvasElement) {
        this.elements = this.elements.filter((el) => el.id !== element.id);
    }

    clearElements() {
        this.elements = [];
    }

    getElementById(id: string) {
        return this.elements.find((el) => el.id === id);
    }

    getElementsByClassName(className: string) {
        return this.elements.filter((el) => el.className === className);
    }

    private _checkStatusWithMouse(element: CanvasElement) {
        if (element.onMouseOver && this._isCollideWithMouse(element)) {
            element._isMouseEnter = true;
            element.onMouseOver({
                type: 'mouseover',
                target: element,
                mousePosition: this.mouse,
                elementPosition: element.position,
            })
        }
        if (element.onMouseLeave && element._isMouseEnter && !this._isCollideWithMouse(element)) {
            element.onMouseLeave({
                type: 'mouseleave',
                target: element,
                mousePosition: this.mouse,
                elementPosition: element.position,
            })
            element._isMouseEnter = false;
        }
        if (element.onMousePressed && this.isMousePressed && this._isCollideWithMouse(element)) {
            console.log('mousepressed')
            element.onMousePressed({
                type: 'mousepressed',
                target: element,
                mousePosition: this.mouse,
                elementPosition: element.position,
            })
        }
    }

    private _isCollideWithMouse(element: CanvasElement) {
        return (
            element.position.x <= this.mouse.x &&
            element.position.x + element.width >= this.mouse.x &&
            element.position.y <= this.mouse.y &&
            element.position.y + element.height >= this.mouse.y
        )
    }

}