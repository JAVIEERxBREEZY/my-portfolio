import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, inject } from '@angular/core';
import { COMPANIES } from 'src/app/core/models/constants/companies.constants';
import { ICompaniesCard } from 'src/app/core/models/interfaces/companies-card.interface';
import { AppOverflowService } from 'src/app/core/services/app-overflow.service';

@Component({
    selector: 'jav-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ExperienceComponent implements OnInit, OnDestroy {
  private readonly _aos = inject(AppOverflowService);


  public readonly companies: ICompaniesCard[] = COMPANIES;

  ngOnInit(): void {
    this._aos.setMobileOverflow();
  }

  ngOnDestroy(): void {
    this._aos.cleanMobileStyles();
  }

}
