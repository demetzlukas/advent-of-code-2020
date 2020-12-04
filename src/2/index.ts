import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/2.txt';

const REGEX = new RegExp(/(\d+)-(\d+) (\w): (\w+)/);

function getNumberOfCorrectPasswords(input: string[]): number {
    let numberOfCorrectPasswords = 0;

    for (const line of input) {
        const [_, low, high, character, password] = REGEX.exec(line);
        let numberOfCharacterOccurrences = password
            .split('')
            .filter(c => c === character).length;
        if (
            numberOfCharacterOccurrences >= parseInt(low) &&
            numberOfCharacterOccurrences <= parseInt(high)
        ) {
            numberOfCorrectPasswords++;
        }
    }

    return numberOfCorrectPasswords;
}

function getNumberOfCorrectPasswordsPart2(input: string[]): number {
    let numberOfCorrectPasswords = 0;

    for (const line of input) {
        const [_, first, second, character, password] = REGEX.exec(line);
        const firstPostion = parseInt(first) - 1;
        const secondPosition = parseInt(second) - 1;

        if (
            (password[firstPostion] === character ||
                password[secondPosition] === character) &&
            password[firstPostion] !== password[secondPosition]
        ) {
            numberOfCorrectPasswords++;
        }
    }

    return numberOfCorrectPasswords;
}

export async function main() {
    const input = await readLinesFromInput(fileName);

    console.log(
        `Part 1: Valid passwords: ${getNumberOfCorrectPasswords(input)}`
    );
    console.log(
        `Part 1: Valid passwords: ${getNumberOfCorrectPasswordsPart2(input)}`
    );
}
