import { readLinesFromInput } from '../utils/readFile';
import * as _ from 'lodash';

const fileName = './input/6.txt';

export async function main() {
    const answersPerGroupAndPerson = (
        await readLinesFromInput(fileName, '\r\n\r\n')
    ).map(group => group.split(/\s+/).map(g => g.split('')));

    console.log(
        `Part 1: ${answersPerGroupAndPerson
            .map(group => _.flatten(group))
            .map(answers => new Set(answers).size)
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

    answers.forEach(a => (sharedAnswers = [...sharedAnswers, ..._.flatten(a)]));
    answers.forEach(a => (sharedAnswers = _.intersection(sharedAnswers, a)));

    return sharedAnswers.length;
}
