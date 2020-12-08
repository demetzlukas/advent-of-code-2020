import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/8.txt';

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n');

    console.log(`Part 1: ${getValueOfAccumulator(input, -1).accumulator}`);
    console.log(
        `Part 2: ${getValueOfAccumulatorWithChangedInstructions(input)}`
    );
}

function getValueOfAccumulator(lines: string[], operationToChange: number) {
    let instructions = lines.map(line => {
        const [type, value] = line.split(' ');
        return { type, value: parseInt(value), executed: false };
    });
    let operationToChangeCounter = 0;
    let accumulator = 0;
    let index = 0;
    let line: { type: string; value: number; executed: boolean };
    while (
        index < instructions.length &&
        !(line = instructions[index]).executed
    ) {
        if (operationToChangeCounter === operationToChange) {
            if (line.type === 'nop') {
                line.type = 'jmp';
            } else if (line.type === 'jmp') {
                line.type = 'nop';
            }
        }

        line.executed = true;
        switch (line.type) {
            case 'nop':
                index++;
                operationToChangeCounter++;
                break;
            case 'acc':
                accumulator += line.value;
                index++;
                break;
            case 'jmp':
                index += line.value;
                operationToChangeCounter++;
                break;

            default:
                throw new Error('Unknown operation code');
        }
    }

    return { accumulator, index };
}

function getValueOfAccumulatorWithChangedInstructions(lines: string[]) {
    let operationToChange = 0;
    while (operationToChange < lines.length) {
        const { accumulator, index } = getValueOfAccumulator(
            lines,
            operationToChange
        );
        if (index == lines.length) return accumulator;
        operationToChange++;
    }
}
