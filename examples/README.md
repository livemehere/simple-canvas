# Examples

## Snow effect

![snow-example.gif](imgs%2Fsnow-example.gif)

```js
const canvas = document.querySelector('canvas');
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
```

## Fireworks

![firework.gif](imgs%2Ffirework.gif)

```ts
const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const canvasManager = new CanvasManager({
    canvas:canvas,
    width: 1000,
    height: 1000,
    bgColor: 'rgba(0,0,0,0.1)',
})

function createFirecracker(position:Position, hue:number){

    const flash = new Rect<{
        opacity: number;
    }>({
        position:{
            x:0,
            y:0,
        },
        width: canvasManager.width,
        height: canvasManager.height,
        fillColor: `rgba(255,255,255,0.2)`,
    })
    canvasManager.addElement(flash);

    flash.state = {
        opacity: 0.05,
    }

    flash.update = function() {
        this.state.opacity -= 0.01;
        this.fillColor = `rgba(255,255,255,${this.state.opacity})`;
        if(this.state.opacity <= 0){
            canvasManager.removeElement(this);
        }
    }

    for(let i=0; i<400;i++){
        const circle = new Circle<{
            angle: number;
            speed: number;
            friction: number;
            dx: number;
            dy: number;
            velocity: number;
            opacity: number;
        }>({
            position,
            radius: 1,
            fillColor: `hsl(${hue},100%,50%)`,
        })
        canvasManager.addElement(circle);

        const angle = Math.PI/180 * randomBetween(0,360);
        const friction = 0.99;
        const speed = randomBetween(1,5);
        const dx = Math.cos(angle) * speed;
        const dy = Math.sin(angle) * speed;
        const velocity = 0.09;
        const opacity = randomBetween(0.5,1);

        circle.state = {
            angle,
            speed,
            friction,
            dx,
            dy,
            velocity,
            opacity,
        }

        circle.update = function() {
            this.state.opacity -= 0.01;
            this.fillColor = `hsla(${hue},100%,50%,${this.state.opacity})`;
            this.state.dy += this.state.velocity;

            this.state.dx *= this.state.friction;
            this.state.dy *= this.state.friction;
            this.position.x += this.state.dx;
            this.position.y += this.state.dy;

            if(this.state.opacity <= 0){
                this.remove();
            }
        }
    }
}
function tails(){
    for(let i=0;i< 100;i++){
        const hue = randomBetween(0,360);
        const circle = new Circle<{
            dy: number;
            friction: number;
            delay: number;
        }>({
            position:{
                x:randomBetween(0,canvasManager.width),
                y:canvasManager.height + 10,
            },
            radius: 1,
            fillColor:  `hsl(${hue},100%,50%)`,
        })

        canvasManager.addElement(circle);

        const delay = randomBetween(0,3000);
        const dy = canvasManager.height * randomBetween(0.01,0.015)
        const friction = 0.985;
        circle.state = {
            dy,
            friction,
            delay
        }

        circle.update = function(){
            if(this.state.delay > 0){
                this.state.delay -= 1;
                return;
            }
            this.state.dy *= this.state.friction;
            this.position.y -= this.state.dy;

            if(this.state.dy < 0.7){
                createFirecracker(this.position,hue)
                this.remove();
            }
        }
    }
}
tails();
```