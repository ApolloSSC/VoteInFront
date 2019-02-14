import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { SEOService } from './services/seo.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  private authorizedLanguages = ['en', 'fr'];
  private defaultLanguage = 'en';

  constructor(public router: Router, public authService: AuthService, private seoService: SEOService, private translate: TranslateService) {
    seoService.addSeoData();
    translate.setDefaultLang(this.getCurrentLanguage());
  }

  logout() {
    this.authService.logout();
  }

  switchLanguage(language: string) {
    this.translate.use(this.authorizedLanguages.includes(language) ? language : this.defaultLanguage);
  }

  private getCurrentLanguage() {
    return navigator.language != null && this.authorizedLanguages.includes(navigator.language) ? navigator.language : this.defaultLanguage;
  }
}
