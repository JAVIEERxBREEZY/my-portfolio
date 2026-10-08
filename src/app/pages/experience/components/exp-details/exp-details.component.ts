import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICompaniesCard } from 'src/app/core/models/interfaces/companies-card.interface';
import { FADE_IN_OUT } from 'src/app/shared/animations/fade-in-out.animation';


@Component({
    selector: 'jav-exp-details',
    templateUrl: './exp-details.component.html',
    styleUrls: ['./exp-details.component.scss'],
    animations: [FADE_IN_OUT],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ExpDetailsComponent implements OnInit {

  // #region INPUTS & OUTPUTS
  @Input() data: ICompaniesCard = {
    title: '',
    logo: '',
    description: '',
    timeline : '',
    techs : []
  };

  @Output() closeDetails = new EventEmitter<boolean>();
  userClickClose(value: boolean): void {
    this.closeDetails.emit(value);
  }
  // #endregion

  // #region CONSTRUCTOR & LIFECYCLE HOOKS
  constructor() { }

  ngOnInit(): void {
  }
  // #endregion

}
