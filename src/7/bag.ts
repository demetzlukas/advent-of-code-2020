export class Bag {
    private _color: string;
    public get color(): string {
        return this._color;
    }
    public set color(v: string) {
        this._color = v;
    }

    private _containedBags: { bag: Bag; quantity: number }[];
    public get containedBags(): { bag: Bag; quantity: number }[] {
        return this._containedBags;
    }
    public set containedBags(v: { bag: Bag; quantity: number }[]) {
        this._containedBags = v;
    }

    private _containingBags: Bag[];
    public get containingBags(): Bag[] {
        return this._containingBags;
    }
    public set containingBags(v: Bag[]) {
        this._containingBags = v;
    }

    constructor(color: string) {
        this.color = color;
        this.containedBags = [];
        this.containingBags = [];
    }

    public addContainedBag(bag: Bag, quantity: number) {
        this.containedBags.push({ bag, quantity });
    }

    public addContainingBag(bag: Bag) {
        this.containingBags.push(bag);
    }

    public calculateNeededBags(): number {
        return (
            1 +
            this.containedBags
                .map(
                    ({ bag, quantity }) => quantity * bag.calculateNeededBags()
                )
                .reduce((sum, current) => sum + current, 0)
        );
    }
}
