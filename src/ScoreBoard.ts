/// <reference path="common.ts" />
class ScoreBoard {
  lives: number;
  private points: number;
  startTime: number;
  position: Point;
  size: Size;
  bonus: number;

  /**
   *
   */
  constructor(pos: Point, sz: Size) {
    this.lives = 3;
    this.points = 0;
    this.startTime = Date.now();
    this.position = pos;
    this.size = sz;
    this.bonus = 100;
  }

  get Points(): number {
    return this.points;
  }

  addPoints(p: number): void {
    this.points += p * (this.bonus / 100);
  }
  get lapseTime(): string {
    let msec: number = Date.now() - this.startTime;
    let sec: number = Math.floor((msec / 1000) % 60);
    let min: number = Math.floor((msec / 1000 / 60) << 0);
    let hour: number = Math.floor((msec / 1000 / 60 / 60) << 0);
    let day: number = Math.floor((msec / 1000 / 60 / 60 / 24) << 0);
    let ltime: string = `${min}:${sec}`;
    if (hour > 0) ltime == `${hour}:${ltime}`;
    if (day > 0) ltime == `${day}:${ltime}`;

    return ltime;
  }
}
