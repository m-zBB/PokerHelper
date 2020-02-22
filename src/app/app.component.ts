import { Component, OnInit } from '@angular/core';
import { texasHoldem } from 'hutchison';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'poker-helper';

    ngOnInit() {
        var result = texasHoldem({ hand: ['Ah', 'Ad'] });
        //alert(result.percentile * 100);
    }
}
