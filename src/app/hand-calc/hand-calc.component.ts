import { Component, OnInit, ViewChild } from '@angular/core';
import { CardPickerComponent } from '../card-picker/card-picker.component';
import { card } from '../models/card.models';
import { texasHoldem } from 'hutchison';

@Component({
    selector: 'app-hand-calc',
    templateUrl: './hand-calc.component.html',
    styleUrls: ['./hand-calc.component.css']
})
export class HandCalcComponent implements OnInit {
    card1: card
    card2: card

    handValue: string

    @ViewChild("cardPicker")
    cardPicker: CardPickerComponent

    constructor() {
        this.card1 = new card()
        this.card2 = new card()
    }

    ngOnInit(): void {
        this.handValue = "Pick two cards"
    }

    openCardPicker(c: card) {
        this.cardPicker.open().then(pickedCard => {
            c.set(pickedCard);

            if (this.card1.isSet() && this.card2.isSet()) {
                this.calculateHand()
            }
        })
    }
    calculateHand() {
        var result = texasHoldem({ hand: [this.card1.getSymbol(), this.card2.getSymbol()] });
        console.log(result)

        const handValue = result.percentile * 100;
        this.handValue = handValue.toFixed(1) + "%"


    }
}
