import { Component, OnInit, ChangeDetectionStrategy, input } from '@angular/core';
import { NgStyle } from '@angular/common';

@Component({
    selector: 'jav-modal-layout',
    templateUrl: './modal-layout.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgStyle]
})
export class ModalLayoutComponent implements OnInit {

  readonly wrapperWidth = input<string>("fit-content");


  ngOnInit(): void {
  }

}
