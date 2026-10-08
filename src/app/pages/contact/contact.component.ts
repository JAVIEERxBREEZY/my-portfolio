import { Component, OnDestroy, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
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
  private readonly _aos = inject(AppOverflowService);


  public readonly cards = CARD_DATA;

  ngOnInit(): void {
    this._aos.setMobileOverflow();
  }

  ngOnDestroy(): void {
    this._aos.cleanMobileStyles();
  }



}
