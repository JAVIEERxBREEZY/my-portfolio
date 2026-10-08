import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
    selector: 'jav-modal-layout',
    templateUrl: './modal-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ModalLayoutComponent implements OnInit {

  readonly wrapperWidth = input<string>("fit-content");


  ngOnInit(): void {
  }

}
