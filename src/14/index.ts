import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/14.txt';

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n');
    let values: Map<string, bigint> = new Map();
    let maskValues: { zeroes: bigint; ones: bigint };

    input.forEach(line => {
        if (line.startsWith('mask')) {
            maskValues = getMaskValues(line.substring(7));
        } else {
            const [_, index, value] = line.match(/mem\[(\d+)\] = (\d+)/);
            let number = BigInt(parseInt(value));

            number &= maskValues.zeroes;
            number |= maskValues.ones;
            values.set(index, number);
        }
    });

    console.log(
        `Part 1: ${[...values.values()].reduce(
            (sum, current) => sum + current
        )}`
    );

    values = new Map();
    let mask: string;
    input.forEach(line => {
        if (line.startsWith('mask')) {
            mask = line.substring(7);
        } else {
            const [_, index, value] = line.match(/mem\[(\d+)\] = (\d+)/);
            let number = parseInt(value);

            const indices: string[] = getAllIndices(
                Number(index).toString(2).padStart(36, '0'),
                mask
            );

            indices.forEach(index => {
                values.set(index, BigInt(number));
            });
        }
    });

    console.log(
        `Part 2: ${[...values.values()].reduce(
            (sum, current) => sum + current
        )}`
    );
}

function getAllIndices(index: string, mask: string): string[] {
    return getAllCombinations(getMaskedIndex(index, mask).split('X'), 0)
        .map(index => parseInt(index, 2))
        .map(index => index.toString());
}

function getAllCombinations(parts: string[], index: number): string[] {
    if (index == parts.length - 1) {
        return [parts[index]];
    }
    let result: string[] = [];
    const subparts = getAllCombinations(parts, index + 1);

    for (const padding of [0, 1]) {
        for (const subpart of subparts) {
            result.push(parts[index] + padding + subpart);
        }
    }

    return result;
}

function getMaskedIndex(index: string, mask: string): string {
    let maskedIndex: string[] = [];

    for (const [i, character] of mask.split('').entries()) {
        if (character === 'X') maskedIndex.push('X');
        else if (character === '1') maskedIndex.push('1');
        else maskedIndex.push(index[i]);
    }

    return maskedIndex.join('');
}

function getMaskValues(mask: string): { zeroes: bigint; ones: bigint } {
    const zeroes =
        [...mask.split('').entries()]
            .filter(([_, value]) => value == '0')
            .map(([index, _]) => index)
            .map(index => BigInt(Math.pow(2, mask.length - 1 - index)))
            .reduce((sum, current) => sum + current) ^
        BigInt(Math.pow(2, mask.length + 1) - 1);

    const ones = [...mask.split('').entries()]
        .filter(([_, value]) => value == '1')
        .map(([index, _]) => index)
        .map(index => BigInt(Math.pow(2, mask.length - 1 - index)))
        .reduce((sum, current) => sum + current);

    return { zeroes, ones };
}
