import {CanvasManager} from "./lib/CanvasManager";
import {Rect} from "./lib/elements/Rect";
import {randomBetween} from "./lib/util/math";

const canvas = document.querySelector('canvas')!;
const canvasManager = new CanvasManager({
    canvas,
    width: 500,
    height: 500,
    bgColor: 'black',
});

const rect = new Rect({
    position: {x: 100, y: 100},
    width: 100,
    height: 100,
    fillColor: 'red',
    stroke:{
        color: 'white',
        width: 5,
        dash: [10,5],
        dashOffset: 1,
    }
})
canvasManager.addElement(rect);

rect.update = function(){
    this.position.x += 0.1;
    if(this.stroke?.dashOffset){
        this.stroke.dashOffset += 0.1;
    }
}