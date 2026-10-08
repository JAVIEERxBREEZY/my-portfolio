import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { IMenuItem } from 'src/app/core/models/interfaces/menu-item.interface';
import { NavigationEnd, Router } from '@angular/router';
import { MENU_ITEMS } from 'src/app/core/models/constants/menu-items.constants';
import { SidebarStatusService } from 'src/app/shared/services/sidebar-status.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'jav-menu',
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MenuComponent implements OnDestroy {


  // #region VARIABLES

  public activeRoute: string = "";
  private readonly routeSubscription: Subscription;

  public readonly menuItems: IMenuItem[] = MENU_ITEMS;
  // #endregion

  constructor(
    private _router: Router,
    private _sss: SidebarStatusService,
    private _cdr: ChangeDetectorRef
  ) {
    this.activeRoute = _router.url;
    this.routeSubscription = _router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.changeActiveRoute();
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
  }

  private changeActiveRoute(): void {
    this.activeRoute = this._router.url;
    this._cdr.markForCheck();
  }

  public goToRoute(item: IMenuItem): void {
    if (item.link) {
      this._router.navigate([item.link]);
    }
  }

  public closeSidebar(): void {
    this._sss.setSidebarActive(false);
  }

}
