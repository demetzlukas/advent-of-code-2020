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

    public getBagsThisBagIsIncluded(): Set<Bag> {
        const containingBags: Set<Bag> = new Set();
        const bagsToVisit: Bag[] = [this];

        while (bagsToVisit.length > 0) {
            const bag = bagsToVisit.pop();
            bag.containingBags.forEach(b => {
                if (!containingBags.has(b)) {
                    bagsToVisit.push(b);
                    containingBags.add(b);
                }
            });
        }

        return containingBags;
    }

    public getNumberOfBagsNeededForThisBag(): number {
        return this.calculateNeededBags() - 1;
    }

    private calculateNeededBags(): number {
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
