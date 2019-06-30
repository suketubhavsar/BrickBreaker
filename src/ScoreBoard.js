"use strict";
/// <reference path="common.ts" />
var ScoreBoard = /** @class */ (function () {
    /**
     *
     */
    function ScoreBoard(pos, sz) {
        this.lives = 3;
        this.points = 0;
        this.startTime = Date.now();
        this.position = pos;
        this.size = sz;
        this.bonus = 100;
    }
    Object.defineProperty(ScoreBoard.prototype, "Points", {
        get: function () {
            return this.points;
        },
        enumerable: true,
        configurable: true
    });
    ScoreBoard.prototype.addPoints = function (p) {
        this.points += p * (this.bonus / 100);
    };
    Object.defineProperty(ScoreBoard.prototype, "lapseTime", {
        get: function () {
            var msec = Date.now() - this.startTime;
            var sec = Math.floor((msec / 1000) % 60);
            var min = Math.floor((msec / 1000 / 60) << 0);
            var hour = Math.floor((msec / 1000 / 60 / 60) << 0);
            var day = Math.floor((msec / 1000 / 60 / 60 / 24) << 0);
            var ltime = min + ":" + sec;
            if (hour > 0)
                ltime == hour + ":" + ltime;
            if (day > 0)
                ltime == day + ":" + ltime;
            return ltime;
        },
        enumerable: true,
        configurable: true
    });
    return ScoreBoard;
}());
//# sourceMappingURL=ScoreBoard.js.map