import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/1.txt';

function findTwoNumbers(input: number[]): number[] {
    for (let i = 0; i < input.length; i++) {
        const first = input[i];
        for (let j = i + 1; j < input.length; j++) {
            const second = input[j];

            if (first + second == 2020) {
                return [first, second];
            }
        }
    }

    throw new Error("No matching numbers found");
}

function findThreeNumbers(input: number[]): number[] {
    for (let i = 0; i < input.length; i++) {
        const first = input[i];
        for (let j = i + 1; j < input.length; j++) {
            const second = input[j];

            for (let k = j + 1; k < input.length; k++) {
                const third = input[k];

                if (first + second + third == 2020) {
                    return [first, second, third];
                }
            }
        }
    }

    throw new Error("No matching numbers found");
}

export async function main() {
    const input = (await readLinesFromInput(fileName, '\r\n')).map(v =>
        parseInt(v)
    );

    const [first, second] = findTwoNumbers(input);

    console.log(`Part 1: ${first * second}`);

    const [one, two, three] = findThreeNumbers(input);

    console.log(`Part 2: ${one * two * three}`);
}
