import { AsapScheduler } from 'rxjs/internal/scheduler/AsapScheduler'

export enum cardColor {
    spades = "s",
    hearts = "h",
    diamonds = "d",
    clubs = "c"
}

export enum cardRank {
    ace = "A",
    king = "K",
    queen = "Q",
    jack = "J",
    ten = "10",
    nine = "9",
    eight = "8",
    seven = "7",
    six = "6",
    five = "5",
    four = "4",
    three = "3",
    two = "2",

}

export class card {
    color: cardColor
    rank: cardRank
    constructor(rank: cardRank, color: cardColor) {
        this.rank = rank
        this.color = color
    }
    getImageSrc(): string {
        return `assets/img/cards/${this.rank}${this.color.toUpperCase()}.svg`
    }
}

export class cardDeck {

    spades: card[]
    hearts: card[]
    diamonds: card[]
    clubs: card[]

    private static ranks: cardRank[] = [cardRank.ace, cardRank.king, cardRank.queen,
        cardRank.jack, cardRank.ten, cardRank.nine, cardRank.eight, cardRank.seven,
        cardRank.six, cardRank.five, cardRank.four, cardRank.three, cardRank.two]

    constructor() {
        this.spades = this.createCardsOfColor(cardColor.spades)
        this.hearts = this.createCardsOfColor(cardColor.hearts)
        this.diamonds = this.createCardsOfColor(cardColor.diamonds)
        this.clubs = this.createCardsOfColor(cardColor.clubs)

    }

    createCardsOfColor(color: cardColor): card[] {
        const cards: card[] = []
        for (let rank of cardDeck.ranks) {
            cards.push(new card(rank, color)) //nowa instancja klasy//
        }
        return cards
    }
}