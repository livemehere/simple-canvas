import {CanvasManager} from "../lib/CanvasManager";
import {Rect} from "../lib/elements/Rect";
import {randomBetween} from "../lib/util/math";

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const canvasManager = new CanvasManager({
    canvas:canvas,
    width: 1000,
    height: 1000,
    bgColor: 'black',
})

for(let i=0; i<100; i++){
    const rect = new Rect({
        position:{
            y:randomBetween(0,-10),
            x:randomBetween(0,canvasManager.width)
        },
        width: 4,
        height: 4,
        fillColor: 'white',
    })
    canvasManager.addElement(rect);
    const speed = randomBetween(1,10);
    rect.update = function(){
        this.position.y += speed;
        if(this.position.y > canvasManager.height){
            this.position.y = 0;
        }
    }
}

