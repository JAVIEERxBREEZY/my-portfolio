import { Component, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { IMenuItem } from 'src/app/core/models/interfaces/menu-item.interface';
import { NavigationEnd, Router } from '@angular/router';
import { MENU_ITEMS } from 'src/app/core/models/constants/menu-items.constants';
import { SidebarStatusService } from 'src/app/shared/services/sidebar-status.service';

@Component({
    selector: 'jav-menu',
    templateUrl: './menu.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class MenuComponent implements OnDestroy {
  private readonly _router = inject(Router);
  private readonly _sss = inject(SidebarStatusService);
  private readonly _cdr = inject(ChangeDetectorRef);



  // #region VARIABLES

  public activeRoute: string = this._router.url;
  private readonly routeSubscription = this._router.events.subscribe((event) => {
    if (event instanceof NavigationEnd) {
      this.changeActiveRoute();
    }
  });

  public readonly menuItems: IMenuItem[] = MENU_ITEMS;
  // #endregion

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
