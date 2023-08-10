import {CanvasManager} from "../lib/CanvasManager";
import {Circle} from "../lib/elements/Circle";
import {randomBetween} from "../lib/util/math";
import {Position} from "../lib/types/element";
import {Rect} from "../lib/elements/Rect";

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const canvasManager = new CanvasManager({
    canvas:canvas,
    width: 1000,
    height: 1000,
    bgColor: 'black',
})

for(let i=0; i<100; i++){
    const rect = new Rect<{
        speed:number;
    }>({
        position:{
            y:randomBetween(0,-10),
            x:randomBetween(0,canvasManager.width)
        },
        width: 4,
        height: 4,
        fillColor: 'white',
    })
    canvasManager.addElement(rect);

    rect.state.speed = randomBetween(1,10);

    rect.update = function(){
        this.position.y += this.state.speed;
        if(this.position.y > canvasManager.height){
            this.position.y = 0;
        }
    }
}