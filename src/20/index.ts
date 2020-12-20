import { reverse } from '../utils/string';
import { readLinesFromInput } from '../utils/readFile';
import { Tile } from './tile';

const fileName = './input/20.txt';

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n\r\n');

    const tiles = input.map(block => {
        const temp = block.split('\r\n');
        const [id] = temp.shift().match(/\d+/);
        return new Tile(
            parseInt(id),
            temp.map(line => line)
        );
    });

    for (let first = 0; first < tiles.length - 1; first++) {
        const firstTile = tiles[first];

        let assignments = 0;
        for (let second = first + 1; second < tiles.length; second++) {
            if (assignments === 4) {
                break;
            }
            const secondTile = tiles[second];

            for (const _ of Array(4)) {
                if (!firstTile.bottomTile && !secondTile.topTile) {
                    if (
                        firstTile.bottom === secondTile.top ||
                        firstTile.bottom === reverse(secondTile.top)
                    ) {
                        firstTile.bottomTile = secondTile;
                        secondTile.topTile = firstTile;
                        assignments++;
                        break;
                    }
                }
                if (!firstTile.topTile && !secondTile.bottomTile) {
                    if (
                        firstTile.top === secondTile.bottom ||
                        firstTile.top === reverse(secondTile.bottom)
                    ) {
                        firstTile.topTile = secondTile;
                        secondTile.bottomTile = firstTile;
                        assignments++;
                        break;
                    }
                }
                if (!firstTile.leftTile && !secondTile.rightTile) {
                    if (
                        firstTile.left === secondTile.right ||
                        firstTile.left === reverse(secondTile.right)
                    ) {
                        firstTile.leftTile = secondTile;
                        secondTile.rightTile = firstTile;
                        assignments++;
                        break;
                    }
                }
                if (!firstTile.rightTile && !secondTile.leftTile) {
                    if (
                        firstTile.right === secondTile.left ||
                        firstTile.right === reverse(secondTile.left)
                    ) {
                        firstTile.rightTile = secondTile;
                        secondTile.leftTile = firstTile;
                        assignments++;
                        break;
                    }
                }

                secondTile.flip();
            }
        }
    }

    const prod = tiles
        .filter(tile => {
            let n = 0;
            if (tile.topTile) n++;
            if (tile.bottomTile) n++;
            if (tile.leftTile) n++;
            if (tile.rightTile) n++;
            return n === 2;
        })
        .map(tile => tile.id);

    console.log(prod.reduce((product, current) => product * current, 1));

    const image =
        '.####...#####..#...###..#####..#..#.#.####..#.#..#.#...#.###...#.##.##..#.#.##.###.#.##.##.#####..##.###.####..#.####.##...#.#..##.##...#..#..###.##.#..#.#..#..##.#.#...###.##.....#...###.#...#.####.#.#....##.#..#.#.##...#..#....#..#...####..#.##...###..#.#####..#....#.##.#.#####....#.....##.##.###.....#.##..#.#...#...###..####....##..#.##...#.##.#.#.###...##.###.#..####...##..#...#.###...#.##...#.######..###.###.#######..#####...##.#..#..#.#######.####.#..##.########..#..##.#.#####..#.#...##..#....#....##..#.#########..###...#.....#..##...###.###..###....##.#...##.##.#';

    console.log(
        findMonster(image)
            .split('')
            .filter(character => character === '#').length
    );
}

function findMonster(image: string): string {
    const regex = /#([#\.]{5})#([#\.]{4})##([#\.]{4})##([#\.]{4})###([#\.]{5})#([#\.]{2})#([#\.]{2})#([#\.]{2})#([#\.]{2})#([#\.]{2})#/;

    const replace = 'O$1O$2OO$3OO$4OOO$5O$6O$7O$8O$9O$10O';

    let replaced = image.replace(regex, replace);
    replaced = replaced.replace(regex, replace);

    return replaced;
}
