import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { AppModule } from '../../app.module';
import { LanguageService } from './language.service';

@Component({
  selector: 'jav-translation-test',
  imports: [TranslatePipe],
  template: '<span>{{ "HEADER.FILE" | translate }}</span>'
})
class TranslationTestComponent {}

describe('Language translations integration', () => {
  let fixture: ComponentFixture<TranslationTestComponent>;
  let language: LanguageService;
  let translate: TranslateService;
  let http: HttpTestingController;

  beforeEach(() => {
    spyOn(localStorage, 'getItem').and.returnValue('es');
    spyOn(localStorage, 'setItem');
    spyOn(document.documentElement, 'setAttribute');

    TestBed.configureTestingModule({
      imports: [AppModule, TranslationTestComponent],
      providers: [provideHttpClientTesting()]
    });

    language = TestBed.inject(LanguageService);
    translate = TestBed.inject(TranslateService);
    http = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TranslationTestComponent);
  });

  afterEach(() => http.verify());

  function renderedText(): string {
    TestBed.tick();
    fixture.detectChanges();
    return (fixture.nativeElement as HTMLElement).textContent!.trim();
  }

  it('loads the saved language and updates the rendered translation when switching languages', () => {
    language.setInitialLanguage();
    fixture.detectChanges();
    http.expectOne('./assets/i18n/es.json').flush({ HEADER: { FILE: 'Archivo' } });
    expect(renderedText()).toBe('Archivo');

    language.setActiveLang('en');
    http.expectOne('./assets/i18n/en.json').flush({ HEADER: { FILE: 'File' } });
    expect(renderedText()).toBe('File');
    expect(translate.getCurrentLang()).toBe('en');
    expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'en');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('lang', 'en');

    language.setActiveLang('es');
    expect(renderedText()).toBe('Archivo');
    http.expectNone('./assets/i18n/es.json');
  });
});
