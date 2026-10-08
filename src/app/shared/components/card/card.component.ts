import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { ICard, ICardColors } from 'src/app/core/models/interfaces/card.interface';

@Component({
    selector: 'jav-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CardComponent implements OnInit {

  //#region INPUTS & OUTPUTS
  readonly cardInfo = input<ICard>({
    title: '',
    image: '',
    icon: '',
    description: '',
    name: '',
    link: ''
  });

  readonly customColors = input<ICardColors>({
    header: 'black',
    content: 'white'
  });

  readonly btnType = input<string>("c-btn");
  //#endregion


  ngOnInit(): void {
  }

}
