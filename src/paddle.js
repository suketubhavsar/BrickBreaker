"use strict";
/// <reference path="common.ts" />
/// <reference path="vapon.ts" />
var Paddle = /** @class */ (function () {
    /**
     *
     */
    function Paddle(pos, sz, radius) {
        if (pos === void 0) { pos = new Point(); }
        if (sz === void 0) { sz = new Size(50, 5); }
        if (radius === void 0) { radius = { tl: 0, tr: 0, br: 5, bl: 5 }; }
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
    Object.defineProperty(Paddle.prototype, "Size", {
        get: function () {
            return this.size;
        },
        set: function (sz) {
            if (sz.Width > 100)
                sz.Width = 100;
            if (sz.Width < 20)
                sz.Width = 20;
            this.size = sz;
            this.setVaponPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "Position", {
        get: function () {
            return this.position;
        },
        set: function (pos) {
            this.position = pos;
            this.setVaponPosition();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "LeftGun", {
        get: function () {
            return this.leftGun;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "RightGun", {
        get: function () {
            return this.rightGun;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "Canon", {
        get: function () {
            return this.canon;
        },
        enumerable: true,
        configurable: true
    });
    Paddle.prototype.setVaponPosition = function () {
        this.leftGun.position = this.position.addXY(3, -2);
        this.rightGun.position = this.position.addXY(this.Size.Width - 4, -2);
        this.canon.position = this.position.addXY(this.Size.Width / 2 - 2, -4);
    };
    Object.defineProperty(Paddle.prototype, "Rect", {
        get: function () {
            return new Rect(this.Position, this.Size);
        },
        enumerable: true,
        configurable: true
    });
    Paddle.prototype.increaseSize = function () {
        if (this.Size.Width <= 100)
            this.Size = this.Size.addXY(this.Size.Width + 20, 0);
    };
    Paddle.prototype.decreaseSize = function () {
        if (this.Size.Width >= 40)
            this.Size = this.Size.addXY(this.Size.Width - 20, 0);
    };
    Object.defineProperty(Paddle.prototype, "HasGuns", {
        get: function () {
            return this.hasGuns;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "HasCanon", {
        get: function () {
            return this.hasCanon;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Paddle.prototype, "CanonShells", {
        get: function () {
            return this.canonShells;
        },
        enumerable: true,
        configurable: true
    });
    Paddle.prototype.shoot = function () {
        var ammo = new Array();
        if (this.hasGuns) {
            ammo.push(this.leftGun.shoot());
            ammo.push(this.rightGun.shoot());
        }
        if (this.hasCanon) {
            ammo.push(this.canon.shoot());
            this.canonShells--;
            if (this.canonShells <= 0)
                this.deactivateCanon();
        }
        return ammo;
    };
    Paddle.prototype.activateGuns = function () {
        this.hasGuns = true;
        this.hasCanon = false;
        this.canonShells = 0;
    };
    Paddle.prototype.deactivateGuns = function () {
        this.hasGuns = false;
        this.hasCanon = false;
        this.canonShells = 0;
    };
    Paddle.prototype.activateCanon = function () {
        this.hasGuns = false;
        this.hasCanon = true;
        this.canonShells = 3;
    };
    Paddle.prototype.deactivateCanon = function () {
        this.hasGuns = false;
        this.hasCanon = false;
        this.canonShells = 0;
    };
    return Paddle;
}());
//# sourceMappingURL=paddle.js.map