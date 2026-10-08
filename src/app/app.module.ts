import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/layout/header/header.component';
import { DropdownListComponent } from './shared/components/dropdown-list/dropdown-list.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { SidebarComponent } from './core/layout/sidebar/sidebar.component';
import { MenuComponent } from './core/layout/sidebar/components/menu/menu.component';
import { HomeComponent } from './pages/home/home.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { PageTitleComponent } from './shared/components/page-title/page-title.component';
import { CompanyCardComponent } from './pages/experience/components/company-card/company-card.component';
import { ModalLayoutComponent } from './shared/components/modal-layout/modal-layout.component';
import { ExpDetailsComponent } from './pages/experience/components/exp-details/exp-details.component';
import { CardComponent } from './shared/components/card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownListComponent,
    SidebarComponent,
    MenuComponent,
    HomeComponent,
    ContactComponent,
    ExperienceComponent,
    PageTitleComponent,
    CompanyCardComponent,
    ModalLayoutComponent,
    ExpDetailsComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    })
  ],
  providers: [provideHttpClient(withInterceptorsFromDi())],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
