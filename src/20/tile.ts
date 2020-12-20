export class Tile {
    public flip() {
        const tmp = this.top;
        this.top = this.left;
        this.left = this.bottom;
        this.bottom = this.right;
        this.right = tmp;

        const tmpTile = this.topTile;
        this.topTile = this.leftTile;
        this.leftTile = this.bottomTile;
        this.bottomTile = this.rightTile;
        this.rightTile = tmpTile;
    }
    private _id: number;
    public get id(): number {
        return this._id;
    }
    public set id(v: number) {
        this._id = v;
    }

    private _layout: string[];
    public get layout(): string[] {
        return this._layout;
    }
    public set layout(v: string[]) {
        this._layout = v;
    }

    private _top: string;
    public get top(): string {
        return this._top;
    }
    public set top(v: string) {
        this._top = v;
    }

    private _bottom: string;
    public get bottom(): string {
        return this._bottom;
    }
    public set bottom(v: string) {
        this._bottom = v;
    }

    private _left: string;
    public get left(): string {
        return this._left;
    }
    public set left(v: string) {
        this._left = v;
    }

    private _right: string;
    public get right(): string {
        return this._right;
    }
    public set right(v: string) {
        this._right = v;
    }

    private _topTile: Tile;
    public get topTile(): Tile {
        return this._topTile;
    }
    public set topTile(v: Tile) {
        this._topTile = v;
    }

    private _bottomTile: Tile;
    public get bottomTile(): Tile {
        return this._bottomTile;
    }
    public set bottomTile(v: Tile) {
        this._bottomTile = v;
    }

    private _leftTile: Tile;
    public get leftTile(): Tile {
        return this._leftTile;
    }
    public set leftTile(v: Tile) {
        this._leftTile = v;
    }

    private _rightTile: Tile;
    public get rightTile(): Tile {
        return this._rightTile;
    }
    public set rightTile(v: Tile) {
        this._rightTile = v;
    }

    private _neighbors: Tile[];
    public get neighbors(): Tile[] {
        return this._neighbors;
    }
    public set neighbors(v: Tile[]) {
        this._neighbors = v;
    }

    constructor(id: number, layout: string[]) {
        this.id = id;
        this.layout = layout;
        this.neighbors = [];

        this.calculateBorders();
    }

    private calculateBorders() {
        this.bottom = this.layout[0];

        this.top = this.layout[this.layout.length - 1];

        let left: string[] = [];
        for (let i = 0; i < this.layout.length; i++) {
            const element = this.layout[i][0];

            left.push(element);
        }

        this.left = left.join('');

        let right: string[] = [];
        for (let i = 0; i < this.layout.length; i++) {
            const element = this.layout[i][this.layout[i].length - 1];

            right.push(element);
        }

        this.right = right.join('');
    }

    public flipVertically() {
        let temp: string[] = [];

        for (const line of this.layout) {
            temp.push(line.split('').reverse().join(''));
        }
    }

    public flipHorizontal() {
        this.layout = this.layout.reverse();
    }
}
