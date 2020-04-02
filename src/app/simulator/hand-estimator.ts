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
            return 2000000 + higherPair * 100 + lowerPair * 10 + this.getKickerForTwoPairs(ranks, pairs)
        }

        if (pairs.length === 1) {
            const pairRank = pairs[0]
            return 1000000 + pairRank * 1000 + this.getKickerSumForOnePair(ranks, pairRank)
        }

        return ranks[4]*10000 + ranks[3]*1000 + ranks[2]*100 + ranks[1]*10 + ranks[0]
    }

    private static getKickerForTwoPairs(ranks: number[], pairs: number[]): number {
        return ranks.filter(r => !pairs.includes(r))[0]


    }

    private static getKickerSumForOnePair(ranks: number[], rankToDiscard: number):number {
        const kickersRanks = ranks.filter(r => r != rankToDiscard).sort(NumbersAscending)
        return kickersRanks[2]*100 + kickersRanks[1]*10 + kickersRanks[0]
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
