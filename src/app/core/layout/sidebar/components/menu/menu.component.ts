import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { IMenuItem } from 'src/app/core/models/interfaces/menu-item.interface';
import { NavigationEnd, Router } from '@angular/router';
import { MENU_ITEMS } from 'src/app/core/models/constants/menu-items.constants';
import { SidebarStatusService } from 'src/app/shared/services/sidebar-status.service';

@Component({
    selector: 'jav-menu',
    templateUrl: './menu.component.html',
    standalone: false
})
export class MenuComponent implements OnInit {


  // #region VARIABLES

  protected sidebarActive: boolean = false;
  public activeRoute: string = "";

  public readonly menuItems: IMenuItem[] = MENU_ITEMS;
  // #endregion

  constructor(
    private _router: Router,
    private _sss: SidebarStatusService
  ) {
    _router.events.forEach((event) => {
      if(event instanceof NavigationEnd) {
        this.changeActiveRoute();
      }
    });
  }

  ngOnInit(): void {
    this.suscribeToSidebarStatusService();
  }

  private suscribeToSidebarStatusService(): void {
    this._sss.getSidebarActive().subscribe((isActive: boolean) => {
      this.sidebarActive = isActive;
    });
  }

  private changeActiveRoute(): void {
    this.activeRoute = this._router.url;
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
