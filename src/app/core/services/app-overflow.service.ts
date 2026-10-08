import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppOverflowService {


  public setMobileOverflow(): void {
    const container = document.querySelector<HTMLElement>('#jav-app-container');

    if (!container) return;

    if (window.innerWidth < 576) {
      container.style.overflowY = 'auto';
      container.style.paddingBottom = '16px';
    }
  }

  public cleanMobileStyles(): void {
    const container = document.querySelector<HTMLElement>('#jav-app-container');

    if (!container) return;

    container.style.overflowY = '';
    container.style.paddingBottom = '';
  }
}
