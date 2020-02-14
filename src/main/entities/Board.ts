import { Snake } from "./Snake";
import { Point } from "../common/Point";
import { Direction } from "../common/Direction";
import { Constants } from "../utils/Constants";

export class Board {
    

  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;

  private squareSize: number = 20;
  private size: number = 20;
  private snake: Snake;
  private apple: Point;
  private direction: Direction = Direction.None;

  constructor(canvas: HTMLCanvasElement) {
    console.log("Application created!");
    this.canvas = canvas;
    this.context = <CanvasRenderingContext2D>this.canvas.getContext('2d');

    this.apple = new Point(15, 15);
    this.snake = new Snake();

  }

  public update(){
    this.snake.move(this.direction, this.size);
    this.repaintBoard();
    this.checkApple();
  }

  private repaintBoard(): void {
    this.repaintCanvas();
    this.repaintSnake();
  }

  private repaintCanvas() {
    this.context.fillStyle = Constants.COLOR_BACKGROUND;
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private repaintSnake() {
    this.context.fillStyle = Constants.COLOR_SNAKE;
    for (var i = 0; i < this.snake.trail.length; i++) {
      this.context.fillRect(
        this.snake.trail[i].x * this.squareSize,
        this.snake.trail[i].y * this.squareSize,
        this.squareSize - 2,
        this.squareSize - 2
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
    this.context.fillStyle = Constants.COLOR_APPLE;
    this.context.fillRect(
      this.apple.x * this.squareSize,
      this.apple.y * this.squareSize,
      this.squareSize - 2,
      this.squareSize - 2
    );
  }

  private generateRandomApple() {
    this.apple.x = Math.floor(Math.random() * this.size);
    this.apple.y = Math.floor(Math.random() * this.size);
  }

  public keyPush(event: KeyboardEvent): void {
    this.direction = event.keyCode;
  }
  
}