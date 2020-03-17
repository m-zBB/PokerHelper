import { Component, OnInit, ViewChild } from '@angular/core';
import { HandCards, HandComponent } from 'src/app/shared/hand/hand.component';
import { TableCards } from 'src/app/shared/table/table.component';
import { monteCarlo } from 'src/app/simulator/simulator';
import { cardDeck, Card } from 'src/app/models/card.models';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-table-estimator',
    templateUrl: './table-estimator.component.html',
    styleUrls: ['./table-estimator.component.css']
})
export class TableEstimatorComponent implements OnInit {
    handCards: HandCards;
    tableCards: TableCards;
    deck: cardDeck;

    @ViewChild("hand")
    hand: HandComponent

    constructor(private route: ActivatedRoute) {
        this.handCards = new HandCards()
        this.tableCards = new TableCards()
        this.deck = new cardDeck()

    }

    handValue: string

    ngOnInit(): void {
        this.handValue = "Pick hand cards and table cards";
        this.setCardFromRouteParam("handCard1", this.hand.value.card1);
        this.setCardFromRouteParam("handCard2", this.hand.value.card2);
    }

    private setCardFromRouteParam(paramName: string, cardToSet: Card) {
        const paramMap = this.route.snapshot.paramMap;
        if (paramMap.has(paramName)) {
            const cardSymbol = paramMap.get(paramName);
            const card = Card.fromString(cardSymbol);
            cardToSet.set(card);
            this.deck.pickCard(card);
        }
    }

    setHand(handValue: HandCards) {
        this.handCards = handValue
        this.calculate()
    }

    setTable(tableValue: TableCards) {
        this.tableCards = tableValue
        this.calculate()
    }

    private calculate() {
        if (!this.handCards.isSet() || !this.tableCards.isSet()) {
            return
        }

        console.time("simulation")
        var results = monteCarlo(this.handCards.getCardSymbolsForPokerCalcLib(),
            this.tableCards.getCardSymbolsForPokerCalcLib());
        console.timeEnd("simulation")

        const winPercent = results[0] * 100;
        this.handValue = "Win: " + winPercent.toFixed(1) + "%"

        const losePercent = results[1] * 100;
        this.handValue += " Lose: " + losePercent.toFixed(1) + "%"

        const spitPercent = results[2] * 100;
        this.handValue = this.handValue + ", Split: " + spitPercent.toFixed(1) + "%"

    }

}

