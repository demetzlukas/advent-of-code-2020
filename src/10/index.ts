import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/10.txt';

export async function main() {
    const input = (await readLinesFromInput(fileName, '\r\n'))
        .map(number => parseInt(number))
        .sort((a, b) => a - b);

    input.push(input[input.length - 1] + 3);
    const differences = [0, 0, 0];
    let jolt = 0;

    for (const lowest of input) {
        differences[lowest - jolt - 1]++;
        jolt = lowest;
    }

    console.log(`Part 1: ${differences[0] * differences[2]}`);

    // cheated here a bit ... :(

    const paths = [1];
    for (const element of input) {
        paths[element] = 0;
        for (let i = 1; i < 4; i++) {
            if (paths[element - i]) {
                paths[element] += paths[element - i];
            }
        }
    }

    console.log(`Part 2: ${paths.pop()}`);
}
