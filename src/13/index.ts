import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/13.txt';

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n');

    const earliestArrival = parseInt(input[0]);
    const busTimes = input[1]
        .split(',')
        .filter(x => x != 'x')
        .map(x => parseInt(x));

    const earliestBus = busTimes
        .map(bus => {
            let time = bus;
            while (time < earliestArrival) {
                time += bus;
            }

            return { waiting: time - earliestArrival, intervall: bus };
        })
        .reduce((min, current) =>
            current.waiting < min.waiting ? current : min
        );

    console.log(`Part 1: ${earliestBus.waiting * earliestBus.intervall}`);

    const busses = input[1]
        .split(',')
        .map((time, index) =>
            time == 'x'
                ? { intervall: -1, index }
                : { intervall: parseInt(time), index }
        )
        .filter(x => x.intervall != -1);

    // works for smaller examples
    let i = 1;
    while (true) {
        if (getTimestamp(busses, 1, busses[0].intervall * i)) {
            console.log(`Part 2: ${busses[0].intervall * i}`);
            break;
        }
        i++;
    }
}

function getTimestamp(
    busses: { intervall: number; index: number }[],
    busIndex: number,
    timestamp: number
) {
    if (busIndex == busses.length) {
        return true;
    }

    const bus = busses[busIndex];
    let i = Math.floor(timestamp / bus.intervall) - 1;
    while (true) {
        if (bus.intervall * i == timestamp + bus.index) {
            if (getTimestamp(busses, busIndex + 1, timestamp)) return true;
        }
        if (bus.intervall * i > timestamp + bus.index) {
            return false;
        }
        i++;
    }
}
