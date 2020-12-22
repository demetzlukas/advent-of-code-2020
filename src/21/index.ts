import { intersection } from 'lodash';
import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/21.txt';

export async function main() {
    const possibleAllergicIngredients: Map<string, string[]> = new Map();
    const nonAllergic: Set<string> = new Set();
    const foods: string[][] = [];
    (await readLinesFromInput(fileName, '\r\n')).forEach(line => {
        const [first, second] = line.split('(contains');
        const ingredients = first.trim().split(' ');
        foods.push(ingredients);
        ingredients.forEach(i => nonAllergic.add(i));

        const allergens = second
            .replace(')', '')
            .replace(/,/g, '')
            .trim()
            .split(' ');

        allergens.forEach(allergen => {
            let i = possibleAllergicIngredients.get(allergen);
            if (!i) {
                possibleAllergicIngredients.set(allergen, [...ingredients]);
            } else {
                possibleAllergicIngredients.set(
                    allergen,
                    intersection(i, ingredients)
                );
            }
        });
    });

    possibleAllergicIngredients.forEach(ingredients =>
        ingredients.forEach(a => nonAllergic.delete(a))
    );

    console.log(
        `Part 1: ${foods
            .map(
                food =>
                    food.filter(ingredient => nonAllergic.has(ingredient))
                        .length
            )
            .reduce((sum, current) => sum + current)}`
    );

    const assignment: Map<string, string> = new Map();
    const removed: Set<string> = new Set();
    let keys = [...possibleAllergicIngredients.keys()];

    while (keys.length > 0) {
        const key = keys.shift();
        const value = possibleAllergicIngredients.get(key);
        if (value.length === 1) {
            assignment.set(key, value[0]);
            removed.add(value[0]);
        } else {
            possibleAllergicIngredients.set(
                key,
                value.filter(v => !removed.has(v))
            );
            keys.push(key);
        }
    }

    const sorted = new Map([...assignment.entries()].sort());
    console.log(`Part 2: ${[...sorted.values()].join(',')}`);
}
