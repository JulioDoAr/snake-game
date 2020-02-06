import {Snake} from './entities/Snake';
import {Point} from './common/Point';
import {Direction} from './common/Direction';

class Application {
  private static readonly COLOR_BACKGROUND = 'black';
  private static readonly COLOR_SNAKE = 'lime';
  private static readonly COLOR_APPLE = 'red';

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private gs: number = 20;
  private boardSize: number = 20;
  private snake: Snake;
  private apple: Point;
  private direction: Direction = Direction.None;

  constructor(document: Document) {
    console.log("Application created!");
    this.canvas = <HTMLCanvasElement>document.getElementById('canvas');
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    this.apple = new Point(15, 15);
    this.snake = new Snake();

    document.addEventListener('keydown', this.keyPush.bind(this));
    setInterval(this.game.bind(this), 1000 / 15);
  }

  private game(): void {
    this.snake.move(this.direction, this.boardSize);
    this.repaintCanvas();

    this.repaintSnake();

    this.checkApple();
  }

  private repaintCanvas() {
    this.context.fillStyle = Application.COLOR_BACKGROUND;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private repaintSnake() {
    this.context.fillStyle = Application.COLOR_SNAKE;
    for (var i = 0; i < this.snake.trail.length; i++) {
      this.context.fillRect(
        this.snake.trail[i].x * this.gs,
        this.snake.trail[i].y * this.gs,
        this.gs - 2,
        this.gs - 2
      );
      if (this.snake.trail[i].equals(this.snake.headPosition)) {
        this.snake.tail = 5;
      }
    }
    this.snake.trail.push(this.snake.headPosition.clone());
    while (this.snake.trail.length > this.snake.tail) {
      this.snake.trail.shift();
    }
  }
  private checkApple() {
    if (this.snake.headPosition.equals(this.apple)) {
      this.snake.grow();
      this.generateRandomApple();
    }
    this.context.fillStyle = Application.COLOR_APPLE;
    this.context.fillRect(
      this.apple.x * this.gs,
      this.apple.y * this.gs,
      this.gs - 2,
      this.gs - 2
    );
  }

  private generateRandomApple() {
    this.apple.x = Math.floor(Math.random() * this.boardSize);
    this.apple.y = Math.floor(Math.random() * this.boardSize);
  }

  private keyPush(event: KeyboardEvent): void {
    this.direction = event.keyCode;
  }
  
}

console.log("Application.js loaded!");
new Application(document);