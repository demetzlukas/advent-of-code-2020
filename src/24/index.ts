import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/24.txt';

export async function main() {
    const input = (await readLinesFromInput(fileName, '\r\n')).map(line =>
        line.split('')
    );

    let tiles: Map<string, boolean> = new Map();

    input.forEach(line => {
        let point = [0, 0];
        while (line.length > 0) {
            const c = line.shift();

            switch (c) {
                case 'e':
                case 'w':
                    point = move(c, point);
                    break;
                case 'n':
                case 's':
                    point = move(c + line.shift(), point);
                    break;
                default:
                    throw new Error('Unknown char ' + c);
            }
        }
        const pointAsString = point.join(',');
        const tile = tiles.get(pointAsString);
        if (tile === undefined) {
            tiles.set(pointAsString, true);
        } else {
            tiles.set(pointAsString, !tile);
        }
    });

    console.log(`Part 1: ${[...tiles.values()].filter(t => t).length}`);

    for (const _ of Array(100)) {
        tiles = addMissingWhite(tiles);
        const next: Map<string, boolean> = new Map();
        for (const [key, black] of tiles) {
            const tile = key.split(',').map(x => parseInt(x));
            const neighbors = getNumberOfAdjacentBlack(tile, tiles);
            if (black && (neighbors === 0 || neighbors > 2)) {
                next.set(key, false);
            } else if (!black && neighbors === 2) {
                next.set(key, true);
            } else {
                next.set(key, black);
            }
        }
        tiles = next;
    }

    console.log(`Part 2: ${[...tiles.values()].filter(t => t).length}`);
}

function addMissingWhite(tiles: Map<string, boolean>) {
    const next: Map<string, boolean> = new Map(tiles);
    for (const key of tiles.keys()) {
        const tile = key.split(',').map(x => parseInt(x));

        for (const neighbor of getAdjacent(tile)) {
            if (!next.has(neighbor.join(','))) {
                next.set(neighbor.join(','), false);
            }
        }
    }

    return next;
}

function move(direction: string, tile: number[]): number[] {
    const [x, y] = tile;
    switch (direction) {
        case 'e':
            return [x, y + 2];
        case 'ne':
            return [x + 1, y + 1];
        case 'se':
            return [x - 1, y + 1];
        case 'sw':
            return [x - 1, y - 1];
        case 'nw':
            return [x + 1, y - 1];
        case 'w':
            return [x, y - 2];
        default:
            throw new Error('Unknown direction ' + direction);
    }
}

function* getAdjacent(tile: number[]) {
    const [x, y] = tile;
    yield [x, y + 2];
    yield [x + 1, y + 1];
    yield [x - 1, y + 1];
    yield [x - 1, y - 1];
    yield [x + 1, y - 1];
    yield [x, y - 2];
}

function getNumberOfAdjacentBlack(
    tile: number[],
    tiles: Map<string, boolean>
): number {
    let count = 0;
    for (const n of getAdjacent(tile)) {
        if (tiles.get(n.join(','))) {
            count++;
        }
    }

    return count;
}
