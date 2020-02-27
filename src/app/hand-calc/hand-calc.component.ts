import { Component, OnInit, ViewChild } from '@angular/core';
import { CardPickerComponent } from '../card-picker/card-picker.component';
import { card } from '../models/card.models';

@Component({
    selector: 'app-hand-calc',
    templateUrl: './hand-calc.component.html',
    styleUrls: ['./hand-calc.component.css']
})
export class HandCalcComponent implements OnInit {
    card1: card
    card2: card

    @ViewChild("cardPicker")
    cardPicker: CardPickerComponent

    constructor() {
        this.card1 = new card()
        this.card2 = new card()
    }

    ngOnInit(): void {
    }
    openCardPicker(c: card) {
        this.cardPicker.open().then(pickedCard => {
            c.set(pickedCard);
            
        })
    }
}
