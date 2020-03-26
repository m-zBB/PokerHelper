import { Card } from '../models/card.models';

export class HandEstimator {

    static estimate(cards: Card[]): number {
        const ranks: number[] = cards.map(c => c.rank.value).sort()
        
        return ranks[4]
    }
}
