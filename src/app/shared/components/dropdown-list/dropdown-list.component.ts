import { Component, OnInit, Input, Output, EventEmitter, ViewChild, HostListener, ElementRef } from '@angular/core';
import { IDropdownPosition, IDropdownListItem } from '../../../core/models/interfaces/dropdown-list.interface';
import { Lang } from 'src/app/core/models/types/lang.type';

@Component({
    selector: 'jav-dropdown-list',
    templateUrl: './dropdown-list.component.html',
    styleUrls: ['./dropdown-list.component.scss'],
    standalone: false
})
export class DropdownListComponent implements OnInit {

  // #region INPUTS
  @Input() items: IDropdownListItem[] = [];
  @Input() position: IDropdownPosition = {};
  // #endregion

  // #region OUTPUTS
  @Output() itemSelected = new EventEmitter<Lang>();
  onItemSelected(value: Lang) {
    this.itemSelected.emit(value);
  }

  @Output() clickOutside = new EventEmitter<boolean>();
  // #endregion

  // #region VIEWCHILD, HOSTLISTENER
  @ViewChild('dropdownList') compSection!: ElementRef;

  @HostListener('document:click', ['$event'])
  onClick(event: any): void {
      if (!this.compSection.nativeElement.contains(event.target)) {
        this.clickOutside.emit(true);
      }
  }
  // #endregion

  constructor() { }

  ngOnInit(): void {
  }

}
