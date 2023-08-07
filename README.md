# Simple Canvas

## What is this?

This is a HTML5 canvas library that is designed to be simple and easy to use.   
no more complex settings, just create instance and start drawing!   

## Usage

### Basic

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

### Element

#### clone

```js
// ...
rect.onClick = function(e){
    const newRect = rect.clone({widthEvent:true,widthUpdate:true});
    canvasManager.addElement(newRect);
    newRect.position.x = e.mousePosition.x - newRect.width/2;
    newRect.position.y = e.mousePosition.y - newRect.height/2;
}
```

## Mouse Event Example

### For Element

```js
// ... 
rect.onMouseOver = function(e){
    this.fillColor = 'blue'
}

rect.onMouseLeave = function(e){
    this.fillColor = 'red'
}

rect.onClick = function(e){
    this.width += 10;
    this.height += 10;
}

rect.onMousePressed = function(e){
    this.fillColor = 'yellow';
    rect.position.x = e.mousePosition.x - rect.width/2;
    rect.position.y = e.mousePosition.y - rect.height/2;
}
```

### For Canvas

```js
// ...
canvasManager.onMousePressed = function (e) {
    console.log('press', e);
}

canvasManager.onMouseReleased = function (e) {
    console.log('release', e);
}

canvasManager.onMouseMove = function (e) {
    console.log('move', e);
}

canvasManager.onClick = function (e) {
    console.log('click', e);
}
```