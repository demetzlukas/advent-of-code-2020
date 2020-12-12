import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/12.txt';

export async function main() {
    const input = (await readLinesFromInput(fileName, '\r\n')).map(line =>
        line.match(/([A-Z])(\d+)/)
    );

    let east = 0;
    let north = 0;
    let facing = 90;
    for (const line of input) {
        let [_, direction, s] = line;
        let steps = parseInt(s);
        if (direction === 'F') {
            direction = getDirection(facing);
        }
        switch (direction) {
            case 'N':
                north += steps;
                break;
            case 'S':
                north -= steps;
                break;
            case 'E':
                east += steps;
                break;
            case 'W':
                east -= steps;
                break;
            case 'R':
                facing += steps % 360;
                break;
            case 'L':
                facing -= steps;
                facing = facing < 0 ? facing + 360 : facing;
                break;
            default:
                throw new Error('Unknown direction');
        }
    }

    console.log(`Part 1: ${Math.abs(north) + Math.abs(east)}`);

    let waypointX = 10;
    let waypointY = 1;
    let x = 0;
    let y = 0;
    for (const line of input) {
        let [_, direction, s] = line;
        let steps = parseInt(s);
        if (direction === 'F') {
            x += steps * waypointX;
            y += steps * waypointY;
        } else {
            switch (direction) {
                case 'N':
                    waypointY += steps;
                    break;
                case 'S':
                    waypointY -= steps;
                    break;
                case 'E':
                    waypointX += steps;
                    break;
                case 'W':
                    waypointX -= steps;
                    break;
                case 'L':
                    steps = Math.abs(steps - 360);
                case 'R':
                    [waypointX, waypointY] = rotate(
                        waypointX,
                        waypointY,
                        steps
                    );
                    break;

                default:
                    throw new Error('Unknown direction');
            }
        }
    }

    console.log(`Part 2: ${Math.abs(x) + Math.abs(y)}`);
}

function rotate(x: number, y: number, degrees: number): number[] {
    while (degrees > 0) {
        let tmp = x * -1;
        x = y;
        y = tmp;
        degrees -= 90;
    }

    return [x, y];
}

function getDirection(degrees: number): string {
    switch (degrees % 360) {
        case 0:
            return 'N';
        case 90:
            return 'E';
        case 180:
            return 'S';
        case 270:
            return 'W';
        default:
            throw new Error('Unknown degrees: ' + degrees);
    }
}
