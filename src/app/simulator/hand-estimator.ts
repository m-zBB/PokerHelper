import { Card } from '../models/card.models';

export class HandEstimator {

    static estimate(cards: Card[]): number {

        if (cards === undefined || cards.length < 5 || cards.some(c => !c.isSet())) {
            throw new Error("HandEstimator.estimate requires array of five not empty cards")
        }

        const ranks: number[] = cards.map(c => c.rank.value).sort((a, b) => a - b)
        return ranks[4]

    }



}
