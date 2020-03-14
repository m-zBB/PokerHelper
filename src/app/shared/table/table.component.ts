import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { HandValue } from '../hand/hand.component';
import { CardPickerComponent } from '../card-picker/card-picker.component';
import { card } from 'src/app/models/card.models';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

    @Output() chosen = new EventEmitter<TableValue>();

    value: TableValue

    @ViewChild("cardPicker")
    cardPicker: CardPickerComponent

    constructor() {
        this.value = new TableValue()
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
export class TableValue {

    card1: card
    card2: card
    card3: card

    card4: card

    card5: card

    constructor() {
        this.card1 = new card()
        this.card2 = new card()
        this.card3 = new card()
        this.card4 = new card()
        this.card5 = new card()
    }
    isSet(): boolean {
        return this.card1.isSet() && this.card2.isSet()
            && this.card3.isSet() && this.card4.isSet() && this.card5.isSet()
    }
    getCardSymbolsForPokerCalcLib(): string[] {
        return [this.card1.getSymbolForPokerCalcLib(), this.card2.getSymbolForPokerCalcLib(), this.card3.getSymbolForPokerCalcLib(),
        this.card4.getSymbolForPokerCalcLib(), this.card5.getSymbolForPokerCalcLib()]
    }

}

