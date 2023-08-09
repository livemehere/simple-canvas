import {CanvasManager} from "../lib/CanvasManager";
import {Rect} from "../lib/elements/Rect";
import {randomBetween} from "../lib/util/math";
import {Circle} from "../lib/elements/Circle";

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const canvasManager = new CanvasManager({
    canvas:canvas,
    width: 1000,
    height: 1000,
    bgColor: 'black',
})


const circle =  new Circle({
    position: {x: 100, y: 100},
    radius:50,
    fillColor: 'white',
})

circle.update = function(){
    this.position.x += 1;
    this.position.y += 1;
}

canvasManager.addElement(circle);