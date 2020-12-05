import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/5.txt';

function getRange(
    directions: string,
    low: number,
    high: number,
    up: string,
    down: string
): number {
    directions.split('').forEach(direction => {
        const distance = Math.round((high - low) / 2);
        if (direction === up) {
            low += distance;
        } else if (direction === down) {
            high -= distance;
        }
    });

    return Math.min(low, high);
}
function getRow(directions: string) {
    return getRange(directions, 0, 127, 'B', 'F');
}

function getSeat(directions: string): number {
    return getRange(directions, 0, 7, 'R', 'L');
}

function getSeatID(directions: string): number {
    return (
        getRow(directions.substring(0, 7)) * 8 +
        getSeat(directions.substring(7))
    );
}

function findMissingSeatID(seatIDs: number[]): number {
    for (const seatID of seatIDs) {
        if (!seatIDs.includes(seatID + 1) && seatIDs.includes(seatID + 2)) {
            return seatID + 1;
        }
    }

    throw new Error('No missing id found');
}

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n');
    const seatIDs = input.map(line => getSeatID(line)).sort((a, b) => a - b);

    console.log(`Part 1: ${seatIDs[seatIDs.length - 1]}`);

    console.log(`Part 2: ${findMissingSeatID(seatIDs)}`);
}
