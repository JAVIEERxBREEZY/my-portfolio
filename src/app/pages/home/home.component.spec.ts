import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CommonModule } from '@angular/common';
import { provideZoneChangeDetection } from '@angular/core';
import { provideTranslateService, TranslatePipe } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import TypeIt from 'typeit';
import { LanguageService } from '../../core/services/language.service';
import { Lang } from '../../core/models/types/lang.type';

describe('HomeComponent with OnPush', () => {
  let fixture: ComponentFixture<HomeComponent>;
  let languages: BehaviorSubject<Lang>;
  let animations: TypeIt[];

  beforeEach(() => {
    languages = new BehaviorSubject<Lang>('es');
    animations = [];
    // Keep TypeIt's DOM setup while controlling visibility and completion.
    spyOn(window, 'IntersectionObserver').and.returnValue({
      observe: () => {},
      unobserve: () => {},
      disconnect: () => {}
    } as unknown as IntersectionObserver);
    const originalGo = TypeIt.prototype.go;
    spyOn(TypeIt.prototype, 'go').and.callFake(function(this: TypeIt) {
      animations.push(this);
      return originalGo.call(this);
    });

    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [CommonModule, TranslatePipe],
      providers: [
        provideZoneChangeDetection(),
        provideTranslateService(),
        { provide: LanguageService, useValue: { activeLanguage$: languages.asObservable() } }
      ]
    });

    fixture = TestBed.createComponent(HomeComponent);
    fixture.autoDetectChanges();
  });

  async function waitForStart(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 120));
    await fixture.whenStable();
  }

  function complete(animation: TypeIt): void {
    animation.getOptions().afterComplete!(animation);
  }

  it('shows navigation links when the external animation finishes', async () => {
    await waitForStart();
    expect(animations.length).toBe(1);
    expect(fixture.nativeElement.querySelector('.jav-home__links')).toBeNull();

    complete(animations[0]);
    complete(animations[1]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelectorAll('.jav-home__links a').length).toBe(2);
  });

  it('restarts typing on language changes and ignores completion of cancelled animations', async () => {
    await waitForStart();
    complete(animations[0]);
    const oldSecond = animations[1];
    complete(oldSecond);
    await fixture.whenStable();

    languages.next('en');
    await fixture.whenStable();
    expect(animations[0].is('destroyed')).toBeTrue();
    expect(oldSecond.is('destroyed')).toBeTrue();
    expect(fixture.nativeElement.querySelector('.jav-home__links')).toBeNull();

    complete(oldSecond);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.jav-home__links')).toBeNull();

    await waitForStart();
    const englishFirst = animations[2];
    const text = englishFirst.getQueue().getItems().map(item => item.char?.textContent ?? '').join('');
    expect(text).toBe('Hello,');
    complete(englishFirst);
    complete(animations[3]);
    await fixture.whenStable();
    expect(fixture.nativeElement.querySelector('.jav-home__links')).not.toBeNull();
  });

  it('cancels pending startup and unsubscribes when the component is destroyed', async () => {
    fixture.destroy();
    languages.next('en');
    await new Promise(resolve => setTimeout(resolve, 120));
    expect(animations.length).toBe(0);
  });

  it('destroys both typing instances when leaving the page', async () => {
    await waitForStart();
    complete(animations[0]);
    fixture.destroy();
    expect(animations[0].is('destroyed')).toBeTrue();
    expect(animations[1].is('destroyed')).toBeTrue();
    complete(animations[1]);
    expect(fixture.componentInstance.textCompleted).toBeFalse();
  });
});

