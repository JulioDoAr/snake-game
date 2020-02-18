export class Point {
    public x: number;
    public y: number;
  
    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }
  
    public equals(object: any) {
      if (object instanceof Point) {
        let aux = <Point>object;
        return aux.x == this.x && aux.y == this.y;
      }
      return false;
    }
  
    public clone(): Point {
      return new Point(this.x, this.y);
    }
  }