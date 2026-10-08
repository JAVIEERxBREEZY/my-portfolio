import { AfterViewInit, Component, OnDestroy, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LanguageService } from 'src/app/core/services/language.service';
import TypeIt from "typeit";
import { ITypeitText } from './interfaces/typeit-text.interface';
import { TYPEIT_ES, TYPEIT_EN, DELETE_EN, DELETE_ES } from './constants/typeit.constants';

@Component({
    selector: 'jav-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  //#region READONLY VARIABLES
  private readonly typeitSpanish: ITypeitText = TYPEIT_ES;
  private readonly deleteSpanish: number[] = DELETE_ES;

  private readonly typeitEnglish: ITypeitText = TYPEIT_EN;
  private readonly deleteEnglish: number[] = DELETE_EN;
  //#endregion

  //#region VARIABLES
  public shouldRender: boolean = true;
  private activeLang: "es" | "en" | "" = "";
  public textCompleted: boolean = false;

  private firstTypeitInstance?: TypeIt;
  private secondTypeitInstance?: TypeIt;

  private listObservers$: Array<Subscription> = [];
  //#endregion

  //#region CONSTRUCTOR & LIFECYCLE HOOKS
  constructor(private _ls: LanguageService) { }

  ngOnInit(): void {
    const observableLang$ = this.getLang();
  }

  ngAfterViewInit(): void {
      this.activeLang == "es" ? this.generateFirstString(this.typeitSpanish, this.deleteSpanish) : this.generateFirstString(this.typeitEnglish, this.deleteEnglish);
  }

  ngOnDestroy() {
    this.listObservers$.forEach(u => u.unsubscribe());
  }
  //#endregion

  //#region PRIVATE METHODS
  private getLang(): Subscription {
    return this._ls.activeLanguage$.subscribe((lang: string) => {
      if (this.activeLang == "") { this.activeLang = lang as "es" | "en"; }
      else if (this.activeLang !== lang) {
       this.activeLang = lang as "es" | "en";

        this.shouldRender = false;
        this.textCompleted = false;
        setTimeout(() => {
          this.shouldRender = true;
        }, 100);
        this.activeLang == "es" ? this.generateFirstString(this.typeitSpanish, this.deleteSpanish) : this.generateFirstString(this.typeitEnglish, this.deleteEnglish);
      }
    });
  }

  private generateFirstString(lang: ITypeitText, deletes: number[]): void {
    setTimeout(() => {
      new TypeIt("#hi-message", {
        cursor: false,
        speed: 100,
        waitUntilVisible: true,
        afterComplete: async () => {
          this.generateSecondString(lang, deletes);
        }
      }).type(lang.hi, { delay: 200 })
      .go();
    }, 100);
  }

  private generateSecondString(lang: ITypeitText, deletes: number[]): void {

    const iamElement = document.getElementById('iam-message');
    if (!iamElement) return;

    iamElement.innerHTML = '';

    // Detener la animación anterior si está activa
    if (this.secondTypeitInstance) {
      this.secondTypeitInstance.destroy();
      this.secondTypeitInstance = undefined;
    }

    this.secondTypeitInstance = new TypeIt("#iam-message", {
      loop: false,
      speed: 75,
      waitUntilVisible: true,
      afterComplete: () => {
        this.textCompleted = true;
      }
    }).type(lang.iam, { delay: 200 })
    .pause(200)
    .type(`<span class='u-color-comp2'> ${lang.name} </span>`)
    .pause(1000)
    .delete(deletes[0])
    .type(`<span class='u-color-comp1'> ${lang.job1} </span>`)
    .pause(1000)
    .delete(deletes[1])
    .type(`<span class='u-color-comp1'> ${lang.job2} </span>`)
    .pause(1000)
    .delete(deletes[2])
    .type(`<span class='u-color-comp2'> ${lang.name} </span>`)
    .go();
  }

  
  public cleanMessage(): void {
    const hiEl = document.getElementById('hi-message');
    const iamEl = document.getElementById('iam-message');

    if (hiEl) hiEl.textContent = '';
    if (iamEl) iamEl.textContent = '';
  }
  //#endregion
}
