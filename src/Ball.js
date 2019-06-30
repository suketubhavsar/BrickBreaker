"use strict";
/// <reference path="common.ts" />
var Ball = /** @class */ (function () {
    /**
     *
     */
    function Ball(position, radius) {
        if (position === void 0) { position = new Point(); }
        if (radius === void 0) { radius = 5; }
        this.Position = position;
        this.color = "#2ED2E4";
        this.Radius = radius;
        this.Speed = 100;
        this.Direction = new Point(1, -1);
        this.fireBall = false;
    }
    Object.defineProperty(Ball.prototype, "Color", {
        get: function () {
            if (this.fireBall) {
                return "#E50000";
            }
            return this.color;
        },
        enumerable: true,
        configurable: true
    });
    Ball.prototype.increaseSpeed = function () {
        this.Speed += 20;
        if (this.Speed > 140)
            this.Speed = 140;
    };
    Ball.prototype.decreaseSpeed = function () {
        this.Speed -= 20;
        if (this.Speed < 40)
            this.Speed = 40;
    };
    Ball.prototype.move = function () {
        this.Position = this.Position.addXY((this.Speed / 25) * this.Direction.X, ((this.Speed / 25) * this.Direction.Y));
    };
    return Ball;
}());
//# sourceMappingURL=Ball.js.map