import { cloneDeep, isEqual } from 'lodash';
import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/11.txt';

const EMPTY = '.';
const SEAT = 'L';
const OCCUPIED = '#';

export async function main() {
    const input = (await readLinesFromInput(fileName, '\r\n')).map(line =>
        line.split('')
    );

    console.log(
        `Part 1: ${getStabilizedFloor(input, evolve)
            .map(line => line.filter(cell => cell == OCCUPIED).length)
            .reduce((sum, current) => sum + current)}`
    );

    console.log(
        `Part 2: ${getStabilizedFloor(input, evolveV2)
            .map(line => line.filter(cell => cell == OCCUPIED).length)
            .reduce((sum, current) => sum + current)}`
    );
}

function evolve(floor: string[][]): string[][] {
    const nextFloor: string[][] = cloneDeep(floor);

    for (let i = 0; i < floor.length; i++) {
        for (let j = 0; j < floor[i].length; j++) {
            const cell = floor[i][j];

            const adjacentOccupied = getAdjacentOccupiedSeats(i, j, floor);
            if (cell === SEAT && adjacentOccupied === 0) {
                nextFloor[i][j] = OCCUPIED;
            } else if (cell === OCCUPIED && adjacentOccupied >= 4) {
                nextFloor[i][j] = SEAT;
            }
        }
    }

    return nextFloor;
}

function getStabilizedFloor(
    input: string[][],
    evolveFunction: {
        (floor: string[][]): string[][];
    }
): string[][] {
    let floor = cloneDeep(input);
    while (true) {
        const nextFloor = evolveFunction(floor);

        if (isEqual(nextFloor, floor)) {
            return nextFloor;
        }

        floor = nextFloor;
    }
}

function getAdjacentOccupiedSeats(
    row: number,
    column: number,
    floor: string[][]
): number {
    let occupied = 0;

    for (const i of [-1, 0, 1]) {
        for (const j of [-1, 0, 1]) {
            // continue if same field
            if (i === j && i === 0) {
                continue;
            }
            // continue if out of bounds
            if (
                i + row < 0 ||
                i + row == floor.length ||
                j + column < 0 ||
                j + column == floor[row].length
            ) {
                continue;
            }
            if (floor[i + row][j + column] === OCCUPIED) occupied++;
        }
    }

    // original solution
    // if (row - 1 > -1) {
    //     if (column > 0 && floor[row - 1][column - 1] === OCCUPIED)
    //         adjacentOccupied++;
    //     if (floor[row - 1][column] === OCCUPIED) adjacentOccupied++;
    //     if (floor[row - 1][column + 1] === OCCUPIED) adjacentOccupied++;
    // }
    // if (floor[row][column - 1] === OCCUPIED) adjacentOccupied++;
    // if (floor[row][column + 1] === OCCUPIED) adjacentOccupied++;
    // if (row < floor.length - 1) {
    //     if (floor[row + 1][column - 1] === OCCUPIED) adjacentOccupied++;
    //     if (floor[row + 1][column] === OCCUPIED) adjacentOccupied++;
    //     if (floor[row + 1][column + 1] === OCCUPIED) adjacentOccupied++;
    // }

    return occupied;
}

function getAdjacentOccupiedSeatsV2(
    row: number,
    column: number,
    floor: string[][]
): number {
    let occupied = 0;

    // up
    for (let i = row + 1; i < floor.length; i++) {
        const cell = floor[i][column];
        if (cell === SEAT) break;
        if (cell == OCCUPIED) {
            occupied++;
            break;
        }
    }

    // down
    for (let i = row - 1; i > -1; i--) {
        const cell = floor[i][column];
        if (cell === SEAT) break;
        if (cell == OCCUPIED) {
            occupied++;
            break;
        }
    }

    // right
    for (let j = column + 1; j < floor[row].length; j++) {
        const cell = floor[row][j];
        if (cell === SEAT) break;
        if (cell == OCCUPIED) {
            occupied++;
            break;
        }
    }

    // left
    for (let j = column - 1; j > -1; j--) {
        const cell = floor[row][j];
        if (cell === SEAT) break;
        if (cell == OCCUPIED) {
            occupied++;
            break;
        }
    }

    // left up
    for (
        let i = row - 1, j = column + 1;
        i > -1 && j < floor[row].length;
        i--, j++
    ) {
        const cell = floor[i][j];
        if (cell === SEAT) break;
        if (cell == OCCUPIED) {
            occupied++;
            break;
        }
    }

    // left down
    for (let i = row - 1, j = column - 1; i > -1 && j > -1; i--, j--) {
        const cell = floor[i][j];
        if (cell === SEAT) break;
        if (cell == OCCUPIED) {
            occupied++;
            break;
        }
    }

    // right down
    for (
        let i = row + 1, j = column - 1;
        i < floor.length && j > -1;
        i++, j--
    ) {
        const cell = floor[i][j];
        if (cell === SEAT) break;
        if (cell == OCCUPIED) {
            occupied++;
            break;
        }
    }

    // right up
    for (
        let i = row + 1, j = column + 1;
        i < floor.length && j < floor[row].length;
        i++, j++
    ) {
        const cell = floor[i][j];
        if (cell === SEAT) break;
        if (cell == OCCUPIED) {
            occupied++;
            break;
        }
    }

    return occupied;
}

function evolveV2(floor: string[][]): string[][] {
    const nextFloor: string[][] = cloneDeep(floor);

    for (let i = 0; i < floor.length; i++) {
        for (let j = 0; j < floor[i].length; j++) {
            const cell = floor[i][j];

            const adjacentOccupied = getAdjacentOccupiedSeatsV2(i, j, floor);
            if (cell === SEAT && adjacentOccupied === 0) {
                nextFloor[i][j] = OCCUPIED;
            } else if (cell === OCCUPIED && adjacentOccupied >= 5) {
                nextFloor[i][j] = SEAT;
            }
        }
    }

    return nextFloor;
}
