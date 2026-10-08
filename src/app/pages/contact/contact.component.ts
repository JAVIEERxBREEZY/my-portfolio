import { Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ICard, ICardColors } from 'src/app/core/models/interfaces/card.interface';
import { ISites } from 'src/app/core/models/interfaces/sites.interface';
import { CARD_DATA } from 'src/app/core/models/constants/card-content.constants';
import { AppOverflowService } from 'src/app/core/services/app-overflow.service';

@Component({
    selector: 'jav-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ContactComponent implements OnInit, OnDestroy {

  public readonly cards = CARD_DATA;

  constructor(private _aos: AppOverflowService) {}

  ngOnInit(): void {
    this._aos.setMobileOverflow();
  }

  ngOnDestroy(): void {
    this._aos.cleanMobileStyles();
  }



}
