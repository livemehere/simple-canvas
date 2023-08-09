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
    currentMouseTargetElement?: CanvasElement;

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

        this.elements = []; // 오름차순

        this.canvas.addEventListener('mousemove', this._setMousePosition.bind(this));
        this.canvas.addEventListener('mousedown', this._handleMouseDown.bind(this));
        this.canvas.addEventListener('mouseup', this._handleMouseUp.bind(this));
        this.animate();
    }


    draw() {
        this.elements.sort((a, b) => a.zIndex - b.zIndex); // 오름차순
        this.elements.forEach((element) => {
            /* 엔트리로서, 캔버스 상태에 접근할 수 있도록 주입 */
            element.canvasManager = this;

            /* 마우스와 엘리먼트 상태를 검사하여 callback 실행 */
            this._handleCurrentMouseTargetEvent(element);

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

    /* Element 들 mouse 이벤트 */
    private _handleMouseUp() {
        this.isMousePressed = false;
        this.currentMouseTargetElement = undefined;
    }

    private _handleMouseDown() {
        this.isMousePressed = true;
        if (this.currentMouseTargetElement?.onClick) {
            this.currentMouseTargetElement.onClick({
                type: 'click',
                target: this.currentMouseTargetElement,
                mousePosition: this.mouse,
                elementPosition: this.currentMouseTargetElement.position,
            })
        }
    }

    private _setMousePosition(e: MouseEvent) {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        }
        this.currentMouseTargetElement = undefined;
        /* 마우스가 움직일 때 마다 가상 최상위의 element 를 currentTarget 으로 세팅함 */
        for (let i =0; i < this.elements.length; i++) {
            const element = this.elements[i];
            if (this._isCollideWithMouse(element)) {
                this._handleElementMouseLeave(element);
                this.currentMouseTargetElement = element;
            }
        }
    }

    private _handleElementMouseLeave(currentElement: CanvasElement) {
        const targetElements = this.elements.filter(element => element._isMouseEnter && element.onMouseLeave && currentElement.id !== element.id);
        targetElements.forEach(element => {
            element.onMouseLeave?.({
                type: 'mouseleave',
                target: element,
                mousePosition: this.mouse,
                elementPosition: element.position,
            })
            element._isMouseEnter = false;
        })
    }

    private _handleCurrentMouseTargetEvent(element: CanvasElement) {
        if(!this.currentMouseTargetElement || this.currentMouseTargetElement.id !== element.id) return;
        /* element === this.currentMouseTargetElement */
        if (element.onMouseOver) {
            element._isMouseEnter = true;
            element.onMouseOver({
                type: 'mouseover',
                target: element,
                mousePosition: this.mouse,
                elementPosition: element.position,
            })
        }

        if (element.onMousePressed && this.isMousePressed) {
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