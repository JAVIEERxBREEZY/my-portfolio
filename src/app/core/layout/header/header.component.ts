import { Component, OnInit, ViewChild, ElementRef, HostListener, OnDestroy, ChangeDetectionStrategy, ChangeDetectorRef, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { IDropdownListItem, IDropdownPosition } from 'src/app/core/models/interfaces/dropdown-list.interface';
import { Subscription } from 'rxjs';
import { SidebarStatusService } from 'src/app/shared/services/sidebar-status.service';
import { NavigationEnd, Router } from '@angular/router';
import { Lang } from '../../models/types/lang.type';
import { SUPPORTED_LANGS } from '../../models/types/lang.type';

@Component({
    selector: 'jav-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeaderComponent implements OnInit, OnDestroy {
  private readonly _ls = inject(LanguageService);
  private readonly _ts = inject(TranslateService);
  private readonly _sss = inject(SidebarStatusService);
  private readonly _router = inject(Router);
  private readonly _cdr = inject(ChangeDetectorRef);


    // #region VIEWCHILD, HOSTLISTENER
    @ViewChild('flagSection') flagSection!: ElementRef;

    @HostListener('document:click', ['$event'])
    onClick(event: any): void {
        this.flagSection.nativeElement.contains(event.target) ? this.clickLang = true :  this.clickLang = false;
    }
    // #endregion


  // #region READONLY VARIABLES
  public readonly iconVSC: string = '../../../../assets/images/vsc.png';
  public readonly listItems: string[] = [ 'HEADER.FILE', 'HEADER.EDIT', 'HEADER.SELECTION', 'HEADER.TERMINAL', 'HEADER.HELP' ];
  // #endregion

  // #region FLAGS DROPDOWN VARIABLES
  public showLangList: boolean = false;
  public clickLang: boolean = true;
  public flagsPosition: IDropdownPosition = { right: '-10px', top: '29px' };
  public flagsList: IDropdownListItem[] = [
    { label : 'Español', value: SUPPORTED_LANGS[0], image: '../../../../assets/icons/flags/es.png', alt: 'es' },
    { label : 'English', value: SUPPORTED_LANGS[1], image: '../../../../assets/icons/flags/en.png', alt: 'en' }
  ];
  // #endregion

  // #region VARIABLES
  public activeRoute: string = 'Home';
  public activeLang!: string;
  public sidebarActive: boolean = false;

  private listObservers$: Array<Subscription> = [];
  // #endregion

  // #region LIFECYCLE HOOKS
  ngOnInit(): void {
    const observableLang$ = this.getInitialLang();
    const observableRoute$ = this.getActiveRoute();
    const observableSidebar$ = this.suscribeToSidebarStatusService();

    this.listObservers$ = [observableLang$, observableRoute$ ,observableSidebar$];
  }

  ngOnDestroy() {
    this.listObservers$.forEach(u => u.unsubscribe());
  }
  // #endregion

  // #region METHODS
  public getInitialLang(): Subscription {
    return this._ls.activeLanguage$.subscribe((res) => {
      this.activeLang = res;
      this._cdr.markForCheck();
    },
    err => {
      this.activeLang = 'es';
      this._cdr.markForCheck();
    });
  }

  public getActiveRoute(): Subscription {
    return this._router.events.subscribe(value => {
      if (value instanceof NavigationEnd) {
        switch (value.url) {
          case '/':
          default:
            this.activeRoute = 'HOME';
            break;
          case '/cv':
            this.activeRoute = 'CV';
            break;
          case '/contact':
            this.activeRoute = 'CONTACT';
            break;
        }
        this._cdr.markForCheck();
      }
    });
  }

  public switchLanguage(value: Lang): void {
    this.activeLang = value;
    this._ts.use(value);
    this._ls.setActiveLang(value);
    this.showLangList = false;
  }

  public checkClickLang(value: boolean): void {
    if (value === true) {
      if (!this.clickLang) {
        this.showLangList = false;
      }
    }
  }

  private suscribeToSidebarStatusService(): Subscription {
    return this._sss.getSidebarActive().subscribe((isActive: boolean) => {
      this.sidebarActive = isActive;
      this._cdr.markForCheck();
    });
  }

  public switchSidebarStatus(value: boolean): void {
    this._sss.setSidebarActive(value);
  }
  // #endregion

}
