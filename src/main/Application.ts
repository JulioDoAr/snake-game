import { Board } from './entities/Board';

class Application {

  private board: Board;

  constructor(document: Document) {
    console.log("Application created!");

    this.board = new Board(<HTMLCanvasElement>document.getElementById('canvas'));

    document.addEventListener('keydown', this.board.keyPush.bind(this.board));
    setInterval(this.board.update.bind(this.board), 1000 / 15);
  }
  
}

new Application(document);