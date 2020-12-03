import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/3.txt';

const TREE = '#';
const EMPTY = '.';

const oneDownOneRight = (line: number, column: number): number[] => [
    line + 1,
    column + 1,
];
const oneDownThreeRight = (line: number, column: number): number[] => [
    line + 1,
    column + 3,
];
const oneDownFiveRight = (line: number, column: number): number[] => [
    line + 1,
    column + 5,
];
const oneDownSevenRight = (line: number, column: number): number[] => [
    line + 1,
    column + 7,
];
const twoDownOneRight = (line: number, column: number): number[] => [
    line + 2,
    column + 1,
];

function getNumberOfTrees(
    input: string[],
    increasingFunction: { (line: number, column: number): number[] }
): number {
    let numberOfTrees = 0;
    let column = 0;
    let lines = 0;
    while (lines < input.length) {
        if (input[lines][column] == TREE) numberOfTrees++;
        [lines, column] = increasingFunction(lines, column);
        column %= input[0].length;
    }

    return numberOfTrees;
}

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n');
    console.log(`Part 1: ${getNumberOfTrees(input, oneDownThreeRight)}`);

    console.log(
        `Part 2: ${
            getNumberOfTrees(input, oneDownOneRight) *
            getNumberOfTrees(input, oneDownThreeRight) *
            getNumberOfTrees(input, oneDownFiveRight) *
            getNumberOfTrees(input, oneDownSevenRight) *
            getNumberOfTrees(input, twoDownOneRight)
        }`
    );
}
