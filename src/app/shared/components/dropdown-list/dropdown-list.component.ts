import { Component, OnInit, ViewChild, HostListener, ElementRef, ChangeDetectionStrategy, input, output } from '@angular/core';
import { IDropdownPosition, IDropdownListItem } from '../../../core/models/interfaces/dropdown-list.interface';
import { Lang } from 'src/app/core/models/types/lang.type';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'jav-dropdown-list',
    templateUrl: './dropdown-list.component.html',
    styleUrls: ['./dropdown-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgStyle]
})
export class DropdownListComponent implements OnInit {

  // #region INPUTS
  readonly items = input<IDropdownListItem[]>([]);
  readonly position = input<IDropdownPosition>({});
  // #endregion

  // #region OUTPUTS
  readonly itemSelected = output<Lang>();
  onItemSelected(value: Lang) {
    this.itemSelected.emit(value);
  }

  readonly clickOutside = output<boolean>();
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


  ngOnInit(): void {
  }

}
