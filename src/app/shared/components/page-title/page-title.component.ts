import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
    selector: 'jav-page-title',
    templateUrl: './page-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class PageTitleComponent {

  readonly title = input<string>("");
  readonly description = input<string>("");
  readonly classes = input<string>("u-text-center");

}
