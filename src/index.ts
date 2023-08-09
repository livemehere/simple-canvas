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
    rect.onMousePressed = function(e){
        this.position.x = e.mousePosition.x - this.width/2;
        this.position.y = e.mousePosition.y - this.height/2;
    }
    rect.onMouseOver = function(e){
        this.fillColor = '#ffa1a1'
    }
    rect.onMouseLeave = function(e){
        this.fillColor = 'red'
    }
    rect.onClick = function(e){
        if(this.stroke){
            this.stroke.dash = []
        }
    }
}

for(let i=0; i<1; i++){
    createRect({
        x: canvasManager.width/2 - 50,
        y: canvasManager.height/2 - 50,
    },i)
}

console.log(canvasManager.elements)

