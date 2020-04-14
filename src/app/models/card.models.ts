import { CardPickerComponent } from '../shared/card-picker/card-picker.component';

const validColors: string[] = ["s", "h", "d", "c"];

export class CardColor {

    static spades = new CardColor("s");
    static hearts = new CardColor("h");
    static diamonds = new CardColor("d");
    static clubs = new CardColor("c");

    private _value: string

    get value(): string {
        return this._value;
    }

    constructor(color: string) {
        if (!validColors.includes(color)) {
            throw new RangeError("Invalid color: " + color)
        }
        this._value = color
    }

    toUpperCase(): string {
        return this._value.toUpperCase();
    }
    toString(): string {
        return this._value
    }

    equals(otherColor: CardColor): boolean {
        return otherColor.toString() === this.toString()
    }
}

const ranksMap = new Map([
    [2, '2'],
    [3, '3'],
    [4, "4"],
    [5, "5"],
    [6, "6"],
    [7, "7"],
    [8, "8"],
    [9, "9"],
    [10, "T"],
    [11, "J"],
    [12, "Q"],
    [13, "K"],
    [14, "A"]
]);
const ranksInvertedMap = new Map();
for (const [key, value] of ranksMap) {
    ranksInvertedMap.set(value, key);
}

export class CardRank {
    static allRanks: CardRank[] = [new CardRank("A"), new CardRank("K"), new CardRank("Q"), new CardRank("J"),
    new CardRank("T"), new CardRank("9"), new CardRank("8"), new CardRank("7"), new CardRank("6"),
    new CardRank("5"), new CardRank("4"), new CardRank("3"), new CardRank("2")];

    private _value: number
    get value(): number {
        return this._value;
    }

    static ten: CardRank = new CardRank("T");

    constructor(rank: string) {
        if (!ranksInvertedMap.has(rank)) {
            throw new RangeError("Invalid rank: " + rank)
        }
        this._value = ranksInvertedMap.get(rank)
    }
    toString(): string {
        return ranksMap.get(this._value)
    }

    equals(otherRank: CardRank): boolean {
        return otherRank.toString() === this.toString()
    }
}

export class Card {

    static fromString(symbol: string): Card {
        const rank = symbol.substring(0, 1);
        const cardRank: CardRank = new CardRank(rank);

        const color = symbol.substring(1, 2);
        const cardColor: CardColor = new CardColor(color);

        return new Card(cardRank, cardColor)
    }

    equals(otherCard: Card): boolean {
        return otherCard.color.equals(this.color) && otherCard.rank.equals(this.rank)
    }

    set(newCard: Card) {
        this._rank = newCard._rank;
        this._color = newCard._color;
    }

    private _color: CardColor
    get color(): CardColor {
        return this._color;
    }
    private _rank: CardRank
    get rank(): CardRank {
        return this._rank;
    }

    constructor(rank?: CardRank, color?: CardColor) {
        this._rank = rank
        this._color = color
    }

    toString(): string {
        return this.getSymbolForHutchisonLib();
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
        if (!this.isSet()) {
            return ''
        }
        return this._rank.toString() + this._color.toString()
    }
    getSymbolForPokerCalcLib(): string {
        if (this._rank.equals(CardRank.ten)) {
            return "10" + this._color
        }
        return this._rank.toString() + this._color.toString()
    }

}


export class cardDeck {

    spades: CardInDeck[]
    hearts: CardInDeck[]
    diamonds: CardInDeck[]
    clubs: CardInDeck[]

    constructor() {
        this.spades = this.createCardsOfColor(CardColor.spades)
        this.hearts = this.createCardsOfColor(CardColor.hearts)
        this.diamonds = this.createCardsOfColor(CardColor.diamonds)
        this.clubs = this.createCardsOfColor(CardColor.clubs)

    }

    private createCardsOfColor(color: CardColor): CardInDeck[] {
        const cards: CardInDeck[] = []
        for (let rank of CardRank.allRanks) {
            cards.push(new CardInDeck(rank, color))
        }
        return cards
    }

    getFullDeck(): Card[] {
        return this._getFullDeck()
    }

    private _getFullDeck(): CardInDeck[] {
        const cards: CardInDeck[] = []
        cards.push(...this.spades)
        cards.push(...this.hearts)
        cards.push(...this.diamonds)
        cards.push(...this.clubs)
        return cards
    }

    pickCard(pickedCard: Card, oldCard?: Card) {
        this.findCard(pickedCard).isPicked = true
        if (oldCard && oldCard.isSet()) {
            this.findCard(oldCard).isPicked = false
        }
    }

    pickRandomCard(oldCard?: Card): Card {
        const availableCards = this._getFullDeck().filter(c => !c.isPicked);

        const randomIndex = Math.floor(Math.random() * availableCards.length);
        const randomCard = availableCards[randomIndex];

        this.pickCard(randomCard, oldCard);

        return randomCard;
    }

    private findCard(card: Card): CardInDeck {
        if (card.color.equals(CardColor.clubs)) {
            return this.clubs.find(c => c.rank.equals(card.rank))
        }
        if (card.color.equals(CardColor.diamonds)) {
            return this.diamonds.find(c => c.rank.equals(card.rank))
        }
        if (card.color.equals(CardColor.hearts)) {
            return this.hearts.find(c => c.rank.equals(card.rank))
        }
        if (card.color.equals(CardColor.spades)) {
            return this.spades.find(c => c.rank.equals(card.rank))
        }
    }
}

export class CardInDeck extends Card {
    isPicked: boolean
}
