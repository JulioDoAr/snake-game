import {Point} from '../common/Point';
import {Direction} from '../common/Direction';

export class Snake {
    public trail: Point[] = [];
    public tail: number = 5;
    public headPosition: Point = new Point(10, 10);
  
    constructor() {}
  
    public grow(): void {
      this.tail++;
    }
  
    public move(direction: Direction, boardSize: number): void {
      switch (direction) {
        case Direction.N:
          this.headPosition.y--;
          break;
        case Direction.S:
          this.headPosition.y++;
          break;
        case Direction.E:
          this.headPosition.x++;
          break;
        case Direction.W:
          this.headPosition.x--;
          break;
      }
  
      if (this.headPosition.x < 0) {
        this.headPosition.x = boardSize - 1;
      }
      if (this.headPosition.x > boardSize - 1) {
        this.headPosition.x = 0;
      }
      if (this.headPosition.y < 0) {
        this.headPosition.y = boardSize - 1;
      }
      if (this.headPosition.y > boardSize - 1) {
        this.headPosition.y = 0;
      }
    }
  }
  