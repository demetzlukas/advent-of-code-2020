import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/17.txt';

const ACTIVE = '#';
const INACTIVE = '.';

export async function main() {
    let input = (await readLinesFromInput(fileName, '\r\n')).map(line =>
        line.split('')
    );

    // Part 1
    let actives: Set<string> = new Set();
    input.forEach((line, x) =>
        line.forEach((cube, y) => {
            if (cube === ACTIVE) actives.add([x, y, 0].join(','));
        })
    );

    for (const _ of Array(6).keys()) {
        actives = stepV1(actives);
    }

    console.log(`Part 1: ${actives.size}`);

    // Part 2
    actives = new Set();
    input.forEach((line, x) =>
        line.forEach((cube, y) => {
            if (cube === ACTIVE) actives.add([x, y, 0, 0].join(','));
        })
    );

    for (const _ of Array(6).keys()) {
        actives = stepV2(actives);
    }

    console.log(`Part 2: ${actives.size}`);
}

function stepV1(actives: Set<string>): Set<string> {
    const next: Set<string> = new Set();

    for (const cube of actives) {
        const [x, y, z] = cube.split(',').map(v => parseInt(v));
        for (const [nx, ny, nz] of neighbors(x, y, z)) {
            if (
                !actives.has([nx, ny, nz].join(',')) &&
                getNumberOfAdjacentActive(actives, nx, ny, nz) == 3
            )
                next.add([nx, ny, nz].join(','));
        }
        const numberOfAdjacent = getNumberOfAdjacentActive(actives, x, y, z);
        if (numberOfAdjacent === 2 || numberOfAdjacent === 3)
            next.add([x, y, z].join(','));
    }

    return next;
}

function stepV2(actives: Set<string>): Set<string> {
    const next: Set<string> = new Set();

    for (const cube of actives) {
        const [x, y, z, a] = cube.split(',').map(v => parseInt(v));
        for (const [nx, ny, nz, na] of neighbors(x, y, z, a)) {
            if (
                !actives.has([nx, ny, nz, na].join(',')) &&
                getNumberOfAdjacentActive(actives, nx, ny, nz, na) == 3
            )
                next.add([nx, ny, nz, na].join(','));
        }
        const numberOfAdjacent = getNumberOfAdjacentActive(actives, x, y, z, a);
        if (numberOfAdjacent === 2 || numberOfAdjacent === 3)
            next.add([x, y, z, a].join(','));
    }

    return next;
}

function getNumberOfAdjacentActive(
    cubes: Set<string>,
    x: number,
    y: number,
    z: number,
    a: number = undefined
): number {
    let adjacent = 0;

    for (const n of neighbors(x, y, z, a)) {
        if (cubes.has(n.join(','))) adjacent++;
    }

    return adjacent;
}

function* neighbors(x: number, y: number, z: number, a: number = undefined) {
    for (const dx of [-1, 0, 1]) {
        for (const dy of [-1, 0, 1]) {
            for (const dz of [-1, 0, 1]) {
                if (a === undefined) {
                    if (dx == 0 && dy == 0 && dz == 0) continue;
                    yield [x + dx, y + dy, z + dz];
                }
                for (const da of [-1, 0, 1]) {
                    if (dx == 0 && dy == 0 && dz == 0 && da == 0) continue;
                    yield [x + dx, y + dy, z + dz, a + da];
                }
            }
        }
    }
}
