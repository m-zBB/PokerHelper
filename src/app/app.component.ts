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
        var params2 = {
            "boardCards": [                 // ["14H", "2H", "JH", "10H", "KH"]
                "AH", "2H", "JH", "10H", "KH"
            ],
            "playerCards": [{ "playerId": "1", "cards": ["JS", "3C"] },
            { "playerId": "2", "cards": ["JD", "3S"] }
            ]
        }


        console.time("b")
        var results = monteCarlo(["JS", "3C"], ["14H", "2H", "JH", "10H", "KH"]);
        console.log(results)
        console.timeEnd("b")
    }
}
