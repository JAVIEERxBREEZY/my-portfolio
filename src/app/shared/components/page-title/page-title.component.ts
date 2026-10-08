import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
    selector: 'jav-page-title',
    templateUrl: './page-title.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [NgClass]
})
export class PageTitleComponent {

  readonly title = input<string>("");
  readonly description = input<string>("");
  readonly classes = input<string>("u-text-center");

}
