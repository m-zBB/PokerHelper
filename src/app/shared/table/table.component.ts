import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { CardPickerComponent } from '../card-picker/card-picker.component';
import { Card, cardDeck } from 'src/app/models/card.models';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    @Input() deck: cardDeck;

    @Output() chosen = new EventEmitter<TableCards>();

    value: TableCards

    @ViewChild("cardPicker")
    cardPicker: CardPickerComponent

    constructor() {
        this.value = new TableCards()
    }

    ngOnInit(): void {
    }

    private shuffleCard(card: Card) {
        card.set(this.deck.pickRandomCard(card));
    }

    shuffle() {
        this.shuffleCard(this.value.card1);
        this.shuffleCard(this.value.card2);
        this.shuffleCard(this.value.card3);
        this.shuffleCard(this.value.card4);
        this.shuffleCard(this.value.card5);
        this.chosen.emit(this.value)
    }

    openCardPicker(c: Card) {
        this.cardPicker.open().then(pickedCard => {
            this.deck.pickCard(pickedCard, c)
            c.set(pickedCard);

            if (this.value.isSet()) {
                this.chosen.emit(this.value)
            }
        })
    }
}
export class TableCards {

    card1: Card
    card2: Card
    card3: Card

    card4: Card

    card5: Card

    constructor() {
        this.card1 = new Card()
        this.card2 = new Card()
        this.card3 = new Card()
        this.card4 = new Card()
        this.card5 = new Card()
    }
    isSet(): boolean {
        return this.card1.isSet() && this.card2.isSet() && this.card3.isSet()
    }

    getCards(): Card[] {
        const cards: Card[] = [
            this.card1,
            this.card2,
            this.card3
        ]

        if (this.card4.isSet()) {
            cards.push(this.card4)
        }
        if (this.card4.isSet() && this.card5.isSet()) {
            cards.push(this.card5)
        }
        return cards
    }
}

