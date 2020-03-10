import { Component, OnInit, ViewChild } from '@angular/core';
import { CardPickerComponent } from '../card-picker/card-picker.component';
import { card } from '../models/card.models';
import { texasHoldem } from 'hutchison';
import { HandComponent, HandValue } from '../hand/hand.component';

@Component({
    selector: 'app-hand-calc',
    templateUrl: './hand-calc.component.html',
    styleUrls: ['./hand-calc.component.css']
})
export class HandCalcComponent implements OnInit {

    handValue: string

    ngOnInit(): void {
        this.handValue = "Pick two cards"
    }

    calculateHand(value: HandValue) {
        var result = texasHoldem({ hand: [value.card1.getSymbol(), value.card2.getSymbol()] });
        console.log(result)

        const handValue = result.percentile * 100;
        this.handValue = handValue.toFixed(1) + "%"


    }
}
