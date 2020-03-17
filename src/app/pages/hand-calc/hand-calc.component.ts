import { Component, OnInit } from '@angular/core';
import { cardDeck } from '../../models/card.models';
import { texasHoldem } from 'hutchison';
import { HandCards as HandCards } from '../../shared/hand/hand.component';

@Component({
    selector: 'app-hand-calc',
    templateUrl: './hand-calc.component.html',
    styleUrls: ['./hand-calc.component.css']
})
export class HandCalcComponent implements OnInit {

    handValue: string
    deck: any;
    handCards: HandCards

    constructor() {
        this.deck = new cardDeck()
        this.handCards = new HandCards()
    }

    ngOnInit(): void {
        this.handValue = "Pick two cards"
    }

    calculateHand(value: HandCards) {
        var result = texasHoldem({ hand: value.getCardSymbolsForHutchisonLib() });
        console.log(result)
        this.handCards = value

        const handValue = result.percentile * 100;
        this.handValue = handValue.toFixed(1) + "%"


    }
}
