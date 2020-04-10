import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Card, cardDeck } from '../../models/card.models';
import { CardPickerComponent } from '../card-picker/card-picker.component';

@Component({
    selector: 'app-hand',
    templateUrl: './hand.component.html',
    styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

    @Input() deck: cardDeck;

    @Input() value: HandCards

    @Output() chosen = new EventEmitter<HandCards>();


    @ViewChild("cardPicker")
    cardPicker: CardPickerComponent

    constructor() {

    }

    ngOnInit(): void {
        if (this.value === undefined) {
            this.value = new HandCards()
        }
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
    private shuffleCard(card: Card) {
        card.set(this.deck.pickRandomCard(card));
    }

    shuffle() {
        this.shuffleCard(this.value.card1);
        this.shuffleCard(this.value.card2);
        this.chosen.emit(this.value)
    }
}
export class HandCards {

    card1: Card
    card2: Card

    constructor() {
        this.card1 = new Card()
        this.card2 = new Card()
    }
    isSet(): boolean {
        return this.card1.isSet() && this.card2.isSet()
    }
    getCardSymbolsForHutchisonLib(): string[] {
        return [this.card1.getSymbolForHutchisonLib(), this.card2.getSymbolForHutchisonLib()]
    }

    getCards(): Card[] {
        return [this.card1, this.card2]
    }
}
