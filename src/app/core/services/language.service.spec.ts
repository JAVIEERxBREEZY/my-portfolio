import { TestBed } from '@angular/core/testing';
import { PLATFORM_ID } from '@angular/core';
import { LanguageService } from './language.service';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

class TranslateServiceMock {
  addLangs = jasmine.createSpy('addLangs');
  getBrowserLang = jasmine.createSpy('getBrowserLang');
  setFallbackLang = jasmine.createSpy('setFallbackLang');
  use = jasmine.createSpy('use');
}

describe('LanguageService', () => {

  //#region VARIABLES
  let service: LanguageService;
  let _ts: TranslateServiceMock;

  // Simulación de localStorage en memoria para espiar lecturas/escrituras
  let memStorage: Record<string, string>;
  const LANG_KEY = 'lang';
  //#endregion

  //#region BEFORE EACH
  beforeEach(() => {
    memStorage = {};

    // Espiamos el localStorage nativo pero delegamos a un mapa en memoria
    spyOn(window.localStorage, 'getItem').and.callFake((key: string) => {
      return Object.prototype.hasOwnProperty.call(memStorage, key) ? memStorage[key] : null;
    });

    spyOn(window.localStorage, 'setItem').and.callFake((key: string, value: string) => {
      memStorage[key] = value;
    });

    spyOn(window.localStorage, 'removeItem').and.callFake((key: string) => {
      delete memStorage[key];
    });

    // Espiamos <html lang="..">
    spyOn(document.documentElement, 'setAttribute');

    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: PLATFORM_ID, useValue: 'browser' }
      ]
    });

    service = TestBed.inject(LanguageService);
    _ts = TestBed.inject(TranslateService) as unknown as TranslateServiceMock;

  });
  //#endregion

  //#region HELPERS
  function subscribeOnce<T>(obs: any): Promise<T> {
    return new Promise<T>((resolve) => {
      obs.pipe(take(1)).subscribe(resolve);
    });
  }
  //#endregion

  //#region TESTS
  it('should create', () => {
    expect(service). toBeTruthy();
  });

  it('setInitialLanguage: should use localStorage value if exists', () => {
    memStorage[LANG_KEY] = 'es';
    _ts.getBrowserLang.and.returnValue('en');

    service.setInitialLanguage();

    expect(_ts.addLangs).toHaveBeenCalled();
    expect(_ts.setFallbackLang).toHaveBeenCalledWith('es');
    expect(_ts.use).toHaveBeenCalledWith('es');
    expect(service.activeLanguage).toBe('es');
  });

    it('setInitialLanguage: addLangs includes supported languages', () => {
    _ts.getBrowserLang.and.returnValue('es');
    service.setInitialLanguage();

    expect(_ts.addLangs).toHaveBeenCalled();
    const args = _ts.addLangs.calls.mostRecent().args[0] as string[];
    expect(args).toContain('es');
    expect(args).toContain('en');
  });

  it('setInitialLanguage: should normalize getBrowserLang "en-US" -> "en when localStorage is empty"', () => {
    _ts.getBrowserLang.and.returnValue('en-US');

    service.setInitialLanguage();

    expect(_ts.setFallbackLang).toHaveBeenCalledWith('en');
    expect(_ts.use).toHaveBeenCalledWith('en');
    expect(service.activeLanguage).toBe('en');

    expect(localStorage.setItem).toHaveBeenCalledWith(LANG_KEY, 'en');
  });

  it('setInitialLanguage: no localStorage and no supported language -> fallback "es"', () => {
    _ts.getBrowserLang.and.returnValue('fr');

    service.setInitialLanguage();

    expect(_ts.setFallbackLang).toHaveBeenCalledWith('es');
    expect(_ts.use).toHaveBeenCalledWith('es');
    expect(service.activeLanguage).toBe('es');

    expect(localStorage.setItem).toHaveBeenCalledWith(LANG_KEY, 'es');
  });

  it('setActiveLang: changes to "en" and notifies observable', async () => {
    // valor inicial es 'es' (por constructor)
    const first = service.activeLanguage;
    expect(first).toBe('es');

    // nos suscribimos y esperamos el siguiente valor
    const nextValuePromise = new Promise<string>((resolve) => {
      const sub = service.activeLanguage$.subscribe((v) => {
        if (v === 'en') {
          resolve(v);
          sub.unsubscribe();
        }
      });
    });

    service.setActiveLang('en');

    const next = await nextValuePromise;
    expect(next).toBe('en');

    expect(_ts.setFallbackLang).toHaveBeenCalledWith('en');
    expect(_ts.use).toHaveBeenCalledWith('en');
    expect(localStorage.setItem).toHaveBeenCalledWith(LANG_KEY, 'en');
    expect(document.documentElement.setAttribute).toHaveBeenCalledWith('lang', 'en');
  });

  it('activeLanguage$: every subscriber recieves new value that changed in BehaviourSubject', async () => {
    service.setActiveLang('en');
    const v = await subscribeOnce<string>(service.activeLanguage$);
    expect(v).toBe('en');
  });

  it('SSR: with PLATFORM_ID="server" localStorage nor document are touched', () => {
    // Reconfiguramos el módulo con plataforma "server"
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useClass: TranslateServiceMock },
        { provide: PLATFORM_ID, useValue: 'server' },
      ],
    });

    const srv = TestBed.inject(LanguageService);
    const _ts2 = TestBed.inject(TranslateService) as unknown as TranslateServiceMock;

    // Llamadas que en browser tocarían DOM/Storage
    srv.setInitialLanguage();
    srv.setActiveLang('en');

    // Nunca se accede a storage ni DOM
    expect(localStorage.getItem).not.toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
    expect(document.documentElement.setAttribute).not.toHaveBeenCalled();

    // Aun así, TranslateService se alinea correctamente
    expect(_ts2.setFallbackLang).toHaveBeenCalled();
    expect(_ts2.use).toHaveBeenCalled();
  });

  //#endregion
});