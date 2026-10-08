import { TestBed } from '@angular/core/testing';
import { ComponentFixture } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { appConfig } from './app.config';
import { LanguageService } from './core/services/language.service';
import { SidebarStatusService } from './shared/services/sidebar-status.service';

describe('Portfolio with OnPush', () => {
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let language: LanguageService;
  let sidebar: SidebarStatusService;
  let host: HTMLElement;

  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.returnValue('es');
    spyOn(localStorage, 'setItem');
    spyOn(document.documentElement, 'setAttribute');

    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [...appConfig.providers, provideHttpClientTesting()]
    });

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {
      PAGES: { HOME: 'INICIO', CONTACT: 'CONTACTO', CV: 'CURRICULUM' },
      HEADER: { FILE: 'Archivo' },
      CV: { JOBS: { YUB: { DESCRIPTION: 'Experiencia en Yub' } } }
    });
    translate.setTranslation('en', {
      PAGES: { HOME: 'HOME', CONTACT: 'CONTACT', CV: 'RESUME' },
      HEADER: { FILE: 'File' },
      CV: { JOBS: { YUB: { DESCRIPTION: 'Experience at Yub' } } }
    });

    router = TestBed.inject(Router);
    language = TestBed.inject(LanguageService);
    sidebar = TestBed.inject(SidebarStatusService);
    await router.navigateByUrl('/contact');

    fixture = TestBed.createComponent(AppComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.autoDetectChanges();
    await fixture.whenStable();
  });

  afterEach(() => TestBed.inject(HttpTestingController).verify());

  it('updates the sidebar from the service and keeps the header toggle in sync', async () => {
    const aside = host.querySelector('aside')!;
    expect(aside.classList.contains('active')).toBeFalse();

    sidebar.setSidebarActive(true);
    await fixture.whenStable();
    expect(aside.classList.contains('active')).toBeTrue();

    host.querySelector<HTMLElement>('.jav-header__menu')!.click();
    await fixture.whenStable();
    expect(aside.classList.contains('active')).toBeFalse();
  });

  it('updates the header and selected menu entry on programmatic navigation', async () => {
    await router.navigateByUrl('/cv');
    await fixture.whenStable();
    expect(host.querySelector('.jav-header__state')!.textContent).toContain('CURRICULUM');
    expect(host.querySelector('.c-menu__link--active')!.textContent).toContain('CURRICULUM');

    await router.navigateByUrl('/contact');
    await fixture.whenStable();
    expect(host.querySelector('.jav-header__state')!.textContent).toContain('CONTACTO');
    expect(host.querySelector('.c-menu__link--active')!.textContent).toContain('CONTACTO');
  });

  it('updates the language flag and nested translated content from the language service', async () => {
    await router.navigateByUrl('/cv');
    await fixture.whenStable();
    expect(host.querySelector('.jav-company-card__description')!.textContent).toContain('Experiencia en Yub');

    language.setActiveLang('en');
    await fixture.whenStable();
    expect(host.querySelector<HTMLImageElement>('.jav-header__flag img')!.src).toContain('/en.png');
    expect(host.querySelector('.jav-header__state')!.textContent).toContain('RESUME');
    expect(host.querySelector('.jav-company-card__description')!.textContent).toContain('Experience at Yub');

    language.setActiveLang('es');
    await fixture.whenStable();
    expect(host.querySelector<HTMLImageElement>('.jav-header__flag img')!.src).toContain('/es.png');
    expect(host.querySelector('.jav-company-card__description')!.textContent).toContain('Experiencia en Yub');
  });

  it('selects a language with the keyboard and closes the dropdown on an outside click', async () => {
    const toggle = host.querySelector<HTMLElement>('.jav-header__main')!;
    toggle.click();
    await fixture.whenStable();
    const english = Array.from(host.querySelectorAll<HTMLElement>('.c-dropdown__item'))
      .find(item => item.textContent!.trim() === 'English')!;
    english.dispatchEvent(new KeyboardEvent('keyup', { key: 'Enter', bubbles: true }));
    await fixture.whenStable();
    expect(host.querySelector<HTMLImageElement>('.jav-header__flag img')!.src).toContain('/en.png');
    expect(host.querySelector('jav-dropdown-list')).toBeNull();

    toggle.click();
    await fixture.whenStable();
    expect(host.querySelector('jav-dropdown-list')).not.toBeNull();
    host.querySelector<HTMLElement>('.jav-header__state')!.click();
    await fixture.whenStable();
    expect(host.querySelector('jav-dropdown-list')).toBeNull();
  });

  it('opens and closes company details through the nested component outputs', async () => {
    await router.navigateByUrl('/cv');
    await fixture.whenStable();
    host.querySelector<HTMLElement>('.jav-company-card__seemore span')!.click();
    await fixture.whenStable();
    expect(host.querySelector('jav-exp-details')).not.toBeNull();

    host.querySelector<HTMLElement>('.jav-exp-details__close')!.click();
    await fixture.whenStable();
    expect(host.querySelector('jav-exp-details')).toBeNull();
  });
});

