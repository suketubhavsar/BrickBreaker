/// <reference path="common.ts" />
class Ball{
    Position:Point;
    private color:string;
    Radius:number;
    Speed:number;
    Direction:Point;
    fireBall:boolean;

    /**
     *
     */
    constructor(position:Point=new Point(), radius:number=5) {
        this.Position=position;
        this.color="#2ED2E4";
        this.Radius=radius;
        this.Speed=100;
        this.Direction=new Point(1,-1);
        this.fireBall=false
    }

    get Color():string{
        if(this.fireBall){
            return "#E50000";
        }
        return this.color;
    }

    increaseSpeed():void{
        this.Speed+=20;
        if(this.Speed>140)this.Speed=140;
    }
    decreaseSpeed():void{
        this.Speed-=20;
        if(this.Speed<40)this.Speed=40;
    }
    move():void{
        this.Position=this.Position.addXY((this.Speed/25)*this.Direction.X, ((this.Speed/25)*this.Direction.Y));
    }
}