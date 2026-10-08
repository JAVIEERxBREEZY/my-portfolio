import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'jav-modal-layout',
    templateUrl: './modal-layout.component.html',
    standalone: false
})
export class ModalLayoutComponent implements OnInit {

  @Input() wrapperWidth: string = "fit-content";

  constructor() { }

  ngOnInit(): void {
  }

}
