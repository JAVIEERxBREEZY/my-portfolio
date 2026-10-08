import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'jav-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss'],
    standalone: false
})
export class SidebarComponent implements OnInit {

  // #region VARIABLES READONLY
  public readonly icons: string [] = [ 'files', 'search', 'git', 'bug' ];

  // #endregion

  constructor() { }

  ngOnInit(): void {
  }

}
