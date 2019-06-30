/// <reference path="common.ts" />
/// <reference path="Bonus.ts" />
class Brick {
  Position: Point;
  Size: Size;
  Color: string;
  isAlive: boolean;
  Hardness: number;
  LineWidth: number;
  HitPoints: number;
  isHit: boolean;
  bonus:Bonus;

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    this.Position = position;
    this.Size = size;
    this.Color = "#01cc01";
    this.isAlive = true;
    this.Hardness = 2;
    this.LineWidth = 4;
    this.HitPoints = 10;
    this.isHit = false;
    this.bonus=new Bonus(position,size);
  }

  Hit(): void {
    this.isHit = true;
    if (this.isAlive) this.Hardness--;
    this.isAlive = this.Hardness > 0;
    if(!this.bonus.isHit)this.bonus.isHit=true;
  }

  get Rect(): Rect {
    return new Rect(this.Position, this.Size);
  }
}

class SolidBrick extends Brick {
  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Hardness = 3;
    this.Color = "#94017C";
  }
}

class ConcreteBrick extends Brick {
  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Hardness = 4;
    this.Color = "#636363";
  }
}

class SandBrick extends Brick {
  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Hardness = 1;
    this.Color = "#EA9901";
  }
}
