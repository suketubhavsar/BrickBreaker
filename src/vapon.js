"use strict";
/// <reference path="common.ts" />
/// <reference path="ammunition.ts" />
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
var Vapon = /** @class */ (function () {
    /**
     *
     */
    function Vapon(pos, sz) {
        this.position = pos;
        this.size = sz;
        this.lineWidth = 0.5;
        this.color = "#FF0202";
        this.radius = { tl: 0, tr: 0, br: 0, bl: 0 };
    }
    return Vapon;
}());
var Gun = /** @class */ (function (_super) {
    __extends(Gun, _super);
    /**
     *
     */
    function Gun(pos) {
        return _super.call(this, pos, new Size(1, 2)) || this;
    }
    Gun.prototype.shoot = function () {
        var ammo = new Bullet(this.position);
        return ammo;
    };
    return Gun;
}(Vapon));
var Canon = /** @class */ (function (_super) {
    __extends(Canon, _super);
    /**
     *
     */
    function Canon(pos) {
        return _super.call(this, pos, new Size(4, 5)) || this;
    }
    Canon.prototype.shoot = function () {
        var ammo = new Rocket(this.position);
        return ammo;
    };
    return Canon;
}(Vapon));
//# sourceMappingURL=vapon.js.map