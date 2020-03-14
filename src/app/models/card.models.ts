import { CardPickerComponent } from '../shared/card-picker/card-picker.component';

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
    ten = "T",
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

    set(newCard: card) {
        this.rank = newCard.rank;
        this.color = newCard.color;
    }

    private color: cardColor
    private rank: cardRank

    constructor(rank?: cardRank, color?: cardColor) {
        this.rank = rank
        this.color = color
    }



    getImageSrc(): string {
        if (!this.isSet()) {
            return 'assets/img/cards/back.svg'
        }
        return `assets/img/cards/${this.rank}${this.color.toUpperCase()}.svg`
    }

    isSet(): boolean {
        return this.rank !== undefined && this.color !== undefined
    }
    getSymbolForHutchisonLib(): string {
        return this.rank + this.color
    }
    getSymbolForPokerCalcLib(): string {
        if (this.rank === cardRank.ten) {
            return "10" + this.color
        }
        return this.rank + this.color
    }
    //nowa nazwa metod getsymbol (for hutchinsonlib i forpokercalclib) + zmina użycia na stronach
    //T na 10 (if)+color
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

    private createCardsOfColor(color: cardColor): card[] {
        const cards: card[] = []
        for (let rank of cardDeck.ranks) {
            cards.push(new card(rank, color)) //nowa instancja klasy//
        }
        return cards
    }
    getFullDeck(): card[] {
        const cards: card[] = []
        cards.push(...this.spades)
        cards.push(...this.hearts)
        cards.push(...this.diamonds)
        cards.push(...this.clubs)
        return cards
    }
}
