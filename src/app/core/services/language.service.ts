import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { SUPPORTED_LANGS } from '../models/types/lang.type';
import { Lang } from '../models/types/lang.type';

const STORAGE_KEY = 'lang';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly _ts = inject(TranslateService);


  //#region VARIABLES
  private readonly _activeLang$ = new BehaviorSubject<Lang>('es');
  public readonly activeLanguage$: Observable<Lang> = this._activeLang$.asObservable();

  /** Conveniencia para obtener el valor actual sin suscribirse */
  get activeLanguage(): Lang {
    return this._activeLang$.value;
  }

  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID)); // útil para SSR y tests
  //#endregion

  //#region PUBLIC METHODS
  public setInitialLanguage(): void {
    this._ts.addLangs([...SUPPORTED_LANGS]);

    const storage = this.readStorageLang();
    if (storage) {
      this.applyLang(storage);
      return;
    }

    const browserLang = this.coerceToSupported(this._ts.getBrowserLang());
    this.applyLang(browserLang ?? 'es', true);
  }

  public setActiveLang(value: Lang): void {
    const lang = this.coerceToSupported(value) ?? 'es';
    this.applyLang(value);
  }
  //#endregion

  //#region PRIVATE METHODS
  private applyLang(lang: Lang, firstRender: boolean = false): void {
   const changed = this._activeLang$.value !== lang;

    this._ts.setFallbackLang(lang);
    this._ts.use(lang);

    if (!changed && !firstRender) return;

    this._activeLang$.next(lang);
    this.writeStorageLang(lang);
    this.setHtmlLangAttr(lang);
    }

  /**
   * Recorta los formatos de idioma a 2 caracteres
   * @param value puede entrar un "es-ES" o directamente "es"
   * @returns  entra "es-ES" -> "es", entra "en-US" -> "en", entra "en" -> sale "en"
   */
  private coerceToSupported(value?: string | null): Lang | null {
    if (!value) return null;

    const two = value.slice(0, 2).toLowerCase();
    return (SUPPORTED_LANGS as readonly string[]).includes(two) ? (two as Lang) : null;
  }

  private readStorageLang(): Lang | null {
    if (!this.isBrowser) return null;

    let result: Lang | null = null;

    const raw = localStorage.getItem(STORAGE_KEY);
    result = this.coerceToSupported(raw);

    return result;
  }

  private writeStorageLang(lang: Lang): void {
    if (!this.isBrowser) return;

    if (localStorage.getItem(STORAGE_KEY) !== lang) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  private setHtmlLangAttr(lang: Lang): void {
    if (!this.isBrowser) return;

    try {
      document.documentElement.setAttribute('lang', lang);
    } catch {}
  }
  //#endregion
}
