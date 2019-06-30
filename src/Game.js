"use strict";
/// <reference path="common.ts" />
/// <reference path="Brick.ts" />
/// <reference path="paddle.ts" />
/// <reference path="Ball.ts" />
/// <reference path="ScoreBoard.ts" />
/// <reference path="canvas.ts" />
/// <reference path="Bonus.ts" />
/// <reference path="ammunition.ts" />
var GameState;
(function (GameState) {
    GameState[GameState["New"] = 0] = "New";
    GameState[GameState["Playing"] = 1] = "Playing";
    GameState[GameState["Paused"] = 2] = "Paused";
    GameState[GameState["Ended"] = 3] = "Ended";
})(GameState || (GameState = {}));
var Game = /** @class */ (function () {
    /**
     *
     */
    function Game(_cvas) {
        var _this = this;
        this._cvas = _cvas;
        this.mycanvas = new myCanvas(_cvas);
        this.mycanvas.canvas.onclick = function (e) {
            _this.canvas_onclick(e);
        };
        this.mycanvas.canvas.onkeydown = function (e) {
            _this.canvas_onkeydown(e);
        };
        this.mycanvas.canvas.onmousemove = function (e) {
            _this.canvas_onmousemove(e);
        };
        this.allBricks = new Array();
        this.allBalls = new Array();
        this.paddle = new Paddle(new Point(5, canvas.height - 10));
        this.allBonuses = new Array();
        this.allAmmos = new Array();
        this.scoreBoard = new ScoreBoard(new Point(0, 0), new Size(this.mycanvas.width, 40));
        this.gameState = GameState.New;
        this.loadNewGame();
    }
    //#region core
    Game.prototype.loadNewGame = function () {
        this.allBricks = new Array();
        this.allBalls = new Array();
        this.allBonuses = new Array();
        this.allAmmos = new Array();
        this.scoreBoard = new ScoreBoard(new Point(0, 0), new Size(this.mycanvas.width, 40));
        this.paddle = new Paddle(new Point(5, canvas.height - 10));
        this.allBalls.push(new Ball(new Point(30, canvas.height - 15)));
        var pos = new Point(5, 45);
        var colSize = 30;
        var rowSize = 16;
        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 20; col++) {
                var br = void 0;
                var bn = new Bonus(pos);
                switch (col % 11) {
                    case 0:
                        br = new Brick(pos.addXY(col * colSize, row * rowSize));
                        bn = new ExtraLifeBonus(br.Position, br.Size);
                        break;
                    case 1:
                        br = new SandBrick(pos.addXY(col * colSize, row * rowSize));
                        bn = new FireBallBonus(br.Position, br.Size);
                        break;
                    case 2:
                        br = new SolidBrick(pos.addXY(col * colSize, row * rowSize));
                        bn = new LargePaddleBonus(br.Position, br.Size);
                        break;
                    case 3:
                        br = new ConcreteBrick(pos.addXY(col * colSize, row * rowSize));
                        bn = new ShortPaddleBonus(br.Position, br.Size);
                        break;
                    case 4:
                        br = new Brick(pos.addXY(col * colSize, row * rowSize));
                        bn = new ExtraPointBonus(br.Position, br.Size);
                        break;
                    case 5:
                        br = new Brick(pos.addXY(col * colSize, row * rowSize));
                        bn = new DoublePointBonus(br.Position, br.Size);
                        break;
                    case 6:
                        br = new Brick(pos.addXY(col * colSize, row * rowSize));
                        bn = new MultiBallBonus(br.Position, br.Size);
                        break;
                    case 7:
                        br = new Brick(pos.addXY(col * colSize, row * rowSize));
                        bn = new PaddleGunsBonus(br.Position, br.Size);
                        break;
                    case 8:
                        br = new Brick(pos.addXY(col * colSize, row * rowSize));
                        bn = new PaddleCannonBonus(br.Position, br.Size);
                        break;
                    case 9:
                        br = new Brick(pos.addXY(col * colSize, row * rowSize));
                        bn = new FastBallBonus(br.Position, br.Size);
                        break;
                    case 10:
                        br = new Brick(pos.addXY(col * colSize, row * rowSize));
                        bn = new SlowBallBonus(br.Position, br.Size);
                        break;
                    default:
                        br = new Brick(pos.addXY(col * colSize, row * rowSize));
                        bn = new ExtraLifeBonus(br.Position, br.Size);
                        break;
                }
                this.allBonuses.push(bn);
                br.bonus = bn;
                this.allBricks.push(br);
            }
        }
        this.allBricks = this.allBricks.reverse();
    };
    Game.prototype.move = function () {
        if (this.gameState === GameState.Playing) {
            for (var iB = this.allBalls.length - 1; iB >= 0; iB--) {
                this.allBalls[iB].move();
                this.detectBallCollision(this.allBalls[iB]);
            }
            if (this.scoreBoard.lives <= 0) {
                this.gameState = GameState.Ended;
            }
            for (var iB = this.allBonuses.length - 1; iB >= 0; iB--) {
                if (this.allBonuses[iB].isHit) {
                    this.allBonuses[iB].move();
                    this.detectBonusCollision(this.allBonuses[iB]);
                }
            }
            for (var iB = this.allAmmos.length - 1; iB >= 0; iB--) {
                this.allAmmos[iB].move();
                this.detectAmmoCollision(this.allAmmos[iB]);
            }
        }
    };
    Game.prototype.drawGame = function () {
        var _this = this;
        this.mycanvas.clearCanvas();
        this.mycanvas.drawScoreBoard(this.scoreBoard);
        this.mycanvas.drawBorder("#FFFFFF", 4, new Point(0, this.scoreBoard.size.Height), new Size(this.mycanvas.width, this.mycanvas.height - this.scoreBoard.size.Height));
        this.allAmmos.forEach(function (ammo) {
            _this.mycanvas.drawAmmo(ammo);
        });
        this.allBricks.forEach(function (brick) {
            _this.mycanvas.drawBrick(brick);
        });
        this.allBalls.forEach(function (ball) {
            _this.mycanvas.drawBall(ball);
        });
        this.allBonuses
            .filter(function (bonus) { return bonus.isHit; })
            .forEach(function (bonus) {
            _this.mycanvas.drawBonus(bonus);
        });
        this.mycanvas.drawPaddle(this.paddle);
    };
    //#endregion core
    //#region supporting
    Game.prototype.resetBallPosition = function () {
        var _this = this;
        this.allBalls.forEach(function (ball) {
            ball.Position = new Point(_this.paddle.Position.X + _this.paddle.Size.Width / 2, canvas.height - 15);
        });
    };
    Game.prototype.shootGuns = function () {
        var _this = this;
        if (this.paddle.HasGuns)
            if (this.gameState == GameState.Playing) {
                this.paddle.shoot().forEach(function (ammo) {
                    _this.allAmmos.push(ammo);
                });
                setTimeout(function () {
                    _this.shootGuns();
                }, 250);
            }
            else {
                this.paddle.deactivateGuns();
            }
    };
    Game.prototype.shootCanon = function () {
        var _this = this;
        if (this.paddle.HasCanon && this.gameState == GameState.Playing) {
            this.paddle.shoot().forEach(function (ammo) {
                _this.allAmmos.push(ammo);
            });
            if (this.paddle.CanonShells <= 0)
                this.paddle.deactivateCanon();
        }
    };
    //#endregion supporting
    //#region Collision detection
    Game.prototype.detectBonusCollision = function (bonus) {
        var _this = this;
        if (bonus.Rect.endPos.X >= this.mycanvas.height) {
            //Bonus hit the bottom, remove it from the list
            this.allBonuses.splice(this.allBonuses.indexOf(bonus), 1);
        }
        if (bonus.Rect.intersectRect(this.paddle.Rect)) {
            switch (bonus.bonusType) {
                case BonusType.Extra_Life:
                    bonus.Activate(function () {
                        _this.extraLifeBonus_onActivate();
                    }, function () {
                        _this.extraLifeBonus_onDeactivate();
                    });
                    break;
                case BonusType.Fire_Ball:
                    bonus.Activate(function () {
                        _this.fireBallBonus_onActivate();
                    }, function () {
                        _this.fireBallBonus_onDeactivate();
                    });
                    break;
                case BonusType.Extra_Points:
                    bonus.Activate(function () {
                        _this.extraPointBonus_onActivate();
                    }, function () {
                        _this.extraPointBonus_onDeactivate();
                    });
                    break;
                case BonusType.Double_Points:
                    bonus.Activate(function () {
                        _this.doublePointBonus_onActivate();
                    }, function () {
                        _this.doublePointBonus_onDeactivate();
                    });
                    break;
                case BonusType.Large_Paddle:
                    bonus.Activate(function () {
                        _this.largePaddleBonus_onActivate();
                    }, function () {
                        _this.largePaddleBonus_onDeactivate();
                    });
                    break;
                case BonusType.Multi_Balls:
                    bonus.Activate(function () {
                        _this.multiBallsBonus_onActivate();
                    }, function () {
                        _this.multiBallsBonus_onDeactivate();
                    });
                    break;
                case BonusType.Short_Paddle:
                    bonus.Activate(function () {
                        _this.shortPaddleBonus_onActivate();
                    }, function () {
                        _this.shortPaddleBonus_onDeactivate();
                    });
                    break;
                case BonusType.Paddle_Cannon:
                    bonus.Activate(function () {
                        _this.paddleCannonBonus_onActivate();
                    }, function () {
                        _this.paddleCannonBonus_onDeactivate();
                    });
                    break;
                case BonusType.Paddle_Guns:
                    bonus.Activate(function () {
                        _this.paddleGunsBonus_onActivate();
                    }, function () {
                        _this.paddleGunsBonus_onDeactivate();
                    });
                    break;
                default:
                    //or BonusType.None
                    break;
            }
            this.allBonuses.splice(this.allBonuses.indexOf(bonus), 1);
        }
    };
    Game.prototype.detectBallCollision = function (b) {
        var _this = this;
        //Left and Right wall
        if (b.Position.X < 5 + b.Radius ||
            b.Position.X > this.mycanvas.width - b.Radius) {
            b.Direction = new Point(b.Direction.X * -1, b.Direction.Y);
            return true;
        }
        //Top wall
        if (b.Position.Y < this.scoreBoard.size.Height + b.Radius) {
            b.Direction = new Point(b.Direction.X, b.Direction.Y * -1);
            return true;
        }
        // Bottom wall
        if (b.Position.Y > this.mycanvas.height - b.Radius) {
            this.allBalls.splice(this.allBalls.indexOf(b), 1);
            if (this.allBalls.length == 0) {
                this.scoreBoard.lives--;
                this.gameState = GameState.Paused;
                this.allBalls = [new Ball()];
                this.resetBallPosition();
                this.paddle.deactivateGuns();
                this.paddle.deactivateCanon();
            }
            return true;
        }
        // if (
        //   b.Position.Y < this.scoreBoard.size.Height + b.Radius ||
        //   b.Position.Y > this.mycanvas.height - b.Radius
        // ) {
        //   b.Direction = new Point(b.Direction.X, b.Direction.Y * -1);
        //   if (b.Position.Y > this.mycanvas.height - b.Radius) {
        //     this.allBalls.splice(this.allBalls.indexOf(b), 1);
        //     if (this.allBalls.length == 0) {
        //       this.scoreBoard.lives--;
        //       this.gameState = GameState.Paused;
        //       this.allBalls = [new Ball()];
        //       this.resetBallPosition();
        //       this.paddle.deactivateGuns();
        //       this.paddle.deactivateCanon();
        //     }
        //   }
        //   return true;
        // }
        //paddle
        if (this.isWithinRect(b.Position, this.paddle.Rect.rectWithMargin(b.Radius, b.Radius, b.Radius, b.Radius)) != WallSide.None) {
            switch (this.getPaddleCollisionLocation(b.Position.X)) {
                case -1:
                    b.Direction = new Point(-1, b.Direction.Y * -1);
                    break;
                case 1:
                    b.Direction = new Point(1, b.Direction.Y * -1);
                    break;
                default:
                    b.Direction = new Point(b.Direction.X, b.Direction.Y * -1);
                    break;
            }
            return true;
        }
        //Bricks
        this.allBricks.forEach(function (brick) {
            var isHit = false;
            switch (_this.isWithinRect(b.Position, brick.Rect.rectWithMargin(b.Radius, b.Radius, b.Radius, b.Radius))) {
                case WallSide.Top:
                case WallSide.Bottom:
                    if (!b.fireBall)
                        b.Direction = new Point(b.Direction.X * -1, b.Direction.Y);
                    isHit = true;
                    break;
                case WallSide.Right:
                case WallSide.Left:
                    if (!b.fireBall)
                        b.Direction = new Point(b.Direction.X, b.Direction.Y * -1);
                    isHit = true;
                    break;
                case WallSide.TopLeft:
                case WallSide.TopRight:
                case WallSide.BottomRight:
                case WallSide.BottomLeft:
                    if (!b.fireBall)
                        b.Direction = new Point(b.Direction.X * -1, b.Direction.Y * -1);
                    isHit = true;
                    break;
                default:
                    //no collision
                    break;
            }
            if (isHit) {
                brick.Hit();
                _this.scoreBoard.addPoints(brick.HitPoints);
                if (brick.Hardness <= 0)
                    _this.allBricks.splice(_this.allBricks.indexOf(brick), 1);
                if (_this.allBricks.length <= 0)
                    _this.gameState = GameState.Ended;
                return true;
            }
        });
        return false;
    };
    Game.prototype.detectAmmoCollision = function (ammo) {
        var _this = this;
        if (ammo.position.Y <= 5) {
            //Ammo hit the top wall
            this.allAmmos.splice(this.allAmmos.indexOf(ammo), 1);
            return false;
        }
        //Bricks
        this.allBricks.forEach(function (brick) {
            if (_this.isWithinRect(ammo.position, brick.Rect) != WallSide.None) {
                for (var h = 0; h < ammo.Hits; h++) {
                    brick.Hit();
                    _this.scoreBoard.addPoints(brick.HitPoints);
                }
                if (brick.Hardness <= 0)
                    _this.allBricks.splice(_this.allBricks.indexOf(brick), 1);
                if (_this.allBricks.length <= 0)
                    _this.gameState = GameState.Ended;
                _this.allAmmos.splice(_this.allAmmos.indexOf(ammo), 1);
                return true;
            }
        });
        return false;
    };
    Game.prototype.getPaddleCollisionLocation = function (x) {
        if (x < this.paddle.Position.X + this.paddle.Size.Width * 0.2) {
            //Left
            return -1;
        }
        if (x > this.paddle.Rect.endPos.X - this.paddle.Size.Width * 0.2) {
            //Right
            return 1;
        }
        //Middle
        return 0;
    };
    Game.prototype.isWithinRect = function (p, r) {
        var eP = r.endPos;
        if (p.X >= r.pos.X && p.Y >= r.pos.Y && p.X <= eP.X && p.Y <= eP.Y) {
            var xT = p.X - r.pos.X;
            var xB = eP.X - p.X;
            var yL = p.Y - r.pos.Y;
            var yR = eP.Y - p.Y;
            switch ([xT, xB, yL, yR].sort(function (n1, n2) { return (n1 === n2 ? 0 : n1 > n2 ? 1 : -1); })[0]) {
                case xT:
                    switch (xT) {
                        case yL:
                            return WallSide.TopLeft;
                            break;
                        case yR:
                            return WallSide.TopRight;
                            break;
                        default:
                            return WallSide.Top;
                            break;
                    }
                    break;
                case xB:
                    switch (xB) {
                        case yL:
                            return WallSide.BottomLeft;
                            break;
                        case yR:
                            return WallSide.BottomRight;
                            break;
                        default:
                            return WallSide.Bottom;
                            break;
                    }
                    break;
                case yL:
                    return WallSide.Left;
                    break;
                case yR:
                    return WallSide.Right;
                    break;
                default:
                    break;
            }
        }
        return WallSide.None;
    };
    //#endregion Collision detection
    //#region events
    Game.prototype.canvas_onclick = function (event) {
        if (event.button == 0) {
            if (this.gameState === GameState.New ||
                this.gameState === GameState.Paused)
                this.gameState = GameState.Playing;
        }
        //shoot canon on mouse click
        if (this.gameState === GameState.Playing && this.paddle.HasCanon)
            this.shootCanon();
    };
    Game.prototype.canvas_onmousemove = function (event) {
        var cr = this.mycanvas.canvas.getBoundingClientRect();
        var sx = this.mycanvas.canvas.width / cr.width;
        var x = (event.clientX - cr.left) * sx - this.paddle.Size.Width / 2;
        if (x < 5)
            x = 5;
        if (x + this.paddle.Size.Width > this.mycanvas.canvas.width)
            x = this.mycanvas.canvas.width - this.paddle.Size.Width;
        this.paddle.Position = new Point(x, this.paddle.Position.Y);
        if (this.gameState === GameState.New || this.gameState === GameState.Paused)
            this.resetBallPosition();
    };
    Game.prototype.canvas_onkeydown = function (event) {
        console.log(event);
    };
    Game.prototype.extraLifeBonus_onActivate = function () {
        this.scoreBoard.lives++;
    };
    Game.prototype.extraLifeBonus_onDeactivate = function () { };
    Game.prototype.fireBallBonus_onActivate = function () {
        this.allBalls.forEach(function (ball) {
            ball.fireBall = true;
        });
    };
    Game.prototype.fireBallBonus_onDeactivate = function () {
        this.allBalls.forEach(function (ball) {
            ball.fireBall = false;
        });
    };
    Game.prototype.extraPointBonus_onActivate = function () {
        this.scoreBoard.bonus += 50;
    };
    Game.prototype.extraPointBonus_onDeactivate = function () {
        this.scoreBoard.bonus -= 50;
    };
    Game.prototype.fastBallBonus_onActivate = function () {
        this.allBalls.forEach(function (ball) {
            ball.increaseSpeed();
        });
    };
    Game.prototype.fastBallBonus_onDeactivate = function () {
        this.allBalls.forEach(function (ball) {
            ball.decreaseSpeed();
        });
    };
    Game.prototype.slowBallBonus_onActivate = function () {
        this.allBalls.forEach(function (ball) {
            ball.decreaseSpeed();
        });
    };
    Game.prototype.slowBallBonus_onDeactivate = function () {
        this.allBalls.forEach(function (ball) {
            ball.increaseSpeed();
        });
    };
    Game.prototype.doublePointBonus_onActivate = function () {
        this.scoreBoard.bonus += 100;
    };
    Game.prototype.doublePointBonus_onDeactivate = function () {
        this.scoreBoard.bonus -= 100;
    };
    Game.prototype.largePaddleBonus_onActivate = function () {
        this.paddle.increaseSize();
    };
    Game.prototype.largePaddleBonus_onDeactivate = function () {
        this.paddle.decreaseSize();
    };
    Game.prototype.shortPaddleBonus_onActivate = function () {
        this.paddle.decreaseSize();
    };
    Game.prototype.shortPaddleBonus_onDeactivate = function () {
        this.paddle.increaseSize();
    };
    Game.prototype.multiBallsBonus_onActivate = function () {
        //add 4 balls
        var b;
        b = new Ball(this.allBalls[0].Position);
        b.Direction = new Point(1, 1);
        this.allBalls.push(b);
        b = new Ball(this.allBalls[0].Position);
        b.Direction = new Point(1, -1);
        this.allBalls.push(b);
        b = new Ball(this.allBalls[0].Position);
        b.Direction = new Point(-1, 1);
        this.allBalls.push(b);
        b = new Ball(this.allBalls[0].Position);
        b.Direction = new Point(-1, -1);
        this.allBalls.push(b);
    };
    Game.prototype.multiBallsBonus_onDeactivate = function () { };
    Game.prototype.paddleGunsBonus_onActivate = function () {
        this.paddle.activateGuns();
        this.shootGuns();
    };
    Game.prototype.paddleGunsBonus_onDeactivate = function () {
        this.paddle.deactivateGuns();
    };
    Game.prototype.paddleCannonBonus_onActivate = function () {
        this.paddle.activateCanon();
    };
    Game.prototype.paddleCannonBonus_onDeactivate = function () {
        //this.paddle.deactivateCanon();
    };
    return Game;
}());
//# sourceMappingURL=Game.js.map