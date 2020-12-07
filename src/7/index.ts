import { readLinesFromInput } from '../utils/readFile';
import { Bag } from './bag';

const fileName = './input/7.txt';

const REGEX = /(\d+) ([a-z ]+) bag[s]?/;

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n');
    const bags: Map<string, Bag> = new Map();
    input.forEach(line => {
        const [color, containedBags] = line.split(/ bags contain /);
        let bag = bags.get(color);
        if (!bag) {
            bag = new Bag(color);
            bags.set(color, bag);
        }
        containedBags
            .replace('.', '')
            .split(/, /)
            .filter(s => REGEX.test(s))
            .forEach(s => {
                const [_, quantity, color] = s.match(REGEX);
                let b = bags.get(color);
                if (!b) {
                    b = new Bag(color);
                    bags.set(color, b);
                }
                bag.addContainedBag(b, parseInt(quantity));
                b.addContainingBag(bag);
            });
    });

    const colorToSearch = 'shiny gold';
    const bagToSearch = bags.get(colorToSearch);
    const containingBags: Set<Bag> = new Set();
    const bagsToVisit: Bag[] = [bagToSearch];

    while (bagsToVisit.length > 0) {
        const bag = bagsToVisit.pop();
        bag.containingBags.forEach(b => {
            if (!containingBags.has(b)) {
                bagsToVisit.push(b);
                containingBags.add(b);
            }
        });
    }
    console.log(`Part 1: ${containingBags.size}`);

    console.log(`Part 2: ${bagToSearch.calculateNeededBags() - 1}`);
}
