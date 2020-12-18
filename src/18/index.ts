import { cloneDeep } from 'lodash';
import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/18.txt';

export async function main() {
    const input = (await readLinesFromInput(fileName, '\r\n')).map(line =>
        line.replace(/\(/g, '( ').replace(/\)/g, ' )').split(' ')
    );

    console.log(
        `Part 1: ${cloneDeep(input)
            .map(line => calculate(line))
            .reduce((sum, current) => sum + current)}`
    );
    console.log(
        `Part 2: ${cloneDeep(input)
            .map(line => calculateV2(line))
            .reduce((sum, current) => sum + current)}`
    );
}

function calculate(input: string[]): number {
    const values: number[] = [];
    let operation = '';
    while (input.length > 0) {
        const element = input.shift();
        if (/\d+/.test(element)) {
            values.push(parseInt(element));
        } else if (['+', '*'].includes(element)) {
            operation = element;
        } else if (element === '(') {
            let closing = findClosingParenthesis(input);
            values.push(calculate(input.slice(0, closing)));
            input = input.slice(closing + 1);
        }

        if (values.length == 2) {
            const y = values.pop();
            const x = values.pop();

            switch (operation) {
                case '+':
                    values.push(x + y);
                    break;
                case '*':
                    values.push(x * y);
                    break;
                default:
                    throw new Error(`Unknown operation '${operation}'`);
            }
        }
    }

    return values.pop();
}

function calculateV2(input: string[]): number {
    const values: number[] = [];
    let operation = '';
    while (input.length > 0) {
        const element = input.shift();
        if (/\d+/.test(element)) {
            values.push(parseInt(element));
        } else if (element === '+') {
            operation = element;
            continue;
        } else if (element === '(') {
            let closing = findClosingParenthesis(input);
            values.push(calculateV2(input.slice(0, closing)));
            input = input.slice(closing + 1);
        }

        if (operation == '+' && values.length >= 2) {
            const y = values.pop();
            const x = values.pop();

            values.push(x + y);
            operation = '';
        }
    }
    if (values.length === 0) {
        return values.pop();
    }

    return values.reduce((product, current) => product * current, 1);
}

function findClosingParenthesis(input: string[]): number {
    let foundOpening = 0;
    for (const [index, c] of input.entries()) {
        if (c === '(') foundOpening++;
        else if (c === ')') {
            if (foundOpening === 0) return index;
            foundOpening--;
        }
    }

    throw new Error('No matching parenthesis found');
}
