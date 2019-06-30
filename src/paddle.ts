/// <reference path="common.ts" />
/// <reference path="vapon.ts" />

class Paddle {
  private position: Point;
  private size: Size;
  Color: string;
  Radius: Radius;
  private hasGuns: boolean;
  private hasCanon: boolean;
  private canonShells: number;
  private leftGun: Gun;
  private rightGun: Gun;
  private canon: Canon;

  get Size(): Size {
    return this.size;
  }

  set Size(sz: Size) {
    if (sz.Width > 100) sz.Width = 100;
    if (sz.Width < 20) sz.Width = 20;
    this.size = sz;
    this.setVaponPosition();
  }
  get Position(): Point {
    return this.position;
  }

  set Position(pos: Point) {
    this.position = pos;
    this.setVaponPosition();
  }

  get LeftGun(): Gun {
    return this.leftGun;
  }

  get RightGun(): Gun {
    return this.rightGun;
  }

  get Canon(): Canon {
    return this.canon;
  }

  private setVaponPosition() {
    this.leftGun.position = this.position.addXY(3, -2);
    this.rightGun.position = this.position.addXY(this.Size.Width - 4, -2);
    this.canon.position = this.position.addXY(this.Size.Width / 2 - 2, -4);
  }

  /**
   *
   */
  constructor(
    pos: Point = new Point(),
    sz: Size = new Size(50, 5),
    radius: Radius = { tl: 0, tr: 0, br: 5, bl: 5 }
  ) {
    this.size = sz;
    this.Color = "#C1C1C1";
    this.Radius = radius;
    this.hasCanon = false;
    this.hasGuns = false;
    this.canonShells = 0;
    this.leftGun = new Gun(pos);
    this.rightGun = new Gun(pos);
    this.canon = new Canon(pos);
    this.position = pos;
  }

  get Rect(): Rect {
    return new Rect(this.Position, this.Size);
  }

  increaseSize(): void {
    if (this.Size.Width <= 100)
      this.Size = this.Size.addXY(this.Size.Width + 20, 0);
  }
  decreaseSize(): void {
    if (this.Size.Width >= 40)
      this.Size = this.Size.addXY(this.Size.Width - 20, 0);
  }

  get HasGuns(): boolean {
    return this.hasGuns;
  }

  get HasCanon(): boolean {
    return this.hasCanon;
  }

  get CanonShells(): number {
    return this.canonShells;
  }

  shoot(): Array<ammunition> {
    let ammo: Array<ammunition> = new Array<ammunition>();
    if (this.hasGuns) {
      ammo.push(this.leftGun.shoot());
      ammo.push(this.rightGun.shoot());
    }
    if (this.hasCanon) {
      ammo.push(this.canon.shoot());
      this.canonShells--;
      if (this.canonShells <= 0) this.deactivateCanon();
    }
    return ammo;
  }
  activateGuns(): void {
    this.hasGuns = true;
    this.hasCanon = false;
    this.canonShells = 0;
  }
  deactivateGuns(): void {
    this.hasGuns = false;
    this.hasCanon = false;
    this.canonShells = 0;
  }
  activateCanon(): void {
    this.hasGuns = false;
    this.hasCanon = true;
    this.canonShells = 3;
  }
  deactivateCanon(): void {
    this.hasGuns = false;
    this.hasCanon = false;
    this.canonShells = 0;
  }
}
