import {CanvasManager} from "./lib/CanvasManager";
import {Rect} from "./lib/elements/Rect";
import {randomBetween} from "./lib/util/math";

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const canvasManager = new CanvasManager({
    canvas:canvas,
    width: 500,
    height: 500,
    bgColor: 'black',
})

function createRect(position:{x:number,y:number},zIndex:number){
    const rect = new Rect({
        position,
        width: 100,
        height: 100,
        fillColor: 'red',
        stroke:{
            color: 'white',
            width: 5,
            dash: [10,5],
            dashOffset: 1,
        },
        zIndex
    })
    canvasManager.addElement(rect);

    rect.update = function(){
        this.position.x += 0.1;
        if(this.stroke?.dashOffset){
            this.stroke.dashOffset += 0.1;
        }
    }

    rect.onMousePressed = function(e){
        this.position.x = e.mousePosition.x - this.width/2;
        this.position.y = e.mousePosition.y - this.height/2;
    }

    rect.onMouseOver = function(e){
        this.fillColor = 'blue'
    }

    rect.onMouseLeave = function(e){
        this.fillColor = 'red'
    }

    rect.onClick = function(e){
        console.log('click!')
    }

}

for(let i=0; i<10; i++){
    createRect({
        x: randomBetween(0,canvasManager.width),
        y: randomBetween(0,canvasManager.height),
    },i)
}

console.log(canvasManager.elements)

