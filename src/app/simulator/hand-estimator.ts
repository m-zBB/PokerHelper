import { Card } from '../models/card.models';


function NumbersAscending(a: number, b: number): number {
    return a - b;
}

function onlyUnique(value: any, index: number, self: any[]) {
    return self.indexOf(value) === index;
}

export class Player {
    score: number
    constructor(public name: string, public cards: Card[]) {
    }
}

export class HandEstimator {


    static getWinners(tableCards: Card[], players: Player[]): Player[] {
        players.forEach(p => p.score = this.getPlayerBestHand(tableCards, p.cards))
        const playersSortedDescendingByScore = players.sort((a, b) => b.score - a.score)
        const winningScore = playersSortedDescendingByScore[0].score

        return players.filter(p => p.score === winningScore)
    }

    static getPlayerBestHand(t: Card[], p: Card[]): number {

        //21 permutations 5 of 7
        const hands: Card[][] = [
            [t[0], t[1], t[2], t[3], t[4]], //'01234'
            [t[2], t[3], t[4], p[0], p[1]], //'23456'
            [t[0], t[1], t[2], t[3], p[0]], //'01235'
            [t[0], t[1], t[2], t[3], p[1]], //'01236'
            [t[0], t[1], t[2], t[4], p[0]], //'01245'
            [t[0], t[1], t[2], t[4], p[1]], //'01246'
            [t[0], t[1], t[2], p[0], p[1]], //'01256'
            [t[0], t[1], t[3], t[4], p[0]], //'01345'
            [t[0], t[1], t[3], t[4], p[0]], //'01346'
            [t[0], t[1], t[3], p[0], p[1]], //'01356'
            [t[0], t[1], t[4], p[0], p[1]], //'01456'
            [t[0], t[2], t[3], t[4], p[0]], //'02345'
            [t[0], t[2], t[3], t[4], p[1]], //'02346'
            [t[0], t[2], t[3], p[0], p[1]], //'02356'
            [t[0], t[2], t[4], p[0], p[1]], //'02456'
            [t[0], t[3], t[4], p[0], p[1]], //'03456'
            [t[1], t[2], t[3], t[4], p[0]], //'12345'
            [t[1], t[2], t[3], t[4], p[1]], //'12346'
            [t[1], t[2], t[3], p[0], p[1]], //'12356'
            [t[1], t[2], t[4], p[0], p[1]], //'12456'
            [t[1], t[3], t[4], p[0], p[1]], //'13456'
        ]

        const handValues = hands
            .map((cards, index) => this.getHandValue(cards))
            .sort(NumbersAscending);

        return handValues[20];
    }



    static getHandValue(cards: Card[]): number {

        if (cards === undefined || cards.length < 5 || cards.some(c => !c.isSet())) {
            throw new Error("HandEstimator.estimate requires array of five not empty cards")
        }

        if (cards.map(c => c.getSymbolForHutchisonLib()).filter(onlyUnique).length < 5) {
            throw new Error("HandEstimator.estimate requires array of five unique cards")
        }

        const ranks: number[] = cards.map(c => c.rank.value).sort(NumbersAscending)
        const flush = cards.map(c => c.color.value).filter(onlyUnique).length == 1;

        const sameKinds: Map<number, number[]> = this.getRanksOfTheSameKind(ranks)

        const threeOfKind = sameKinds.get(3);
        const pairs = sameKinds.get(2);

        const minMaxDiff = ranks[4] - ranks[0]
        const noPairsOrThreeOfKind = pairs.length === 0 && threeOfKind.length === 0
        const straight = minMaxDiff === 4 && noPairsOrThreeOfKind
        const straightWithAceAsOne = ranks[0] == 2 && ranks[3] - ranks[0] == 3 && ranks[4] == 14 && noPairsOrThreeOfKind

        if (straightWithAceAsOne && flush) {
            return 8000005
        }

        if (straight && flush) {
            return 8000000 + ranks[4]
        }

        const fourOfKind = sameKinds.get(4);
        if (fourOfKind.length === 1) {
            return 7000000 + fourOfKind[0] * 10 + this.getOneKicker(ranks, fourOfKind)
        }

        const fullHouse = threeOfKind.length === 1 && pairs.length === 1
        if (fullHouse) {
            return 6000000 + threeOfKind[0] * 10 + pairs[0]
        }

        if (flush) {
            return 5000000 + this.getSumOfFiveKickers(ranks)
        }

        if (straightWithAceAsOne) {
            return 4000005
        }

        if (straight) {
            return 4000000 + ranks[4]
        }

        if (threeOfKind.length === 1) {
            return 3000000 + threeOfKind[0] * 100 + this.getSumOfTwoKickers(ranks, threeOfKind[0])
        }

        if (pairs.length > 0) {
            return this.getPairsValue(ranks, pairs)
        }

        return HandEstimator.getSumOfFiveKickers(ranks)
    }

    private static getPairsValue(ranks: number[], pairs: number[]): number {
        if (pairs.length === 2) {
            const sortedPairs = pairs.sort(NumbersAscending)
            const lowerPair = sortedPairs[0]
            const higherPair = sortedPairs[1]
            return 2000000 + higherPair * 100 + lowerPair * 10 + this.getOneKicker(ranks, pairs)
        }
        if (pairs.length === 1) {
            const pairRank = pairs[0]
            return 1000000 + pairRank * 1000 + this.getSumOfThreeKickers(ranks, pairRank)
        }
        return -1
    }

    private static getSumOfFiveKickers(ranks: number[]): number {
        return ranks[4] * 10000 + ranks[3] * 1000 + ranks[2] * 100 + ranks[1] * 10 + ranks[0];
    }

    private static getOneKicker(ranks: number[], pairs: number[]): number {
        return ranks.filter(r => !pairs.includes(r))[0]
    }

    static getSumOfTwoKickers(ranks: number[], rankToDiscard: number): number {
        const kickersRanks = ranks.filter(r => r != rankToDiscard).sort(NumbersAscending)
        return kickersRanks[1] * 10 + kickersRanks[0]
    }

    private static getSumOfThreeKickers(ranks: number[], rankToDiscard: number): number {
        const kickersRanks = ranks.filter(r => r != rankToDiscard).sort(NumbersAscending)
        return kickersRanks[2] * 100 + kickersRanks[1] * 10 + kickersRanks[0]
    }

    private static getRanksOfTheSameKind(ranks): Map<number, number[]> {
        const sameKinds: Map<number, number[]> = new Map<number, number[]>([[2, []], [3, []], [4, []]]);
        const rankCounts = new Map<number, number>()
        for (const r of ranks) {
            let count = rankCounts.get(r)
            if (count === undefined) {
                count = 0
            }
            rankCounts.set(r, ++count)
        }
        for (var [rank, count] of rankCounts) {
            if (count !== 1) {
                sameKinds.get(count).push(rank)
            }
        }
        return sameKinds
    }
}
