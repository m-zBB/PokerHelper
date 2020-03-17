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

    @Output() chosen = new EventEmitter<HandCards>();

    value: HandCards

    @ViewChild("cardPicker")
    cardPicker: CardPickerComponent

    constructor() {
        this.value = new HandCards()
    }

    ngOnInit(): void {
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
    getCardSymbolsForPokerCalcLib(): string[] {
        return [this.card1.getSymbolForPokerCalcLib(), this.card2.getSymbolForPokerCalcLib()]
    }
}
