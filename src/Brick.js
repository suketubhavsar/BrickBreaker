"use strict";
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
/// <reference path="common.ts" />
/// <reference path="Bonus.ts" />
var Brick = /** @class */ (function () {
    /**
     *
     */
    function Brick(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        this.Position = position;
        this.Size = size;
        this.Color = "#01cc01";
        this.isAlive = true;
        this.Hardness = 2;
        this.LineWidth = 4;
        this.HitPoints = 10;
        this.isHit = false;
        this.bonus = new Bonus(position, size);
    }
    Brick.prototype.Hit = function () {
        this.isHit = true;
        if (this.isAlive)
            this.Hardness--;
        this.isAlive = this.Hardness > 0;
        if (!this.bonus.isHit)
            this.bonus.isHit = true;
    };
    Object.defineProperty(Brick.prototype, "Rect", {
        get: function () {
            return new Rect(this.Position, this.Size);
        },
        enumerable: true,
        configurable: true
    });
    return Brick;
}());
var SolidBrick = /** @class */ (function (_super) {
    __extends(SolidBrick, _super);
    /**
     *
     */
    function SolidBrick(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Hardness = 3;
        _this.Color = "#94017C";
        return _this;
    }
    return SolidBrick;
}(Brick));
var ConcreteBrick = /** @class */ (function (_super) {
    __extends(ConcreteBrick, _super);
    /**
     *
     */
    function ConcreteBrick(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Hardness = 4;
        _this.Color = "#636363";
        return _this;
    }
    return ConcreteBrick;
}(Brick));
var SandBrick = /** @class */ (function (_super) {
    __extends(SandBrick, _super);
    /**
     *
     */
    function SandBrick(position, size) {
        if (position === void 0) { position = new Point(); }
        if (size === void 0) { size = new Size(25, 10); }
        var _this = _super.call(this, position, size) || this;
        _this.Hardness = 1;
        _this.Color = "#EA9901";
        return _this;
    }
    return SandBrick;
}(Brick));
//# sourceMappingURL=Brick.js.map