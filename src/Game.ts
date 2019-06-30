/// <reference path="common.ts" />
/// <reference path="Brick.ts" />
/// <reference path="paddle.ts" />
/// <reference path="Ball.ts" />
/// <reference path="ScoreBoard.ts" />
/// <reference path="canvas.ts" />
/// <reference path="Bonus.ts" />
/// <reference path="ammunition.ts" />

enum GameState {
  New = 0,
  Playing,
  Paused,
  Ended
}

class Game {
  allBricks: Array<Brick>;
  paddle: Paddle;
  allBalls: Array<Ball>;
  scoreBoard: ScoreBoard;
  mycanvas: myCanvas;
  gameState: GameState;
  allBonuses: Array<Bonus>;
  allAmmos: Array<ammunition>;
  /**
   *
   */
  constructor(private readonly _cvas: HTMLCanvasElement) {
    this.mycanvas = new myCanvas(_cvas);
    this.mycanvas.canvas.onclick = (e: MouseEvent) => {
      this.canvas_onclick(e);
    };
    this.mycanvas.canvas.onkeydown = (e: KeyboardEvent) => {
      this.canvas_onkeydown(e);
    };
    this.mycanvas.canvas.onmousemove = (e: MouseEvent) => {
      this.canvas_onmousemove(e);
    };

    this.allBricks = new Array<Brick>();
    this.allBalls = new Array<Ball>();
    this.paddle = new Paddle(new Point(5, canvas.height - 10));
    this.allBonuses = new Array<Bonus>();
    this.allAmmos = new Array<ammunition>();
    this.scoreBoard = new ScoreBoard(
      new Point(0, 0),
      new Size(this.mycanvas.width, 40)
    );
    this.gameState = GameState.New;

    this.loadNewGame();
  }

  //#region core

  loadNewGame() {
    this.allBricks = new Array<Brick>();
    this.allBalls = new Array<Ball>();
    this.allBonuses = new Array<Bonus>();
    this.allAmmos = new Array<ammunition>();
    this.scoreBoard = new ScoreBoard(
      new Point(0, 0),
      new Size(this.mycanvas.width, 40)
    );

    this.paddle = new Paddle(new Point(5, canvas.height - 10));
    this.allBalls.push(new Ball(new Point(30, canvas.height - 15)));

    let pos = new Point(5, 45);
    let colSize: number = 30;
    let rowSize: number = 16;
    for (let row: number = 0; row < 5; row++) {
      for (let col: number = 0; col < 20; col++) {
        let br: Brick;
        let bn: Bonus = new Bonus(pos);
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
  }

  move(): void {
    if (this.gameState === GameState.Playing) {
      for (let iB: number = this.allBalls.length - 1; iB >= 0; iB--) {
        this.allBalls[iB].move();
        this.detectBallCollision(this.allBalls[iB]);
      }

      if (this.scoreBoard.lives <= 0) {
        this.gameState = GameState.Ended;
      }

      for (let iB: number = this.allBonuses.length - 1; iB >= 0; iB--) {
        if (this.allBonuses[iB].isHit) {
          this.allBonuses[iB].move();
          this.detectBonusCollision(this.allBonuses[iB]);
        }
      }

      for (let iB: number = this.allAmmos.length - 1; iB >= 0; iB--) {
        this.allAmmos[iB].move();
        this.detectAmmoCollision(this.allAmmos[iB]);
      }
    }
  }

  drawGame() {
    this.mycanvas.clearCanvas();
    this.mycanvas.drawScoreBoard(this.scoreBoard);
    this.mycanvas.drawBorder(
      "#FFFFFF",
      4,
      new Point(0, this.scoreBoard.size.Height),
      new Size(
        this.mycanvas.width,
        this.mycanvas.height - this.scoreBoard.size.Height
      )
    );

    this.allAmmos.forEach(ammo => {
      this.mycanvas.drawAmmo(ammo);
    });

    this.allBricks.forEach(brick => {
      this.mycanvas.drawBrick(brick);
    });

    this.allBalls.forEach(ball => {
      this.mycanvas.drawBall(ball);
    });

    this.allBonuses
      .filter(bonus => bonus.isHit)
      .forEach(bonus => {
        this.mycanvas.drawBonus(bonus);
      });

    this.mycanvas.drawPaddle(this.paddle);
  }
  //#endregion core

  //#region supporting

  private resetBallPosition() {
    this.allBalls.forEach(ball => {
      ball.Position = new Point(
        this.paddle.Position.X + this.paddle.Size.Width / 2,
        canvas.height - 15
      );
    });
  }

  private shootGuns(): void {
    if (this.paddle.HasGuns)
      if (this.gameState == GameState.Playing) {
        this.paddle.shoot().forEach(ammo => {
          this.allAmmos.push(ammo);
        });
        setTimeout(() => {
          this.shootGuns();
        }, 250);
      } else {
        this.paddle.deactivateGuns();
      }
  }

  private shootCanon(): void {
    if (this.paddle.HasCanon && this.gameState == GameState.Playing) {
      this.paddle.shoot().forEach(ammo => {
        this.allAmmos.push(ammo);
      });
      if (this.paddle.CanonShells <= 0) this.paddle.deactivateCanon();
    }
  }
  //#endregion supporting

  //#region Collision detection

  detectBonusCollision(bonus: Bonus): void {
    if (bonus.Rect.endPos.X >= this.mycanvas.height) {
      //Bonus hit the bottom, remove it from the list
      this.allBonuses.splice(this.allBonuses.indexOf(bonus), 1);
    }
    if (bonus.Rect.intersectRect(this.paddle.Rect)) {
      switch (bonus.bonusType) {
        case BonusType.Extra_Life:
          bonus.Activate(
            (): void => {
              this.extraLifeBonus_onActivate();
            },
            (): void => {
              this.extraLifeBonus_onDeactivate();
            }
          );
          break;
        case BonusType.Fire_Ball:
          bonus.Activate(
            (): void => {
              this.fireBallBonus_onActivate();
            },
            (): void => {
              this.fireBallBonus_onDeactivate();
            }
          );
          break;
        case BonusType.Extra_Points:
          bonus.Activate(
            (): void => {
              this.extraPointBonus_onActivate();
            },
            (): void => {
              this.extraPointBonus_onDeactivate();
            }
          );
          break;

        case BonusType.Double_Points:
          bonus.Activate(
            (): void => {
              this.doublePointBonus_onActivate();
            },
            (): void => {
              this.doublePointBonus_onDeactivate();
            }
          );
          break;
        case BonusType.Large_Paddle:
          bonus.Activate(
            (): void => {
              this.largePaddleBonus_onActivate();
            },
            (): void => {
              this.largePaddleBonus_onDeactivate();
            }
          );
          break;
        case BonusType.Multi_Balls:
          bonus.Activate(
            (): void => {
              this.multiBallsBonus_onActivate();
            },
            (): void => {
              this.multiBallsBonus_onDeactivate();
            }
          );
          break;
        case BonusType.Short_Paddle:
          bonus.Activate(
            (): void => {
              this.shortPaddleBonus_onActivate();
            },
            (): void => {
              this.shortPaddleBonus_onDeactivate();
            }
          );
          break;
        case BonusType.Paddle_Cannon:
          bonus.Activate(
            (): void => {
              this.paddleCannonBonus_onActivate();
            },
            (): void => {
              this.paddleCannonBonus_onDeactivate();
            }
          );
          break;
        case BonusType.Paddle_Guns:
          bonus.Activate(
            (): void => {
              this.paddleGunsBonus_onActivate();
            },
            (): void => {
              this.paddleGunsBonus_onDeactivate();
            }
          );
          break;
        default:
          //or BonusType.None
          break;
      }
      this.allBonuses.splice(this.allBonuses.indexOf(bonus), 1);
    }
  }

  detectBallCollision(b: Ball): boolean {
    //Left and Right wall
    if (
      b.Position.X < 5 + b.Radius ||
      b.Position.X > this.mycanvas.width - b.Radius
    ) {
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
    if (
      this.isWithinRect(
        b.Position,
        this.paddle.Rect.rectWithMargin(b.Radius, b.Radius, b.Radius, b.Radius)
      ) != WallSide.None
    ) {
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

    this.allBricks.forEach(brick => {
      let isHit: boolean = false;
      switch (
        this.isWithinRect(
          b.Position,
          brick.Rect.rectWithMargin(b.Radius, b.Radius, b.Radius, b.Radius)
        )
      ) {
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
        this.scoreBoard.addPoints(brick.HitPoints);
        if (brick.Hardness <= 0)
          this.allBricks.splice(this.allBricks.indexOf(brick), 1);
        if (this.allBricks.length <= 0) this.gameState = GameState.Ended;
        return true;
      }
    });

    return false;
  }

  detectAmmoCollision(ammo: ammunition): boolean {
    if (ammo.position.Y <= 5) {
      //Ammo hit the top wall
      this.allAmmos.splice(this.allAmmos.indexOf(ammo), 1);
      return false;
    }

    //Bricks

    this.allBricks.forEach(brick => {
      if (this.isWithinRect(ammo.position, brick.Rect) != WallSide.None) {
        for (let h: number = 0; h < ammo.Hits; h++) {
          brick.Hit();
          this.scoreBoard.addPoints(brick.HitPoints);
        }
        if (brick.Hardness <= 0)
          this.allBricks.splice(this.allBricks.indexOf(brick), 1);
        if (this.allBricks.length <= 0) this.gameState = GameState.Ended;
        this.allAmmos.splice(this.allAmmos.indexOf(ammo), 1);
        return true;
      }
    });
    return false;
  }

  getPaddleCollisionLocation(x: number): number {
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
  }
  private isWithinRect(p: Point, r: Rect): WallSide {
    let eP: Point = r.endPos;
    if (p.X >= r.pos.X && p.Y >= r.pos.Y && p.X <= eP.X && p.Y <= eP.Y) {
      let xT: number = p.X - r.pos.X;
      let xB: number = eP.X - p.X;
      let yL: number = p.Y - r.pos.Y;
      let yR: number = eP.Y - p.Y;
      switch (
        [xT, xB, yL, yR].sort((n1, n2) => (n1 === n2 ? 0 : n1 > n2 ? 1 : -1))[0]
      ) {
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
  }

  //#endregion Collision detection

  //#region events
  canvas_onclick(event: MouseEvent) {
    if (event.button == 0) {
      if (
        this.gameState === GameState.New ||
        this.gameState === GameState.Paused
      )
        this.gameState = GameState.Playing;
    }
    //shoot canon on mouse click
    if (this.gameState === GameState.Playing && this.paddle.HasCanon)
      this.shootCanon();
  }
  canvas_onmousemove(event: MouseEvent) {
    let cr: ClientRect = this.mycanvas.canvas.getBoundingClientRect();
    let sx: number = this.mycanvas.canvas.width / cr.width;
    let x = (event.clientX - cr.left) * sx - this.paddle.Size.Width / 2;
    if (x < 5) x = 5;
    if (x + this.paddle.Size.Width > this.mycanvas.canvas.width)
      x = this.mycanvas.canvas.width - this.paddle.Size.Width;
    this.paddle.Position = new Point(x, this.paddle.Position.Y);

    if (this.gameState === GameState.New || this.gameState === GameState.Paused)
      this.resetBallPosition();
  }
  canvas_onkeydown(event: KeyboardEvent) {
    console.log(event);
  }
  extraLifeBonus_onActivate(): void {
    this.scoreBoard.lives++;
  }
  extraLifeBonus_onDeactivate(): void {}
  fireBallBonus_onActivate(): void {
    this.allBalls.forEach(ball => {
      ball.fireBall = true;
    });
  }

  fireBallBonus_onDeactivate(): void {
    this.allBalls.forEach(ball => {
      ball.fireBall = false;
    });
  }

  extraPointBonus_onActivate(): void {
    this.scoreBoard.bonus += 50;
  }
  extraPointBonus_onDeactivate(): void {
    this.scoreBoard.bonus -= 50;
  }
  fastBallBonus_onActivate(): void {
    this.allBalls.forEach(ball => {
      ball.increaseSpeed();
    });
  }
  fastBallBonus_onDeactivate(): void {
    this.allBalls.forEach(ball => {
      ball.decreaseSpeed();
    });
  }
  slowBallBonus_onActivate(): void {
    this.allBalls.forEach(ball => {
      ball.decreaseSpeed();
    });
  }
  slowBallBonus_onDeactivate(): void {
    this.allBalls.forEach(ball => {
      ball.increaseSpeed();
    });
  }
  doublePointBonus_onActivate(): void {
    this.scoreBoard.bonus += 100;
  }
  doublePointBonus_onDeactivate(): void {
    this.scoreBoard.bonus -= 100;
  }
  largePaddleBonus_onActivate(): void {
    this.paddle.increaseSize();
  }
  largePaddleBonus_onDeactivate(): void {
    this.paddle.decreaseSize();
  }
  shortPaddleBonus_onActivate(): void {
    this.paddle.decreaseSize();
  }
  shortPaddleBonus_onDeactivate(): void {
    this.paddle.increaseSize();
  }
  multiBallsBonus_onActivate(): void {
    //add 4 balls
    let b: Ball;
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
  }
  multiBallsBonus_onDeactivate(): void {}
  paddleGunsBonus_onActivate(): void {
    this.paddle.activateGuns();
    this.shootGuns();
  }
  paddleGunsBonus_onDeactivate(): void {
    this.paddle.deactivateGuns();
  }
  paddleCannonBonus_onActivate(): void {
    this.paddle.activateCanon();
  }
  paddleCannonBonus_onDeactivate(): void {
    //this.paddle.deactivateCanon();
  }

  //#endregion events
}
