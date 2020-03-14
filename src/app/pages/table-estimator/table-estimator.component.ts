import { Component, OnInit } from '@angular/core';
import { HandValue } from 'src/app/shared/hand/hand.component';
import { TableValue } from 'src/app/shared/table/table.component';
import { monteCarlo } from 'src/app/simulator/simulator';
import { cardDeck } from 'src/app/models/card.models';

@Component({
    selector: 'app-table-estimator',
    templateUrl: './table-estimator.component.html',
    styleUrls: ['./table-estimator.component.css']
})
export class TableEstimatorComponent implements OnInit {
    handCards: HandValue;
    tableValue: TableValue;
    deck: cardDeck;

    constructor() {
        this.handCards = new HandValue()
        this.tableValue = new TableValue()
        this.deck = new cardDeck()

     }

    handValue: string

    ngOnInit(): void {
        this.handValue = "Pick hand cards and table cards"
    }

    setHand(handValue: HandValue) {
        this.handCards = handValue
        this.calculate()
    }

    setTable(tableValue: TableValue) {
        this.tableValue = tableValue
        this.calculate()
    }

    private calculate() {
        if (!this.handCards.isSet() || !this.tableValue.isSet()) {
            return
        }

        console.time("simulation")
        var results = monteCarlo(this.handCards.getCardSymbolsForPokerCalcLib(),
            this.tableValue.getCardSymbolsForPokerCalcLib());
        console.timeEnd("simulation")

        const winPercent = results[0] * 100;
        this.handValue = "Win: " + winPercent.toFixed(1) + "%"

        const losePercent = results[1] * 100;
        this.handValue += " Lose: " + losePercent.toFixed(1) + "%"

        const spitPercent = results[2] * 100;
        this.handValue = this.handValue + ", Split: " + spitPercent.toFixed(1) + "%"

    }

}

