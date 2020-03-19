
import shuffle from 'array-shuffle';
import pokerCalc from 'poker-calc';
import { cardDeck } from '../models/card.models';
const cards = new cardDeck()
    .getFullDeck()
    .map(c => c.getSymbolForPokerCalcLib())

const outcomes = {
    WIN: 0,
    LOSE: 1,
    SPLIT: 2
};

/**
 * Perform Monte Carlo simulation
 *
 * @param {Array} hand to evaluate
 * @param {Array} cards on the table
 * @param {Number} number of players
 * @param {Number} number of samples
 * @return {Array} est. probability distribution
 */

export function monteCarlo(hand: string[], table: string[], players?: number, samples?: number) {
    const distribution = [0, 0, 0];

    players = players || 2;
    samples = samples || 1000;

    for (let i = 0; i < samples; i++) {
        let outcome = simulate(hand, table, players);
        distribution[outcome]++;
    }

    return distribution.map(n => n / samples);
}

/**
 * Simulate a random game and return outcome
 */

function simulate(hand: string[], table: string[], players: number) {
    const hands = [];
    let deck: string[] = shuffle(cards);

    hand = hand.slice();
    table = table.slice();

    // hand needs 2 cards
    while (hand.length < 2) {
        hand.push(deck.shift());
    }

    // remove table and hand cards from deck
    deck = deck.filter(c => !~table.indexOf(c));
    deck = deck.filter(c => !~hand.indexOf(c));

    hands.push({ "playerId": 0, "cards": hand });

    // deal cards to players
    for (let i = 1; i < players; i++) {
        hands.push({ "playerId": i, "cards": deck.splice(0, 2) });
    }

    // flop, turn, river
    while (table.length < 5) {
        const card = deck.shift();
        table.push(card);
    }

    // hand rank
    var params = {
        "boardCards": table,
        "playerCards": hands
    }

    var results: any[] = pokerCalc.getHoldemWinner(params, { compactCards: true });


    if (Math.random() <= 0.01) {
        console.log("players: ", hands.reduce((s, p) => {
            return s += " " + p.playerId + ": " + p.cards.join(",")
        }, ""), "table: ", table.join(","), "wins:", results.map(p => p.playerId).join(","))
    }
    if (results.length === 1 && results[0].playerId === 0) {
        return outcomes.WIN
    }
    if (results.some(r => r.playerId === 0)) {
        return outcomes.SPLIT
    }
    return outcomes.LOSE

}

