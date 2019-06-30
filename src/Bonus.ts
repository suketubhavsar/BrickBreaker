/// <reference path="common.ts" />

enum BonusType {
  None = "",
  Extra_Life = "+*",
  Extra_Points = "150%",
  Double_Points = "200%",
  Fire_Ball = ">O<",
  Multi_Balls = "OOOO",
  Large_Paddle = "<==>",
  Short_Paddle = ">==<",
  Paddle_Guns = "]==",
  Paddle_Cannon = "]=>",
  Fast_Ball = "===O",
  Slow_Ball = "=O",
}

const bonus_active_time_in_msec: number = 10000;
class Bonus {
  Position: Point;
  Size: Size;
  Color: string;
  bonusType: BonusType;
  isHit: boolean;
  radius:Radius;

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    this.Position = position;
    this.Size = size;
    this.Color = "#FFFFFF";
    this.bonusType = BonusType.None;
    this.isHit = false;
    this.radius={tl:10,tr:10,br:10,bl:10};
  }
  get Rect(): Rect {
    return new Rect(this.Position, this.Size);
  }
  move():void{
    this.Position=this.Position.addXY(0,1);
  }
  Activate(onActivate: () => void, onDeactivate: () => void) {
    if (onActivate && onDeactivate) {
      onActivate();
      setTimeout(() => {
        onDeactivate();
      }, bonus_active_time_in_msec);
    }
  }
}

class ExtraLifeBonus extends Bonus {
  // Extra_Life = "+*",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.bonusType = BonusType.Extra_Life;
  }
}

class ExtraPointBonus extends Bonus {
  // Extra_Points = "150%",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#FFD000";
    this.bonusType = BonusType.Extra_Points;
  }
}

class DoublePointBonus extends Bonus {
  // Double_Points = "200%",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#CAA500";
    this.bonusType = BonusType.Double_Points;
  }
}
class FireBallBonus extends Bonus {
  // Fire_Ball = ">O<",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#E50000";
    this.bonusType = BonusType.Fire_Ball;
  }
}

class MultiBallBonus extends Bonus {
  // Multi_Balls = "OOOO",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#2ED2E4";
    this.bonusType = BonusType.Multi_Balls;
  }
}

class SlowBallBonus extends Bonus {
  // Slow_Ball = "=O",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#0236FF";
    this.bonusType = BonusType.Slow_Ball;
  }
}

class FastBallBonus extends Bonus {
  // Fast_Ball = "===O",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#02B4FF";
    this.bonusType = BonusType.Fast_Ball;
  }
}

class LargePaddleBonus extends Bonus {
  // Large_Paddle = "<==>",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#078800";
    this.bonusType = BonusType.Large_Paddle;
  }
}

class ShortPaddleBonus extends Bonus {
  // Short_Paddle = ">==<",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#0DF900";
    this.bonusType = BonusType.Short_Paddle;
  }
}

class PaddleGunsBonus extends Bonus {
  // Paddle_Guns = "]==",

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#860088";
    this.bonusType = BonusType.Paddle_Guns;
  }
}
class PaddleCannonBonus extends Bonus {
  // Paddle_Cannon = "]=>"

  /**
   *
   */
  constructor(position: Point = new Point(), size: Size = new Size(25, 10)) {
    super(position, size);
    this.Color="#880058";
    this.bonusType = BonusType.Paddle_Cannon;
  }
}
