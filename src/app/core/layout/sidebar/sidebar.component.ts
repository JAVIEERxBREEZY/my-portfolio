import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { NgClass } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'jav-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass, MenuComponent, TranslatePipe]
})
export class SidebarComponent implements OnInit {

  // #region VARIABLES READONLY
  public readonly icons: string [] = [ 'files', 'search', 'git', 'bug' ];

  // #endregion


  ngOnInit(): void {
  }

}
