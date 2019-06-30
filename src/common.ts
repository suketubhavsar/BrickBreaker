class Point{
    X:number;
    Y:number;

    /**
     *
     */
    constructor(x:number=0, y:number=0) {
        this.X=x;
        this.Y=y;
    }

    add(point:Point): Point{
        return new Point(this.X + point.X, this.Y + point.Y);
    }

    addXY(x:number, y:number): Point{
        return new Point(this.X + x, this.Y + y);
    }

}

type Radius = {
    tl:number;
    tr:number;
    br:number;
    bl:number;
}

class Size{
    Width:number;
    Height:number;

    /**
     *
     */
    constructor(width:number=0,height:number=0) {
        this.Width=width;
        this.Height=height;
    }

    add(size:Size):Size{
        return new Size(this.Width+size.Width, this.Height+size.Height );
    }
    
    addXY(width:number, height:number):Size{
        return new Size(this.Width+width, this.Height+height );
    }
}

class Rect{
    pos:Point;
    size:Size;
    /**
     *
     */
    constructor(p:Point,s:Size) {
        this.pos=p;
        this.size=s;
    }

    get endPos():Point{
        return this.pos.addXY(this.size.Width, this.size.Height);
    }

    rectWithMargin(t:number, r:number, b:number,l:number):Rect{
        return new Rect(this.pos.addXY(t*-1,l*-1), new Size(this.size.Width+(r*2),this.size.Height+(r*2) ));
    }

    intersectRect(rect:Rect):boolean {
        return !(rect.pos.X > this.endPos.X || 
            rect.endPos.X < this.pos.X || 
            rect.pos.Y > this.endPos.Y ||
            rect.endPos.Y < this.pos.Y);
      }
}

enum WallSide{
    None=0,
    Top,
    Right,
    Bottom,
    Left,
    TopLeft,
    TopRight,
    BottomRight,
    BottomLeft,
}
