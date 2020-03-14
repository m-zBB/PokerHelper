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

export class Card {

    set(newCard: Card) {
        this._rank = newCard._rank;
        this._color = newCard._color;
    }

    private _color: cardColor
    get color(): cardColor {
        return this._color;
    }
    private _rank: cardRank
    get rank(): cardRank {
        return this._rank;
    }

    constructor(rank?: cardRank, color?: cardColor) {
        this._rank = rank
        this._color = color
    }



    getImageSrc(): string {
        if (!this.isSet()) {
            return 'assets/img/cards/back.svg'
        }
        return `assets/img/cards/${this._rank}${this._color.toUpperCase()}.svg`
    }

    isSet(): boolean {
        return this._rank !== undefined && this._color !== undefined
    }
    getSymbolForHutchisonLib(): string {
        return this._rank + this._color
    }
    getSymbolForPokerCalcLib(): string {
        if (this._rank === cardRank.ten) {
            return "10" + this._color
        }
        return this._rank + this._color
    }

}


export class cardDeck {

    spades: CardInDeck[]
    hearts: CardInDeck[]
    diamonds: CardInDeck[]
    clubs: CardInDeck[]

    private static ranks: cardRank[] = [cardRank.ace, cardRank.king, cardRank.queen,
    cardRank.jack, cardRank.ten, cardRank.nine, cardRank.eight, cardRank.seven,
    cardRank.six, cardRank.five, cardRank.four, cardRank.three, cardRank.two]

    constructor() {
        this.spades = this.createCardsOfColor(cardColor.spades)
        this.hearts = this.createCardsOfColor(cardColor.hearts)
        this.diamonds = this.createCardsOfColor(cardColor.diamonds)
        this.clubs = this.createCardsOfColor(cardColor.clubs)

    }

    private createCardsOfColor(color: cardColor): CardInDeck[] {
        const cards: CardInDeck[] = []
        for (let rank of cardDeck.ranks) {
            cards.push(new CardInDeck(rank, color))
        }
        return cards
    }
    getFullDeck(): Card[] {
        const cards: Card[] = []
        cards.push(...this.spades)
        cards.push(...this.hearts)
        cards.push(...this.diamonds)
        cards.push(...this.clubs)
        return cards
    }

    pickCard(pickedCard: Card, oldCard: Card) {
        this.findCard(pickedCard).isPicked = true
        if (oldCard.isSet()) {
            this.findCard(oldCard).isPicked = false
        }
    }

    private findCard(card: Card): CardInDeck {
        if (card.color === cardColor.clubs) {
            return this.clubs.find(c => c.rank === card.rank)
        }
        if (card.color === cardColor.diamonds) {
            return this.diamonds.find(c => c.rank === card.rank)
        }
        if (card.color === cardColor.hearts) {
            return this.hearts.find(c => c.rank === card.rank)
        }
        if (card.color === cardColor.spades) {
            return this.spades.find(c => c.rank === card.rank)
        }
    }
}

export class CardInDeck extends Card {
    isPicked: boolean
}
