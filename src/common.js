"use strict";
var Point = /** @class */ (function () {
    /**
     *
     */
    function Point(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.X = x;
        this.Y = y;
    }
    Point.prototype.add = function (point) {
        return new Point(this.X + point.X, this.Y + point.Y);
    };
    Point.prototype.addXY = function (x, y) {
        return new Point(this.X + x, this.Y + y);
    };
    return Point;
}());
var Size = /** @class */ (function () {
    /**
     *
     */
    function Size(width, height) {
        if (width === void 0) { width = 0; }
        if (height === void 0) { height = 0; }
        this.Width = width;
        this.Height = height;
    }
    Size.prototype.add = function (size) {
        return new Size(this.Width + size.Width, this.Height + size.Height);
    };
    Size.prototype.addXY = function (width, height) {
        return new Size(this.Width + width, this.Height + height);
    };
    return Size;
}());
var Rect = /** @class */ (function () {
    /**
     *
     */
    function Rect(p, s) {
        this.pos = p;
        this.size = s;
    }
    Object.defineProperty(Rect.prototype, "endPos", {
        get: function () {
            return this.pos.addXY(this.size.Width, this.size.Height);
        },
        enumerable: true,
        configurable: true
    });
    Rect.prototype.rectWithMargin = function (t, r, b, l) {
        return new Rect(this.pos.addXY(t * -1, l * -1), new Size(this.size.Width + (r * 2), this.size.Height + (r * 2)));
    };
    Rect.prototype.intersectRect = function (rect) {
        return !(rect.pos.X > this.endPos.X ||
            rect.endPos.X < this.pos.X ||
            rect.pos.Y > this.endPos.Y ||
            rect.endPos.Y < this.pos.Y);
    };
    return Rect;
}());
var WallSide;
(function (WallSide) {
    WallSide[WallSide["None"] = 0] = "None";
    WallSide[WallSide["Top"] = 1] = "Top";
    WallSide[WallSide["Right"] = 2] = "Right";
    WallSide[WallSide["Bottom"] = 3] = "Bottom";
    WallSide[WallSide["Left"] = 4] = "Left";
    WallSide[WallSide["TopLeft"] = 5] = "TopLeft";
    WallSide[WallSide["TopRight"] = 6] = "TopRight";
    WallSide[WallSide["BottomRight"] = 7] = "BottomRight";
    WallSide[WallSide["BottomLeft"] = 8] = "BottomLeft";
})(WallSide || (WallSide = {}));
//# sourceMappingURL=common.js.map