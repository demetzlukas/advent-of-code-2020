import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/9.txt';

const RANGE = 25;

export async function main() {
    const input = (await readLinesFromInput(fileName, '\r\n')).map(number =>
        parseInt(number)
    );

    let wrongNumber = -1;

    for (let index = RANGE; index < input.length; index++) {
        const element = input[index];
        if (!addsUp(element, input.slice(index - RANGE, index))) {
            wrongNumber = element;
        }
    }

    console.log(`Part 1: ${wrongNumber}`);

    const addingNumbers = findAddingNumbers(wrongNumber, input).sort(
        (a, b) => a - b
    );
    console.log(`Part 2: ${addingNumbers.shift() + addingNumbers.pop()}`);
}

function addsUp(key: number, values: number[]): boolean {
    for (let i = 0; i < values.length - 1; i++) {
        const a = values[i];

        for (let j = i + 1; j < values.length; j++) {
            const b = values[j];

            if (a + b === key) return true;
        }
    }

    return false;
}

function findAddingNumbers(key: number, values: number[]): number[] {
    for (let start = 0; start < values.length - 1; start++) {
        for (let end = start + 1; end < values.length; end++) {
            const slice = values.slice(start, end);
            const sum = slice.reduce((sum, current) => sum + current);

            if (sum === key) {
                return slice;
            }
        }
    }

    return [];
}
