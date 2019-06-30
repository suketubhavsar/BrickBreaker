/// <reference path="common.ts" />
/// <reference path="Brick.ts" />
/// <reference path="paddle.ts" />
/// <reference path="Ball.ts" />
/// <reference path="ScoreBoard.ts" />
/// <reference path="Game.ts" />
/// <reference path="Bonus.ts" />
/// <reference path="vapon.ts" />
/// <reference path="ammunition.ts" />

class myCanvas {
  readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  width: number;
  height: number;

  constructor(private readonly _canvas: HTMLCanvasElement) {
    this.canvas = _canvas;
    this.context = this.canvas.getContext("2d") as CanvasRenderingContext2D;
    this.width = _canvas.width;
    this.height = _canvas.height;
  }

  //#region core

  drawScoreBoard(scoreBoard: ScoreBoard): void {
    this.drawBorder("#FFFFFF", 4, scoreBoard.position, scoreBoard.size);
    this.drawText(`Life# ${scoreBoard.lives}`, 10, 10, 75, 15);
    this.drawText(`${scoreBoard.lapseTime}`, 250, 10, 75, 15);
    this.drawText(`Points# ${scoreBoard.Points}`, 475, 10, 125, 15);
  }

  drawText(
    txt: string,
    x: number,
    y: number,
    w: number,
    h: number,
    color: string = "white",
    textcolor: string = "red",
    fontsize: string = "16px"
  ) {
    this.context.fillStyle = color;
    this.context.fillRect(x, y, w, h);
    this.context.fillStyle = textcolor;
    this.context.font = `${fontsize} Sans-Serif`;
    this.context.textAlign = "center";
    this.context.textBaseline = "middle";
    this.context.fillText(txt, x + w / 2, y + h / 2);
  }

  drawBorder(
    fillColor: string = this.context.strokeStyle.toString(),
    lineWidth: number = this.context.lineWidth,
    position: Point = new Point(0, 0),
    size: Size = new Size(this.canvas.width, this.canvas.height)
  ): void {
    this.context.strokeStyle = fillColor;
    this.context.lineWidth = lineWidth;
    this.context.strokeRect(position.X, position.Y, size.Width, size.Height);
  }

  drawAmmo(ammo: ammunition): void {
    this.drawRect(
      ammo.lineWidth,
      ammo.position,
      ammo.size,
      ammo.radius,
      ammo.color,
      1
    );
  }

  drawBrick(brick: Brick): void {
    this.context.lineWidth = brick.LineWidth;
    this.rainbowRect(
      brick.Position.X,
      brick.Position.Y,
      brick.Size.Width,
      brick.Size.Height,
      brick.Color,
      this.shadeColor(brick.Color, 60),
      this.shadeColor(brick.Color, -30),
      this.shadeColor(brick.Color, -60),
      this.shadeColor(brick.Color, -15)
    );
    if (brick.isHit && brick.Hardness < 4)
      this.drawDashedLine(
        brick.Position,
        brick.Position.addXY(brick.Size.Width, brick.Size.Height)
      );
    if (brick.isHit && brick.Hardness < 3)
      this.drawDashedLine(
        brick.Position.addXY(0, brick.Size.Height),
        brick.Position.addXY(brick.Size.Width, 0)
      );
    if (brick.isHit && brick.Hardness < 2)
      this.drawDashedLine(
        brick.Position.addXY(brick.Size.Width / 2, 0),
        brick.Position.addXY(brick.Size.Width / 2, brick.Size.Height)
      );
  }

  drawPaddle(paddle: Paddle): void {
    this.drawRect(
      0.5,
      paddle.Position,
      paddle.Size,
      paddle.Radius,
      paddle.Color,
      1
    );

    if (paddle.HasGuns) {
      this.drawRect(
        paddle.LeftGun.lineWidth,
        paddle.LeftGun.position,
        paddle.LeftGun.size,
        paddle.LeftGun.radius,
        paddle.LeftGun.color,
        1
      );
      this.drawRect(
        paddle.RightGun.lineWidth,
        paddle.RightGun.position,
        paddle.RightGun.size,
        paddle.RightGun.radius,
        paddle.RightGun.color,
        1
      );
    }
    if (paddle.HasCanon) {
      this.drawRect(
        paddle.Canon.lineWidth,
        paddle.Canon.position,
        paddle.Canon.size,
        paddle.Canon.radius,
        paddle.Canon.color,
        1
      );
    }
  }

  drawBonus(bonus: Bonus): void {
    this.drawRect(
      0.5,
      bonus.Position,
      bonus.Size,
      bonus.radius,
      bonus.Color,
      0.5
    );
    let rgb = this.hexToRgb(bonus.Color);

    // @ts-ignore
    let clr: string = `rgba(${rgb.r},${rgb.g},${rgb.b},0.5)`;
    this.drawText(
      bonus.bonusType.toString(),
      bonus.Position.X,
      bonus.Position.Y,
      bonus.Size.Width,
      bonus.Size.Height,
      clr,
      "black",
      "10px"
    );
    //console.log("drawing bonus");
  }
  drawBall(ball: Ball): void {
    this.context.beginPath();
    this.context.fillStyle = ball.Color;
    this.context.arc(
      ball.Position.X,
      ball.Position.Y,
      ball.Radius,
      0,
      Math.PI * 2
    );
    this.context.fill();
  }

  //#endregion core

  //#region supporting
  clearCanvas(): void {
    this.context.clearRect(0, 0, this.width, this.height);
  }

  private drawRect(
    lineWidth: number,
    pos: Point,
    size: Size,
    radius: Radius,
    color: string,
    opacity: number
  ): void {
    this.context.lineWidth = lineWidth;
    let rgb = this.hexToRgb(color);

    //@ts-ignore
    this.context.fillStyle = `rgba(${rgb.r},${rgb.g},${rgb.b},${opacity})`;

    this.context.beginPath();
    this.context.moveTo(pos.X + radius.tl, pos.Y);
    this.context.lineTo(pos.X + size.Width - radius.tr, pos.Y);
    this.context.quadraticCurveTo(
      pos.X + size.Width,
      pos.Y,
      pos.X + size.Width,
      pos.Y + radius.tr
    );
    this.context.lineTo(pos.X + size.Width, pos.Y + size.Height - radius.br);
    this.context.quadraticCurveTo(
      pos.X + size.Width,
      pos.Y + size.Height,
      pos.X + size.Width - radius.br,
      pos.Y + size.Height
    );
    this.context.lineTo(pos.X + radius.bl, pos.Y + size.Height);
    this.context.quadraticCurveTo(
      pos.X,
      pos.Y + size.Height,
      pos.X,
      pos.Y + size.Height - radius.bl
    );
    this.context.lineTo(pos.X, pos.Y + radius.tl);
    this.context.quadraticCurveTo(pos.X, pos.Y, pos.X + radius.tl, pos.Y);
    this.context.closePath();
    // if (fill) {
    this.context.fill();
  }

  private drawDashedLine(start: Point, end: Point): void {
    this.context.lineWidth = 0.5;
    this.context.strokeStyle = "#000000";
    this.context.setLineDash([2, 2]);
    this.context.moveTo(start.X, start.Y);
    this.context.lineTo(end.X, end.Y);
    this.context.stroke();
    this.context.setLineDash([]);
    this.context.beginPath();
  }

  private hexToRgb(hex: string) {
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    let shorthandRegex: RegExp = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  }

  // This method is used alone like context.fillRect
  // This method is not used within a context.beginPath
  // NOTE: this addition must always be run before it is used in code
  private rainbowRect(
    x: number,
    y: number,
    w: number,
    h: number,
    fillColor: string,
    tColor: string,
    rColor: string,
    bColor: string,
    lColor: string
  ): CanvasRenderingContext2D {
    // use existing fillStyle if fillStyle is not supplied
    fillColor = fillColor || this.context.fillStyle.toString();

    // use existing strokeStyle if any strokeStyle is not supplied
    var ss = this.context.strokeStyle.toString();
    tColor = tColor || ss;
    rColor = rColor || ss;
    bColor = bColor || ss;
    lColor = lColor || ss;

    // context will be modified, so save it
    this.context.save();

    // miter the lines
    this.context.lineJoin = "miter";

    // context lines are always drawn half-in/half-out
    // so context.lineWidth/2 is used a lot
    var lw = this.context.lineWidth / 2;

    // shortcut vars for boundaries
    var L = x - lw;
    var R = x + lw;
    var T = y - lw;
    var B = y + lw;

    // top
    this.trapezoid(this.context, tColor, L, T, R + w, T, L + w, B, R, B);

    // right
    this.trapezoid(
      this.context,
      rColor,
      R + w,
      T,
      R + w,
      B + h,
      L + w,
      T + h,
      L + w,
      B
    );

    // bottom
    this.trapezoid(
      this.context,
      bColor,
      R + w,
      B + h,
      L,
      B + h,
      R,
      T + h,
      L + w,
      T + h
    );

    // left
    this.trapezoid(this.context, lColor, L, B + h, L, T, R, B, R, T + h);

    // fill
    this.context.fillStyle = fillColor;
    this.context.fillRect(x, y, w, h);

    // be kind -- always rewind (old vhs reference!)
    this.context.restore();
    // don't let this path leak
    this.context.beginPath();
    // chain
    return this.context;
  }

  // helper function: draws one side's trapzoidal "stroke"
  private trapezoid(
    context: CanvasRenderingContext2D,
    color: string,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    x3: number,
    y3: number,
    x4: number,
    y4: number
  ): void {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.lineTo(x3, y3);
    context.lineTo(x4, y4);
    context.closePath();
    context.fillStyle = color;
    context.fill();
  }

  private shadeColor(color: string, percent: number): string {
    let R: number = parseInt(color.substring(1, 3), 16);
    let G: number = parseInt(color.substring(3, 5), 16);
    let B: number = parseInt(color.substring(5, 7), 16);

    R = Math.round((R * (100 + percent)) / 100);
    G = Math.round((G * (100 + percent)) / 100);
    B = Math.round((B * (100 + percent)) / 100);

    R = R < 255 ? R : 255;
    G = G < 255 ? G : 255;
    B = B < 255 ? B : 255;

    let RR: string =
      R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
    let GG: string =
      G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
    let BB: string =
      B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);
    // console.log(`sC: #${RR}${GG}${BB}`);
    // console.log(`rgb(${R},${G},${B})`);

    return "#" + RR + GG + BB;
  }
  //#endregion
}
