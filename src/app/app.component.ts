import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { LanguageService } from './core/services/language.service';
import { SidebarStatusService } from './shared/services/sidebar-status.service';
import { Subscription } from 'rxjs';
import { HeaderComponent } from './core/layout/header/header.component';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'jav-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [HeaderComponent, SidebarComponent, RouterOutlet]
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly _ls = inject(LanguageService);
  private readonly _sss = inject(SidebarStatusService);
  private readonly _cdr = inject(ChangeDetectorRef);


  // #region VARIABLES
  public sidebarActive: boolean = false;
  private sidebarSubscription?: Subscription;
  // #endregion

  // #region CONSTRUCTOR & LIFECYCLE HOOKS
  constructor() {
    this._ls.setInitialLanguage();
  }
  // #endregion

  // #region LIFECYCLE HOOKS
  ngOnInit(): void {
    this.sidebarSubscription = this.suscribeToSidebarStatusService();
  }

  ngOnDestroy(): void {
    this.sidebarSubscription?.unsubscribe();
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
      this._cdr.markForCheck();
    });
  }
  // #endregion

}
