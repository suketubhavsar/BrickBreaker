/// <reference path="common.ts" />

abstract class ammunition {
  lineWidth: number;
  position: Point;
  size: Size;
  color: string;
  radius: Radius;
  protected speed: number;
  protected hits: number;

  /**
   *
   */
  constructor(pos: Point, sz: Size) {
    this.position = pos;
    this.size = sz;
    this.lineWidth = 0.5;
    this.color = "#FF0202";
    this.radius = { tl: 0, tr: 0, br: 0, bl: 0 };
    this.speed = 1;
    this.hits = 1;
  }

  get Hits(): number {
    return this.hits;
  }

  move(): void {
    this.position = this.position.addXY(0, -1 * this.speed);
  }
}

class Bullet extends ammunition {
  /**
   *
   */
  constructor(pos: Point) {
    super(pos, new Size(1, 5));
    this.speed = 10;
  }
}

class Rocket extends ammunition {
  /**
   *
   */
  constructor(pos: Point) {
    super(pos, new Size(4, 5));
    this.radius = { tl: 2, tr: 2, br: 0, bl: 0 };
    this.hits = 4;
  }
}
