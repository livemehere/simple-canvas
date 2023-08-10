import {CanvasManager} from "../lib/CanvasManager";
import {Circle} from "../lib/elements/Circle";
import {randomBetween} from "../lib/util/math";

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const canvasManager = new CanvasManager({
    canvas:canvas,
    width: 1000,
    height: 1000,
    bgColor: 'black',
})

for(let i=0; i< 100;i++){
    const circle = new Circle<{
        dy:number,
        friction:number
    }>({
        position:{
            x:randomBetween(0, canvasManager.width),
            y:canvasManager.height
        },
        radius:1,
        fillColor:'white'
    })
    canvasManager.addElement(circle);

    let dy = randomBetween(1,10);
    const friction = 0.98;
    circle.state = {
        dy,
        friction
    }
    circle.update = function(){
        this.state.dy *= this.state.friction;
        this.position.y -= this.state.dy;
        if(this.state.dy < 0.1){
            this.remove();
        }
    }

}