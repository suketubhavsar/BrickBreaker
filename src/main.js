"use strict";
// / <reference path="canvas.ts" />
// / <reference path="common.ts" />
// / <reference path="Brick.ts" />
// / <reference path="paddle.ts" />
// / <reference path="Ball.ts" />
// / <reference path="ScoreBoard.ts" />
/// <reference path="Game.ts" />
var canvas;
var game;
window.onload = function () {
    canvas = document.getElementById("canvas");
    game = new Game(canvas);
    window.requestAnimationFrame(function () { return draw(); });
};
function draw() {
    if (game.gameState === GameState.Ended) {
        if (game.allBricks.length <= 0) {
            alert("You won!");
        }
        else {
            alert("Game over!");
        }
        game = new Game(canvas);
    }
    game.drawGame();
    game.move();
    window.requestAnimationFrame(function () { return draw(); });
}
//# sourceMappingURL=main.js.map