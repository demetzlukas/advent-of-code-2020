import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/8.txt';

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n');

    console.log(`Part 1: ${getValueOfAccumulator(input).accumulator}`);
    console.log(
        `Part 2: ${getValueOfAccumulatorWithChangedInstructions(input)}`
    );
}

function getValueOfAccumulator(lines: string[]) {
    let instructions = lines.map(line => {
        const [type, value] = line.split(' ');
        return { type, value: parseInt(value), executed: false };
    });

    let accumulator = 0;
    let index = 0;
    let line: { type: string; value: number; executed: boolean };

    while (
        index < instructions.length &&
        !(line = instructions[index]).executed
    ) {
        line.executed = true;
        switch (line.type) {
            case 'nop':
                index++;
                break;
            case 'acc':
                accumulator += line.value;
                index++;
                break;
            case 'jmp':
                index += line.value;
                break;

            default:
                throw new Error('Unknown operation code');
        }
    }

    return { accumulator, index };
}

function getValueOfAccumulatorWithChangedInstructions(lines: string[]) {
    for (let i = 0; i < lines.length; i++) {
        let linesCopy = [...lines];

        if (linesCopy[i].startsWith('jmp')) {
            linesCopy[i] = linesCopy[i].replace('jmp', 'nop');
        } else if (linesCopy[i].startsWith('nop')) {
            linesCopy[i] = linesCopy[i].replace('nop', 'jmp');
        } else {
            continue;
        }

        const { accumulator, index } = getValueOfAccumulator(linesCopy);

        if (index == linesCopy.length) return accumulator;
    }
    return -1;
}
