import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/15.txt';

export async function main() {
    const startingNumbers = (await readLinesFromInput(fileName, '\r\n'))[0]
        .split(',')
        .map(number => parseInt(number));

    const spokenNumbers: number[] = [...startingNumbers];
    const occurrences: Map<number, number> = new Map();

    for (let index = 0; index < spokenNumbers.length - 1; index++) {
        const element = spokenNumbers[index];
        occurrences.set(element, index);
    }

    while (spokenNumbers.length < 30000000) {
        const lastSpoken = spokenNumbers[spokenNumbers.length - 1];
        let o = occurrences.get(lastSpoken);
        if (o === undefined) {
            occurrences.set(lastSpoken, spokenNumbers.length - 1);
            spokenNumbers.push(0);
        } else {
            occurrences.set(lastSpoken, spokenNumbers.length - 1);
            spokenNumbers.push(spokenNumbers.length - 1 - o);
        }
    }

    console.log(spokenNumbers.pop());
}
