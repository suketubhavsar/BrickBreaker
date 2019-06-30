/// <reference path="common.ts" />
/// <reference path="ammunition.ts" />

abstract class Vapon {
  lineWidth: number;
  position: Point;
  size: Size;
  color: string;
  radius: Radius;

  /**
   *
   */
  constructor(pos: Point, sz: Size) {
    this.position = pos;
    this.size = sz;
    this.lineWidth = 0.5;
    this.color = "#FF0202";
    this.radius = { tl: 0, tr: 0, br: 0, bl: 0 };
  }

  // shoot():ammunition{
  //     let ammo:ammunition=new Bullet(this.position);

  //     return ammo;
  // }
}

class Gun extends Vapon {
  /**
   *
   */
  constructor(pos: Point) {
    super(pos, new Size(1, 2));
  }
  shoot(): ammunition {
    let ammo: ammunition = new Bullet(this.position);
    return ammo;
  }
}

class Canon extends Vapon {
  /**
   *
   */
  constructor(pos: Point) {
    super(pos, new Size(4, 5));
  }
  shoot(): ammunition {
    let ammo: ammunition = new Rocket(this.position);
    return ammo;
  }
}
