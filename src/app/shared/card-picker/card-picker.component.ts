import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { cardDeck, card } from '../../models/card.models';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-card-picker',
    templateUrl: './card-picker.component.html',
    styleUrls: ['./card-picker.component.css']
})
export class CardPickerComponent implements OnInit {

    @ViewChild("content")
    modalContent: TemplateRef<any>;
    modal: NgbModalRef;

    open(): Promise<card> {
        this.modal = this.modalService.open(this.modalContent, {size: 'lg' })
        return this.modal.result
    }
    ngOnInit(): void {
    }

    deck: cardDeck;

    constructor(private modalService: NgbModal) {
        this.deck = new cardDeck()
    }
    close(c: card) {
        this.modal.close(c)
    }
}
