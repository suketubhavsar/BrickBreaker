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
var ammunition = /** @class */ (function () {
    /**
     *
     */
    function ammunition(pos, sz) {
        this.position = pos;
        this.size = sz;
        this.lineWidth = 0.5;
        this.color = "#FF0202";
        this.radius = { tl: 0, tr: 0, br: 0, bl: 0 };
        this.speed = 1;
        this.hits = 1;
    }
    Object.defineProperty(ammunition.prototype, "Hits", {
        get: function () {
            return this.hits;
        },
        enumerable: true,
        configurable: true
    });
    ammunition.prototype.move = function () {
        this.position = this.position.addXY(0, -1 * this.speed);
    };
    return ammunition;
}());
var Bullet = /** @class */ (function (_super) {
    __extends(Bullet, _super);
    /**
     *
     */
    function Bullet(pos) {
        var _this = _super.call(this, pos, new Size(1, 5)) || this;
        _this.speed = 10;
        return _this;
    }
    return Bullet;
}(ammunition));
var Rocket = /** @class */ (function (_super) {
    __extends(Rocket, _super);
    /**
     *
     */
    function Rocket(pos) {
        var _this = _super.call(this, pos, new Size(4, 5)) || this;
        _this.radius = { tl: 2, tr: 2, br: 0, bl: 0 };
        _this.hits = 4;
        return _this;
    }
    return Rocket;
}(ammunition));
//# sourceMappingURL=ammunition.js.map