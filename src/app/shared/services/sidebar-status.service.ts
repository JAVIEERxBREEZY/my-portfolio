import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarStatusService {

  public sidebarActive$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);


  getSidebarActive() {
    return this.sidebarActive$.asObservable();
  }
  
  setSidebarActive(isActive: boolean) {
    this.sidebarActive$.next(isActive);
  }
}
