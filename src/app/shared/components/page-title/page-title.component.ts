import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'jav-page-title',
    templateUrl: './page-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PageTitleComponent {

  @Input() title: string = "";
  @Input() description: string = "";
  @Input() classes: string = "u-text-center";

}
