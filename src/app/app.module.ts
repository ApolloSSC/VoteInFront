import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { PollModule } from './poll/poll.module';
import { routes } from './app.router';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { VotingProcessApiService } from './services/api/votingProcessApi.service';
import { VotingProcessModeApiService } from './services/api/votingProcessModeApi.service';
import { EnvelopeApiService } from './services/api/envelopeApi.service';
import { AuthGuard } from './services/auth/auth.guard';
import { AuthService } from './services/auth/auth.service';
import { SharedService } from './services/shared.service';
import { LoginComponent } from './login/login.component';
import { SEOService } from './services/seo.service';
import { PasswordComponent } from './password/password.component';
import { APP_INITIALIZER } from '@angular/core';
import { AppConfig } from './app.config';

export function initializeApp(appConfig: AppConfig) {
  return () => appConfig.load();
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PasswordComponent
  ],
  imports: [
    SharedModule,
    PollModule,
    routes
  ],
  providers: [
    VotingProcessApiService,
    VotingProcessModeApiService,
    SharedService,
    EnvelopeApiService,
    AuthGuard,
    AuthService,
    SEOService,
    AppConfig,
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [AppConfig], multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
