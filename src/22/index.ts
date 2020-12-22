import { readLinesFromInput } from '../utils/readFile';

const fileName = './input/22.txt';

export async function main() {
    const [player1, player2] = (
        await readLinesFromInput(fileName, '\r\n\r\n')
    ).map(player =>
        player
            .split('\r\n')
            .slice(1)
            .map(x => parseInt(x))
    );

    const [resultPlayer1, resultPlayer2] = play([...player1], [...player2]);
    const result = resultPlayer1.length > 0 ? resultPlayer1 : resultPlayer2;

    console.log(`Part 1: ${calculateScore(result)}`);

    const [resultPlayer1V2, resultPlayer2V2] = playV2(
        [...player1],
        [...player2]
    );
    const resultV2 =
        resultPlayer1V2.length > 0 ? resultPlayer1V2 : resultPlayer2V2;
    console.log(`Part 2: ${calculateScore(resultV2)}`);
}

function play(player1: number[], player2: number[]) {
    while (player1.length > 0 && player2.length > 0) {
        const cardPlayer1 = player1.shift();
        const cardPlayer2 = player2.shift();

        if (cardPlayer1 > cardPlayer2) {
            player1.push(cardPlayer1);
            player1.push(cardPlayer2);
        } else {
            player2.push(cardPlayer2);
            player2.push(cardPlayer1);
        }
    }

    return [player1, player2];
}

function playV2(player1: number[], player2: number[]) {
    const player1History: Set<string> = new Set();
    const player2History: Set<string> = new Set();

    while (player1.length > 0 && player2.length > 0) {
        const stringPlayer1 = player1.join(',');
        const stringPlayer2 = player2.join(',');
        if (
            player1History.has(stringPlayer1) ||
            player2History.has(stringPlayer2)
        ) {
            return [player1, []];
        }
        player1History.add(stringPlayer1);
        player2History.add(stringPlayer2);

        const cardPlayer1 = player1.shift();
        const cardPlayer2 = player2.shift();

        let player1Wins = cardPlayer1 > cardPlayer2;

        if (cardPlayer1 <= player1.length && cardPlayer2 <= player2.length) {
            const [rPlayer1] = playV2(
                player1.slice(0, cardPlayer1),
                player2.slice(0, cardPlayer2)
            );
            player1Wins = rPlayer1.length > 0;
        }

        if (player1Wins) {
            player1.push(cardPlayer1);
            player1.push(cardPlayer2);
        } else {
            player2.push(cardPlayer2);
            player2.push(cardPlayer1);
        }
    }

    return [player1, player2];
}

function calculateScore(player: number[]) {
    return player
        .reverse()
        .map((value, index) => value * (index + 1))
        .reduce((sum, current) => sum + current);
}
