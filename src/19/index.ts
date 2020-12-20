import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/19.txt';

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n\r\n');

    const rules: string[] = [];

    for (const line of input[0].split('\r\n')) {
        const [id, rest] = line.split(': ');
        rules[parseInt(id)] = rest.replace(/"/g, '');
    }

    const regex = new RegExp(`^${createRegexp(rules[0], rules)}$`);
    const words = input[1].split('\r\n');

    const matching = words.filter(line => regex.test(line));
    console.log(`Part 1: ${matching.length}`);

    const nonMatching = words.filter(line => !regex.test(line));

    const eightStart = new RegExp(`^${createRegexp(rules[42], rules)}`);

    const fortyTwo = new RegExp(`^${createRegexp(rules[42], rules)}`);
    const thirtyOne = new RegExp(`${createRegexp(rules[31], rules)}`);

    let part2 = 0;
    for (const line of nonMatching) {
        if (!eightStart.test(line)) {
            continue;
        }

        let string = line;

        let first = 0;
        while (true) {
            if (string.match(fortyTwo) === null) break;
            const [part] = string.match(fortyTwo);
            string = string.substring(part.length);
            first++;
        }

        let second = 0;
        while (true) {
            if (string.match(thirtyOne) === null) break;
            const [part] = string.match(thirtyOne);
            string = string.substring(part.length);
            second++;
        }

        if (first > second && second > 0 && string.length === 0) part2++;
    }
    console.log(
        `Part 2: ${words.filter(line => regex.test(line)).length + part2}`
    );
}

function createRegexp(
    string: string,
    rules: string[],
    translatedRules: string[] = []
): string {
    let result: string[] = ['('];

    for (const rule of string.split(' ')) {
        if (rule === '|') result.push('|');
        else if (/\d+/.test(rule)) {
            const index = parseInt(rule);
            if (rule.endsWith('+')) result.push('(');
            let translated = translatedRules[index];
            if (!translated) {
                translatedRules[index] = createRegexp(
                    rules[index],
                    rules,
                    translatedRules
                );
                translated = translatedRules[index];
            }
            result.push(translated);
            if (rule.endsWith('+')) result.push(')+');
        } else if (/[a-z]+/.test(rule)) {
            result.push(rule);
        }
    }

    result.push(')');

    if (string.endsWith('+')) result.push('+');

    return result.join('');
}
