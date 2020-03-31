import { Card } from '../models/card.models';


function NumbersAscending(a: number, b: number): number {
    return a - b;
}

export class HandEstimator {

    static estimate(cards: Card[]): number {

        if (cards === undefined || cards.length < 5 || cards.some(c => !c.isSet())) {
            throw new Error("HandEstimator.estimate requires array of five not empty cards")
        }


        const ranks: number[] = cards.map(c => c.rank.value).sort(NumbersAscending)

        const rankCounts = new Map<number, number>()
        for (const r of ranks) {
            let count = rankCounts.get(r)
            if (count === undefined) {
                count = 0
            }
            rankCounts.set(r, ++count)
        }

        const pairs: number[] = this.getPairs(rankCounts)

        if (pairs.length === 2) {
            const sortedPairs = pairs.sort(NumbersAscending)
            const lowerPair = sortedPairs[0]
            const higherPair = sortedPairs[1]
            return 20000 + higherPair * 100 + lowerPair * 10 + this.getHighCardForTwoPairs(ranks, pairs)
        }

        if (pairs.length === 1) {
            const pairRank = pairs[0]
            return 10000 + pairRank * 10 + this.getHighCardForOnePair(ranks, pairRank)
        }


        return ranks[4]
    }
    static getHighCardForTwoPairs(ranks: number[], pairs: number[]): number {
        return ranks.filter(r => !pairs.includes(r))[0]
    }

    private static getHighCardForOnePair(ranks: number[], rankToDiscard: number):number {
        const filteredRanks = ranks.filter(r => r != rankToDiscard).sort((a, b) => a - b);
        return filteredRanks[2]
    }

    private static getPairs(rankCounts: Map<number, number>): number[] {
        const pairs: number[] = []
        for (var [rank, count] of rankCounts) {
            if (count === 2) {
                pairs.push(rank)
            }
        }
        return pairs
    }



}
