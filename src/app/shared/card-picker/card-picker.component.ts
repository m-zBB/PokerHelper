import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { cardDeck, Card, CardInDeck } from '../../models/card.models';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-card-picker',
    templateUrl: './card-picker.component.html',
    styleUrls: ['./card-picker.component.css']
})
export class CardPickerComponent implements OnInit {

    @Input() deck: cardDeck;

    @ViewChild("content")
    modalContent: TemplateRef<any>;
    modal: NgbModalRef;

    open(): Promise<Card> {
        this.modal = this.modalService.open(this.modalContent, {size: 'lg' })
        return this.modal.result
    }
    ngOnInit(): void {
    }

    constructor(private modalService: NgbModal) {

    }

    close(c: CardInDeck) {
        if (!c.isPicked) {
            this.modal.close(c)
        }

    }
}
