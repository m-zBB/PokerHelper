import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { card } from '../../models/card.models';
import { CardPickerComponent } from '../card-picker/card-picker.component';

@Component({
    selector: 'app-hand',
    templateUrl: './hand.component.html',
    styleUrls: ['./hand.component.css']
})
export class HandComponent implements OnInit {

    @Output() chosen = new EventEmitter<HandValue>();

    value: HandValue

    @ViewChild("cardPicker")
    cardPicker: CardPickerComponent

    constructor() {
        this.value = new HandValue()
    }

    ngOnInit(): void {
    }
    openCardPicker(c: card) {
        this.cardPicker.open().then(pickedCard => {
            c.set(pickedCard);

            if (this.value.isSet()) {
                this.chosen.emit(this.value)
            }
        })
    }
}
export class HandValue {

    card1: card
    card2: card

    constructor() {
        this.card1 = new card()
        this.card2 = new card()
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
