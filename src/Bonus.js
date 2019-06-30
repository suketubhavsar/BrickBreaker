"use strict";
/// <reference path="common.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BonusType;
(function (BonusType) {
    BonusType["None"] = "";
    BonusType["Extra_Life"] = "+*";
    BonusType["Extra_Points"] = "150%";
    BonusType["Double_Points"] = "200%";
    BonusType["Fire_Ball"] = ">O<";
    BonusType["Multi_Balls"] = "OOOO";
    BonusType["Large_Paddle"] = "<==>";
    BonusType["Short_Paddle"] = ">==<";
    BonusType["Paddle_Guns"] = "]==";
    BonusType["Paddle_Cannon"] = "]=>";
    BonusType["Fast_Ball"] = "===O";
    BonusType["Slow_Ball"] = "=O";
})(BonusType || (BonusType = {}));
var bonus_active_time_in_msec = 10000;
var Bonus = /** @class */ (function () {
    /**
     *
     */
    function Bonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        this.Position = position;
        this.Size = size;
        this.Color = "#FFFFFF";
        this.bonusType = BonusType.None;
        this.isHit = false;
        this.radius = { tl: 10, tr: 10, br: 10, bl: 10 };
    }
    Object.defineProperty(Bonus.prototype, "Rect", {
        get: function () {
            return new Rect(this.Position, this.Size);
        },
        enumerable: true,
        configurable: true
    });
    Bonus.prototype.move = function () {
        this.Position = this.Position.addXY(0, 1);
    };
    Bonus.prototype.Activate = function (onActivate, onDeactivate) {
        if (onActivate && onDeactivate) {
            onActivate();
            setTimeout(function () {
                onDeactivate();
            }, bonus_active_time_in_msec);
        }
    };
    return Bonus;
}());
var ExtraLifeBonus = /** @class */ (function (_super) {
    __extends(ExtraLifeBonus, _super);
    // Extra_Life = "+*",
    /**
     *
     */
    function ExtraLifeBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.bonusType = BonusType.Extra_Life;
        return _this;
    }
    return ExtraLifeBonus;
}(Bonus));
var ExtraPointBonus = /** @class */ (function (_super) {
    __extends(ExtraPointBonus, _super);
    // Extra_Points = "150%",
    /**
     *
     */
    function ExtraPointBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#FFD000";
        _this.bonusType = BonusType.Extra_Points;
        return _this;
    }
    return ExtraPointBonus;
}(Bonus));
var DoublePointBonus = /** @class */ (function (_super) {
    __extends(DoublePointBonus, _super);
    // Double_Points = "200%",
    /**
     *
     */
    function DoublePointBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#CAA500";
        _this.bonusType = BonusType.Double_Points;
        return _this;
    }
    return DoublePointBonus;
}(Bonus));
var FireBallBonus = /** @class */ (function (_super) {
    __extends(FireBallBonus, _super);
    // Fire_Ball = ">O<",
    /**
     *
     */
    function FireBallBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#E50000";
        _this.bonusType = BonusType.Fire_Ball;
        return _this;
    }
    return FireBallBonus;
}(Bonus));
var MultiBallBonus = /** @class */ (function (_super) {
    __extends(MultiBallBonus, _super);
    // Multi_Balls = "OOOO",
    /**
     *
     */
    function MultiBallBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#2ED2E4";
        _this.bonusType = BonusType.Multi_Balls;
        return _this;
    }
    return MultiBallBonus;
}(Bonus));
var SlowBallBonus = /** @class */ (function (_super) {
    __extends(SlowBallBonus, _super);
    // Slow_Ball = "=O",
    /**
     *
     */
    function SlowBallBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#0236FF";
        _this.bonusType = BonusType.Slow_Ball;
        return _this;
    }
    return SlowBallBonus;
}(Bonus));
var FastBallBonus = /** @class */ (function (_super) {
    __extends(FastBallBonus, _super);
    // Fast_Ball = "===O",
    /**
     *
     */
    function FastBallBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#02B4FF";
        _this.bonusType = BonusType.Fast_Ball;
        return _this;
    }
    return FastBallBonus;
}(Bonus));
var LargePaddleBonus = /** @class */ (function (_super) {
    __extends(LargePaddleBonus, _super);
    // Large_Paddle = "<==>",
    /**
     *
     */
    function LargePaddleBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#078800";
        _this.bonusType = BonusType.Large_Paddle;
        return _this;
    }
    return LargePaddleBonus;
}(Bonus));
var ShortPaddleBonus = /** @class */ (function (_super) {
    __extends(ShortPaddleBonus, _super);
    // Short_Paddle = ">==<",
    /**
     *
     */
    function ShortPaddleBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#0DF900";
        _this.bonusType = BonusType.Short_Paddle;
        return _this;
    }
    return ShortPaddleBonus;
}(Bonus));
var PaddleGunsBonus = /** @class */ (function (_super) {
    __extends(PaddleGunsBonus, _super);
    // Paddle_Guns = "]==",
    /**
     *
     */
    function PaddleGunsBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#860088";
        _this.bonusType = BonusType.Paddle_Guns;
        return _this;
    }
    return PaddleGunsBonus;
}(Bonus));
var PaddleCannonBonus = /** @class */ (function (_super) {
    __extends(PaddleCannonBonus, _super);
    // Paddle_Cannon = "]=>"
    /**
     *
     */
    function PaddleCannonBonus(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Color = "#880058";
        _this.bonusType = BonusType.Paddle_Cannon;
        return _this;
    }
    return PaddleCannonBonus;
}(Bonus));
//# sourceMappingURL=Bonus.js.map