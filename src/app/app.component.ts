import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { LanguageService } from './core/services/language.service';
import { SidebarStatusService } from './shared/services/sidebar-status.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jav-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class AppComponent implements OnInit, OnDestroy {

  // #region VARIABLES
  public sidebarActive: boolean = false;
  // #endregion

  // #region CONSTRUCTOR & LIFECYCLE HOOKS
  constructor(private _ls: LanguageService, private _sss: SidebarStatusService) {
    _ls.setInitialLanguage();
  }
  // #endregion

  // #region LIFECYCLE HOOKS
  ngOnInit(): void {
    this.suscribeToSidebarStatusService();
  }

  ngOnDestroy(): void {
  }
  // #endregion

  // #region METHODS
  /**
   * Show/hide sidebar in responsive structure (only small devices)
   * @param value 
   */
  public switchSidebarStatus(value: boolean): void {
    this._sss.setSidebarActive(value);
  }

  private suscribeToSidebarStatusService(): Subscription {
    return this._sss.getSidebarActive().subscribe((isActive: boolean) => {
      this.sidebarActive = isActive;
    });
  }
  // #endregion

}
