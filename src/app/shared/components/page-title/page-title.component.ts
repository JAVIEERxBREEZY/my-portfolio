import { Component, Input } from '@angular/core';

@Component({
    selector: 'jav-page-title',
    templateUrl: './page-title.component.html',
    standalone: false
})
export class PageTitleComponent {

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() classes: string = "u-text-center";

}
