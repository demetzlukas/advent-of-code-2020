import { readLinesFromInput } from '../utils/readFile';
import { intersection } from 'lodash';

const fileName = './input/6.txt';

export async function main() {
    const answersPerGroupAndPerson = (
        await readLinesFromInput(fileName, '\r\n\r\n')
    ).map(group => group.split(/\s+/).map(g => g.split('')));

    console.log(
        `Part 1: ${answersPerGroupAndPerson
            .map(answers => new Set(answers.flat()).size)
            .reduce((sum, current) => sum + current)}`
    );

    console.log(
        `Part 2: ${answersPerGroupAndPerson
            .map(a => getNumberOfSharedAnswers(a))
            .reduce((sum, current) => sum + current)}`
    );
}

function getNumberOfSharedAnswers(answers: string[][]): number {
    let sharedAnswers = [];

    answers.forEach(a => (sharedAnswers = [...sharedAnswers, ...a.flat()]));
    answers.forEach(a => (sharedAnswers = intersection(sharedAnswers, a)));

    return sharedAnswers.length;
}
