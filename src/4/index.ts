import { readLinesFromInput } from '../utils/readFile';
import { Passport } from './passport';

const fileName = './input/4.txt';

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n\r\n');
    let passports: Passport[] = input.map(line =>
        Passport.createFromString(line.split(/ |\n|\r\n/))
    );

    console.log(
        `Part 1: ${passports.filter(passport => passport.isValid()).length}`
    );
    console.log(
        `Part 2: ${passports.filter(passport => passport.isValid(true)).length}`
    );
}
