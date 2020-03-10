import { Component, OnInit } from '@angular/core';
import pokerCalc from 'poker-calc';
import { cardDeck } from './models/card.models';
import { monteCarlo } from './simulator/simulator';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'poker-helper';

    ngOnInit() {
  
    }
}
