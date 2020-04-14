
import shuffle from 'array-shuffle';
import { cardDeck, Card } from '../models/card.models';
import { HandEstimator, Player } from './hand-estimator';
const cards = new cardDeck()
    .getFullDeck();

const outcomes = {
    WIN: 0,
    LOSE: 1,
    SPLIT: 2
};

const humanPlayerName = "humanPlayer"

export function monteCarloNew(hand: Card[], table: Card[], players?: number, samples?: number) {
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

function simulate(playerCards: Card[], table: Card[], playersCount: number) {
    const players : Player[] = [];
    let deck: Card[] = shuffle(cards);

    playerCards = playerCards.slice();
    table = table.slice();

    // hand needs 2 cards
    while (playerCards.length < 2) {
        playerCards.push(deck.shift());
    }

    // remove table and hand cards from deck
    deck = deck.filter(c => !table.some(tableCard => tableCard.equals(c)));
    deck = deck.filter(c => !playerCards.some(playerCard => playerCard.equals(c)));

    players.push(new Player(humanPlayerName, playerCards));

    // deal cards to players
    for (let i = 1; i < playersCount; i++) {
        players.push(new Player("AI" + 1, deck.splice(0, 2)))
    }

    // flop, turn, river
    while (table.length < 5) {
        const card = deck.shift();
        table.push(card);
    }

    var winners: Player[];
    try {
        winners = HandEstimator.getWinners(table, players)
    } catch (e) {
        logCards(players, table, winners);
        throw e;
    }

    if (Math.random() <= 0.01) {
        logCards(players, table, winners)
    }
    if (winners.length === 1 && winners[0].name === humanPlayerName) {
        return outcomes.WIN
    }
    if (winners.some(r => r.name === humanPlayerName)) {
        return outcomes.SPLIT
    }
    return outcomes.LOSE

}

function logCards(players: Player[], tableCards: Card[], winners: Player[]) {
    const logs: string[] = [
        "players: ",
        players.reduce((s, p) => {
            return s += " " + p.name + ": " + p.cards.map(c => c.getSymbolForHutchisonLib()).join(",")
        }, ""),
        "table: ",
        tableCards.join(",")
    ]
    if (winners) {
        logs.push("wins:", winners.map(p => p.name).join(","))
     }
    console.log(...logs)
}

