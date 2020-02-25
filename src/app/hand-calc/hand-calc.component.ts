import { Component, OnInit } from '@angular/core';
import { cardDeck } from '../models/card.models';

@Component({
  selector: 'app-hand-calc',
  templateUrl: './hand-calc.component.html',
  styleUrls: ['./hand-calc.component.css']
})
export class HandCalcComponent implements OnInit {

  deck: cardDeck;

  constructor() {
    this.deck = new cardDeck()
  }

  ngOnInit(): void {
  }

}
