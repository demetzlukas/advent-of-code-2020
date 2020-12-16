import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/16.txt';

export async function main() {
    const input = await readLinesFromInput(fileName, '\r\n\r\n');
    const rules = input[0].split('\r\n').map(line => {
        const [
            _,
            name,
            firstLow,
            firstHigh,
            secondLow,
            secondHigh,
        ] = line.match(/([a-z ]+): (\d+)-(\d+) or (\d+)-(\d+)/);

        return {
            name,
            firstLow: parseInt(firstLow),
            firstHigh: parseInt(firstHigh),
            secondLow: parseInt(secondLow),
            secondHigh: parseInt(secondHigh),
        };
    });
    const myTicket = input[1]
        .split('\r\n')
        .pop()
        .split(',')
        .map(v => parseInt(v));
    const nearbyTickets = input[2]
        .split('\r\n')
        .slice(1)
        .map(line => line.split(',').map(v => parseInt(v)));

    const total = nearbyTickets
        .map(ticket =>
            ticket
                .filter(value => !isValidForOneField(value, rules))
                .reduce((sum, current) => sum + current, 0)
        )
        .reduce((sum, current) => sum + current);

    console.log(`Part 1: ${total}`);

    const validTickets = nearbyTickets.filter(ticket =>
        ticket.every(value => isValidForOneField(value, rules))
    );

    const possibleAssignments: boolean[][] = [
        ...Array(rules.length),
    ].map(_ => []);

    for (const [index, rule] of rules.entries()) {
        for (const column of Array(rules.length).keys()) {
            possibleAssignments[index][column] = validTickets
                .map(ticket => ticket[column])
                .every(value => isValidForField(value, rule));
        }
    }

    const m: Map<string, number[]> = new Map();
    possibleAssignments
        .map(v =>
            [...v.entries()]
                .filter(([_, value]) => value)
                .map(([index]) => index)
        )
        .forEach((possibleColumns, index) =>
            m.set(rules[index].name, possibleColumns)
        );

    const assignment: string[] = [];

    while (m.size > 0) {
        const [ruleName, possibleColumns] = [
            ...m.entries(),
        ].reduce((min, current) =>
            current[1].length < min[1].length ? current : min
        );

        m.delete(ruleName);

        for (const column of possibleColumns) {
            if (assignment[column] === undefined) {
                assignment[column] = ruleName;
                break;
            }
        }
    }

    let product = 1;
    for (const [index, name] of assignment.entries()) {
        if (name.startsWith('departure')) {
            product *= myTicket[index];
        }
    }

    console.log(`Part 2: ${product}`);
}

// works for small example
function findColumnAssignment(
    rules: {
        name: string;
        firstLow: number;
        firstHigh: number;
        secondLow: number;
        secondHigh: number;
    }[],
    tickets: number[][],
    columns: number[],
    result: string[]
): boolean {
    if (rules.length == 0) {
        return true;
    }
    const rulesCopy = [...rules];
    let j = 0;
    while (j++ < rulesCopy.length) {
        let rule = rulesCopy.shift();

        let i = 0;
        while (i++ < columns.length) {
            const column = columns.shift();
            if (
                tickets
                    .map(ticket => ticket[column])
                    .every(value => isValidForField(value, rule))
            ) {
                result[column] = rule.name;
                if (findColumnAssignment(rulesCopy, tickets, columns, result))
                    return true;
                else result[column] = '';
            }
            columns.push(column);
        }

        rulesCopy.push(rule);
    }
}

function isValidForOneField(
    value: number,
    rules: {
        name: string;
        firstLow: number;
        firstHigh: number;
        secondLow: number;
        secondHigh: number;
    }[]
): boolean {
    return rules.some(rule => isValidForField(value, rule));
}

function isValidForField(
    value: number,
    rule: {
        name: string;
        firstLow: number;
        firstHigh: number;
        secondLow: number;
        secondHigh: number;
    }
): boolean {
    return (
        (value >= rule.firstLow && value <= rule.firstHigh) ||
        (value >= rule.secondLow && value <= rule.secondHigh)
    );
}
