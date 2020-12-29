import { reverse } from '../utils/string';

export class Tile {
    private static TOP = 0;
    private static RIGHT = 1;
    private static BOTTOM = 2;
    private static LEFT = 3;
    public static DIRECTIONS = [Tile.TOP, Tile.RIGHT, Tile.BOTTOM, Tile.LEFT];

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

    constructor(id: number, layout: string[]) {
        this.id = id;
        this.layout = layout;
        this.calculateBorders();
    }

    private calculateBorders() {
        this.top = this.layout[0];
        this.bottom = this.layout[this.layout.length - 1];
        this.left = this.layout.map(line => line[0]).join('');
        this.right = this.layout.map(line => line[line.length - 1]).join('');
    }

    public flip(flippedTiles: number[] = []) {
        if (flippedTiles.includes(this.id)) return;

        flippedTiles.push(this.id);
        const tmp = this.top;
        this.top = reverse(this.left);
        this.left = this.bottom;
        this.bottom = reverse(this.right);
        this.right = tmp;

        const tmpTile = this.topTile;
        this.topTile = this.leftTile;
        this.leftTile = this.bottomTile;
        this.bottomTile = this.rightTile;
        this.rightTile = tmpTile;

        for (const direction of Tile.DIRECTIONS) {
            this.getTile(direction)?.flip(flippedTiles);
        }
    }

    public flipVertically(flippedTiles: number[] = []) {
        if (flippedTiles.includes(this.id)) return;

        flippedTiles.push(this.id);

        const tmp = this.right;
        this.right = this.left;
        this.left = tmp;
        this.top = reverse(this.top);
        this.bottom = reverse(this.bottom);

        const tmpTile = this.rightTile;
        this.rightTile = this.leftTile;
        this.leftTile = tmpTile;

        for (const direction of Tile.DIRECTIONS) {
            this.getTile(direction)?.flipVertically(flippedTiles);
        }
    }

    public flipHorizontally(flippedTiles: number[] = []) {
        if (flippedTiles.includes(this.id)) return;

        flippedTiles.push(this.id);

        const tmp = this.bottom;
        this.bottom = this.top;
        this.top = tmp;
        this.right = reverse(this.right);
        this.left = reverse(this.left);

        const tmpTile = this.topTile;
        this.topTile = this.bottomTile;
        this.bottomTile = tmpTile;

        for (const direction of Tile.DIRECTIONS) {
            this.getTile(direction)?.flipHorizontally(flippedTiles);
        }
    }

    public getNumberOfNeighbors(): number {
        return Tile.DIRECTIONS.map(direction => this.getTile(direction)).filter(
            tile => tile
        ).length;
    }

    public get(direction: number): string {
        switch (direction) {
            case Tile.TOP:
                return this.top;
            case Tile.RIGHT:
                return this.right;
            case Tile.BOTTOM:
                return this.bottom;
            case Tile.LEFT:
                return this.left;
            default:
                throw new Error('Unknown direction ' + direction);
        }
    }

    public getTile(direction: number): Tile {
        switch (direction) {
            case Tile.TOP:
                return this.topTile;
            case Tile.RIGHT:
                return this.rightTile;
            case Tile.BOTTOM:
                return this.bottomTile;
            case Tile.LEFT:
                return this.leftTile;
            default:
                throw new Error('Unknown direction ' + direction);
        }
    }

    public setTile(direction: number, tile: Tile) {
        switch (direction) {
            case Tile.TOP:
                this.topTile = tile;
                break;
            case Tile.RIGHT:
                this.rightTile = tile;
                break;
            case Tile.BOTTOM:
                this.bottomTile = tile;
                break;
            case Tile.LEFT:
                this.leftTile = tile;
                return this.leftTile;
            default:
                throw new Error('Unknown direction ' + direction);
        }
    }

    public getImageWithRemovedBorders(): string[] {
        return this.layout.slice(1, -1).map(line => line.slice(1, -1));
    }

    public align(): boolean {
        if (this.top === this.layout[0]) {
            return true;
        }
        if (this.bottom === this.layout[0]) {
            this.layout = [...this.layout.reverse()];
        } else if (this.bottom === reverse(this.layout[0])) {
            this.layout = [...this.layout.reverse().map(line => reverse(line))];
        } else if (this.bottom === reverse(this.bottom)) {
            this.layout = this.layout.map(line => reverse(line));
        } else {
            this.layout = this.rotateClockwise();
        }

        return this.align();
    }

    private rotateClockwise(): string[] {
        const flipped: string[][] = [];
        for (let index = 0; index < this.layout[0].length; index++) {
            flipped.push([]);
        }

        for (let i = 0; i < this.layout.length; i++) {
            for (let j = 0; j < this.layout[i].length; j++) {
                flipped[j][this.layout.length - 1 - i] = this.layout[i][j];
            }
        }
        return flipped.map(line => line.join(''));
    }
}
