class Application {

    private static readonly COLOR_BACKGROUND = "black";
    private static readonly COLOR_SNAKE = "lime";
    private static readonly COLOR_APPLE = "red";

    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;

    private gs: number = 3;
    private tc: number = 15;
    private xv: number = 0;
    private yv: number = 0;
    private trail: Point[] = [];
    private tail: number = 5;
    private headPosition: Point;
    private apple: Point;

    constructor(document: Document) {
        this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
        this.context = <CanvasRenderingContext2D>this.canvas.getContext("2d");

        this.apple = new Point(15,15);
        this.headPosition = new Point(10,10);

        document.addEventListener("keydown", this.keyPush.bind(this));
        setInterval(this.game.bind(this) , 1000 / 15);
    }

    private game(): void {

        this.headPosition.x += this.xv;
        this.headPosition.y += this.yv;
        if (this.headPosition.x < 0) {
            this.headPosition.x = this.tc - 1;
        }
        if (this.headPosition.x > this.tc - 1) {
            this.headPosition.x = 0;
        }
        if (this.headPosition.y < 0) {
            this.headPosition.y = this.tc - 1;
        }
        if (this.headPosition.y > this.tc - 1) {
            this.headPosition.y = 0;
        }
        this.repaintCanvas();

        this.repaintSnake();

        this.checkApple();
    }

    private repaintCanvas(){
        this.context.fillStyle = Application.COLOR_BACKGROUND;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    private repaintSnake() {
        this.context.fillStyle = Application.COLOR_SNAKE;
        for (var i = 0; i < this.trail.length; i++) {
            this.context.fillRect(this.trail[i].x * this.gs, this.trail[i].y * this.gs, this.gs - 2, this.gs - 2);
            if (this.trail[i].x == this.headPosition.x && this.trail[i].y == this.headPosition.y) {
                this.tail = 5;
            }
        }
        this.trail.push(this.headPosition);
        while (this.trail.length > this.tail) {
            this.trail.shift();
        }
    }

    private checkApple(){
        if (this.headPosition.equals(this.apple)) {
            this.tail++;
            this.apple.x = Math.floor(Math.random() * this.tc);
            this.apple.y = Math.floor(Math.random() * this.tc);
        }
        this.context.fillStyle = Application.COLOR_APPLE;
        this.context.fillRect(this.apple.x * this.gs, this.apple.y * this.gs, this.gs - 2, this.gs - 2);
    }

    private keyPush(event: KeyboardEvent): void {
        
        console.log(event);
        console.log(this.context);
        switch (event.keyCode) {
            case 37:
                this.xv = -1; this.yv = 0;
                break;
            case 38:
                this.xv = 0; this.yv = -1;
                break;
            case 39:
                this.xv = 1; this.yv = 0;
                break;
            case 40:
                this.xv = 0; this.yv = 1;
                break;
        }
    }

}

class Point {
    public x: number;
    public y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    public equals(object: any) {
        if (object instanceof Point) {
            let aux = <Point> object;
            return aux.x == this.x && aux.y == this.y;
        }
        return false;
    }
}

class Snake {
    
    private trail: Point[] = [];
    private tail: number = 5;
    private headPosition: Point = new Point(10,10);

}

var app = new Application(document);