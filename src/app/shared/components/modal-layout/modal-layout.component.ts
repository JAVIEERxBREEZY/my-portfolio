import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'jav-modal-layout',
    templateUrl: './modal-layout.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ModalLayoutComponent implements OnInit {

  @Input() wrapperWidth: string = "fit-content";

  constructor() { }

  ngOnInit(): void {
  }

}
