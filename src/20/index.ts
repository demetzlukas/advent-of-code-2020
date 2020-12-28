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
                for (const direction of Tile.DIRECTIONS) {
                    const oppositeDirection = (direction + 2) % 4;
                    if (
                        !firstTile.getTile(direction) &&
                        !secondTile.getTile(oppositeDirection)
                    ) {
                        if (
                            firstTile.get(direction) ===
                                secondTile.get(oppositeDirection) ||
                            firstTile.get(direction) ===
                                reverse(secondTile.get(oppositeDirection))
                        ) {
                            firstTile.setTile(direction, secondTile);
                            secondTile.setTile(oppositeDirection, firstTile);
                            if (
                                firstTile.get(direction) ===
                                reverse(secondTile.get(oppositeDirection))
                            ) {
                                if (direction % 2 === 1) {
                                    secondTile.flipHorizontally([firstTile.id]);
                                } else {
                                    secondTile.flipVertically([firstTile.id]);
                                }
                            }
                            assignments++;
                            break;
                        }
                    }
                }

                secondTile.flip();
            }
        }
    }

    const corners = tiles.filter(tile => tile.getNumberOfNeighbors() === 2);
    console.log(
        `Part 1: ${corners
            .map(tile => tile.id)
            .reduce((product, current) => product * current, 1)}`
    );
    tiles.forEach(tile => tile.align());

    const topLeft = corners
        .filter(tile => !tile.rightTile && !tile.topTile)
        .pop();

    let startOfLine = topLeft;

    const imageArray: string[] = [];

    while (startOfLine) {
        let tile = startOfLine;
        let tempArray: string[] = [];

        while (tile) {
            tempArray = concatStringArray(
                tile.getImageWithRemovedBorders(),
                tempArray
            );
            tile = tile.leftTile;
        }
        imageArray.push(...tempArray);

        startOfLine = startOfLine.bottomTile;
    }

    const finalTile = new Tile(1, imageArray);
    foo(finalTile);

    console.log(
        `Part 2: ${
            finalTile.layout
                .join('')
                .split('')
                .filter(character => character === '#').length
        }`
    );
}

function concatStringArray(first: string[], second: string[]): string[] {
    const result: string[] = [];

    for (const line of Array(first.length).keys()) {
        result.push(
            (!first[line] ? '' : first[line]) +
                (!second[line] ? '' : second[line])
        );
    }

    return result;
}

function findMonster(image: string): string {
    const regex = /#([#O\.]{77})#([#O\.]{4})##([#O\.]{4})##([#O\.]{4})###([#O\.]{77})#([#O\.]{2})#([#O\.]{2})#([#O\.]{2})#([#O\.]{2})#([#O\.]{2})#/g;
    // const regex = /#([#\.]{5})#([#\.]{4})##([#\.]{4})##([#\.]{4})###([#\.]{5})#([#\.]{2})#([#\.]{2})#([#\.]{2})#([#\.]{2})#([#\.]{2})#/;

    const replace = 'O$1O$2OO$3OO$4OOO$5O$6O$7O$8O$9O$10O';

    return image.replace(regex, replace);
}

function containsMonster(image: string): boolean {
    return (
        image.match(
            /#([#O\.]{77})#([#O\.]{4})##([#O\.]{4})##([#O\.]{4})###([#O\.]{77})#([#O\.]{2})#([#O\.]{2})#([#O\.]{2})#([#O\.]{2})#([#O\.]{2})#/g
        )?.length > 0
    );
    // return image.match(
    //     /#([#\.]{5})#([#\.]{4})##([#\.]{4})##([#\.]{4})###([#\.]{5})#([#\.]{2})#([#\.]{2})#([#\.]{2})#([#\.]{2})#([#\.]{2})#/g
    // )?.length;
}

function foo(tile: Tile): boolean {
    for (const i of Array(4).keys()) {
        for (const _ of Array(4)) {
            while (containsMonster(tile.layout.join(''))) {
                tile.layout = splitString(findMonster(tile.layout.join('')));
            }
            tile.flip();
            tile.align();
        }
        if (i % 2 === 0) {
            tile.flipHorizontally();
        } else {
            tile.flipVertically();
        }
        tile.align();
    }

    return false;
}

function splitString(string: string): string[] {
    const result: string[] = [];

    while (string.length > 0) {
        result.push(string.substring(0, 96));
        string = string.substring(96);
    }

    return result;
}
