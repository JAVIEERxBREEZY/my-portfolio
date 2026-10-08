import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardComponent } from './card.component';
import { Component, Pipe, PipeTransform } from '@angular/core';
import { By } from '@angular/platform-browser';

/** Mock del pipe de traducciones: devuelve la misma key  */
@Pipe({
    name: 'translate',
    standalone: false
})
class MockTranslatePipe implements PipeTransform {
    transform(value: any): any { return value; }
}

describe('CardComponent', () => {
    let fixture: ComponentFixture<CardComponent>;
    let component: CardComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [CardComponent, MockTranslatePipe]
        }).compileComponents();

        fixture = TestBed.createComponent(CardComponent);
        component = fixture.componentInstance;
    });

    function render() {
        fixture.detectChanges();
        return fixture.nativeElement as HTMLElement;
    }

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should render title and add class "p-flexcs" when title is not empty', () => {
        component.cardInfo = {
            title: 'YouTube',
            image: 'assets/yt.png',
            icon: 'bi-youtube',
            description: 'HOME.YT_DESC',
            name: 'Javier',
            link: 'https://youtube.com/@javier'
        };
        component.customColors = { header: '#111', content: '#fafafa' };
        component.btnType = 'c-btn c-btn--primary';

        const host = render();

        const header = host.querySelector('.c-card__header') as HTMLElement;
        const titleP = host.querySelector('.c-card__header p') as HTMLParagraphElement;

        expect(header).withContext('header exists').toBeTruthy();
        expect(header.classList.contains('p-flexcs')).toBeTrue();
        expect(titleP.textContent?.trim()).toBe('YouTube');

        expect(header.style.backgroundColor).toBe('rgb(17, 17, 17)');
        const content = host.querySelector('.c-card__content') as HTMLElement;
        expect(content.style.backgroundColor).toBe('rgb(250, 250, 250)');
    });

    it('should not render neither title <p> nor conditional class when title is empty', () => {
        component.cardInfo = {
            title: '',
            image: 'img.png',
            icon: 'bi-github',
            description: 'HOME.GH_DESC',
            name: 'Javier',
            link: 'https://github.com/javier'
        };
        component.customColors = { header: 'black', content: 'white' };

        const host = render();
        const header = host.querySelector('.c-card__header') as HTMLElement;
        const titleP = host.querySelector('.c-card__header p');

        expect(titleP).toBeNull();
        expect(header.classList.contains('p-flexcs')).toBeFalse();
    });

    it('should apply icon class and colors if customColors.icon is defined', () => {
        component.cardInfo = {
            title: 'GitHub',
            image: '/assets/gh.png',
            icon: 'bi-github',
            description: 'HOME.GH_DESC',
            name: 'Javier',
            link: 'https://github.com/javier'
        };
        component.customColors = { header: '#000', content: '#fff', icon: '#333' };

        const host = render();
        const iconEl = host.querySelector('.c-card__header i') as HTMLElement;

        expect(iconEl.classList.contains('bi')).toBeTrue();
        expect(iconEl.classList.contains('bi-github')).toBeTrue();
        expect(iconEl.style.color).toBe('rgb(51, 51, 51)');
    });

    it('should bind correctly image, name, description and link', () => {
        component.cardInfo = {
            title: 'LinkedIn',
            image: '/assets/li.png',
            icon: 'bi-linkedin',
            description: 'HOME.LI_DESC',
            name: 'Javier',
            link: 'https://linkedin.com/in/javier'
        };
        component.btnType = 'c-btn c-btn--ghost';
        component.customColors = { header: '#123456', content: '#eeeeee' };

        const host = render();

        const img = host.querySelector('.c-card__img') as HTMLImageElement;
        expect(img.src).toContain('/assets/li.png');
        expect(img.alt).toBe('card-image');
        expect(img.loading).toBe('lazy');

        const name = host.querySelector('.c-card__name') as HTMLElement;
        expect(name.textContent?.trim()).toBe('Javier');

        const desc = host.querySelector('.c-card__description') as HTMLElement;
        expect(desc.textContent?.trim()).toBe('HOME.LI_DESC');

        const a = host.querySelector('.c-card__link') as HTMLAnchorElement;
        expect(a.href).toBe('https://linkedin.com/in/javier');
        expect(a.target).toBe('_blank');

        expect(a.className).toContain('c-btn');
        expect(a.className).toContain('c-btn--ghost');

        expect(a.textContent?.trim()).toBe('BTNS.SEE_PROFILE');
  });
});