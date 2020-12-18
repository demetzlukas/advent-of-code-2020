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

    console.log(busses);

    let timestamp = 0;
    let step = 1;
    for (const { intervall, index } of busses) {
        while ((timestamp + index) % intervall != 0) {
            timestamp += step;
        }
        console.log(timestamp);

        step *= intervall;
    }

    console.log(`Part 2: ${timestamp}`);
}
