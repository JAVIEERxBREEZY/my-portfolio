import { Component, OnInit, ChangeDetectionStrategy, input, output } from '@angular/core';
import { ICompaniesCard } from 'src/app/core/models/interfaces/companies-card.interface';
import { FADE_IN_OUT } from 'src/app/shared/animations/fade-in-out.animation';


@Component({
    selector: 'jav-exp-details',
    templateUrl: './exp-details.component.html',
    styleUrls: ['./exp-details.component.scss'],
    animations: [FADE_IN_OUT],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ExpDetailsComponent implements OnInit {

  // #region INPUTS & OUTPUTS
  readonly data = input<ICompaniesCard>({
    title: '',
    logo: '',
    description: '',
    timeline: '',
    techs: []
  });

  readonly closeDetails = output<boolean>();
  userClickClose(value: boolean): void {
    this.closeDetails.emit(value);
  }
  // #endregion

  // #region CONSTRUCTOR & LIFECYCLE HOOKS

  ngOnInit(): void {
  }
  // #endregion

}
