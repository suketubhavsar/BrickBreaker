// / <reference path="canvas.ts" />
// / <reference path="common.ts" />
// / <reference path="Brick.ts" />
// / <reference path="paddle.ts" />
// / <reference path="Ball.ts" />
// / <reference path="ScoreBoard.ts" />
/// <reference path="Game.ts" />

let canvas: HTMLCanvasElement;
let game: Game;

window.onload = function() {
  canvas = document.getElementById("canvas") as HTMLCanvasElement;
  game = new Game(canvas);
  window.requestAnimationFrame(() => draw());
};

function draw() {
  if (game.gameState === GameState.Ended) {
    if (game.allBricks.length <= 0) {
      alert("You won!");
    } else {
      alert("Game over!");
    }
    game = new Game(canvas);
  }

  game.drawGame();
  game.move();

  window.requestAnimationFrame(() => draw());
}
