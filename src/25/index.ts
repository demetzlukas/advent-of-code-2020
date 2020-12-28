export async function main() {
    const publicCard = 7573546;
    const publicDoor = 17786549;
    const divideBy = 20201227;
    const subjectNumber = 7;

    const loopDoor = getLoopSize(subjectNumber, publicDoor, divideBy);

    let encryption = 1;

    for (const _ of Array(loopDoor)) {
        encryption *= publicCard;
        encryption %= divideBy;
    }

    console.log(`Part 1: ${encryption}`);
}

function getLoopSize(
    subjectNumber: number,
    publicKey: number,
    divideBy: number
): number {
    let value = 1;
    let loop = 0;

    while (value != publicKey) {
        value *= subjectNumber;
        value %= divideBy;
        loop++;
    }

    return loop;
}
