# Simple Canvas

## What is this?

This is a HTML5 canvas library that is designed to be simple and easy to use.   
no more complex settings, just create instance and start drawing!   

## Usage

### Basic Example

example for drawing a rectangle that moves to the right and rotating dash line.

![basic-example.gif](docs%2Fimgs%2Fbasic-example.gif)

```js
const canvas = document.querySelector('canvas');
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
```

### Element Mouse event 

- 4 types of mouse event are supported.
  - onMouseOver
  - onMouseLeave
  - onClick
  - onMousePressed

![element-click-example.gif](docs%2Fimgs%2Felement-click-example.gif)

```js
// ... 
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
```

### State

Element has own state property. See the example below.

```ts
class CanvasElement<T extends {} = {}>{
    state: T;
    // ...
}

const rect = new Rect<{ speed:number; }>({
    // ...
})

rect.state.speed = 10;

rect.update = function(){
    this.position.x += this.state.speed;
}
```
