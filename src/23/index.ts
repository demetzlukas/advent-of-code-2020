import { LinkedList, Node } from './linkedList';

export async function main() {
    const startValue = '614752839';
    const cups = startValue.split('').map(x => parseInt(x));

    const cupsPart1 = new LinkedList(cups);
    let node = cupsPart1.getHead();
    for (const _ of Array(100)) {
        node = move2(node, cupsPart1, 9);
    }

    let nodeOne = cupsPart1.find(1);
    console.log(
        `Part 1: ${getResultString(cupsPart1.getNodeList(nodeOne.next))}`
    );

    const max = cups.reduce((max, current) => (current > max ? current : max));
    const cupsPart2 = new LinkedList(cups);

    for (let index = max + 1; index < 1000000 + 1; index++) {
        cupsPart2.add(index);
    }
    const maxValue = cupsPart2.getMaxValue();

    node = cupsPart2.getHead();
    for (const _ of Array(10000000)) {
        node = move2(node, cupsPart2, maxValue);
    }

    nodeOne = cupsPart2.find(1);
    console.log(`Part 2: ${nodeOne.next.value * nodeOne.next.next.value}`);
}

function getResultString(string: string): string {
    return string.slice(0, -2).split(',').join('');
}

// first solution, did not work for part 2
function move(cups: number[]) {
    const min = cups.reduce((min, current) => (current < min ? current : min));
    const max = cups.reduce((max, current) => (current > max ? current : max));
    let currentCup = cups.shift();
    let pickUp = cups.slice(0, 3);
    let remaining = cups.slice(3);
    let destination = currentCup;
    while (true) {
        destination--;
        if (remaining.includes(destination)) {
            break;
        } else if (destination < min) {
            destination = max + 1;
        }
    }

    const index = remaining.indexOf(destination);
    cups = [
        ...remaining.slice(0, index + 1),
        ...pickUp,
        ...remaining.slice(index + 1),
        currentCup,
    ];
    return cups;
}

function move2(currentCup: Node, cups: LinkedList, maxValue: number): Node {
    const min = 1;

    let pickUp: number[] = [];

    let tmp = currentCup;
    for (const _ of Array(3)) {
        tmp = tmp.next;
        pickUp.push(tmp.value);
    }

    let remaining = cups.find(pickUp[2]).next;
    let destination = currentCup.value;
    while (true) {
        destination--;
        if (destination < min) {
            destination = maxValue + 1;
        } else if (!pickUp.includes(destination)) {
            break;
        }
    }

    const destinationNode = cups.find(destination);
    currentCup.next = remaining;
    const tmpDestNext = destinationNode.next;
    destinationNode.next = cups.find(pickUp[0]);
    cups.find(pickUp[2]).next = tmpDestNext;

    return remaining;
}
