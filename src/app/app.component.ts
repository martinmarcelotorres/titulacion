import { Component } from '@angular/core';
import { AuthConfig, NullValidationHandler, OAuthService } from 'angular-oauth2-oidc';
import { MenssageService } from './components/component-funcionality/services/login/message.service';
import { LoginService } from './components/component-funcionality/services/login/login.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {

  isAdmin!: boolean;
  title = 'frontend';

  constructor(
    private oauthService: OAuthService,
    private messageService: MenssageService,
    private loginService: LoginService) {
    this.configure();
  }

  authConfig: AuthConfig = {

    issuer: 'http://localhost:8080/realms/soa',
    redirectUri: window.location.origin,
    clientId: 'client',
    responseType: 'code',
    scope: 'openid profile email offline_access',
    showDebugInformation: true,
  };

  configure(): void {
    this.oauthService.configure(this.authConfig);
    this.oauthService.tokenValidationHandler = new NullValidationHandler();
    this.oauthService.setupAutomaticSilentRefresh();
    this.oauthService.loadDiscoveryDocument().then(() => this.oauthService.tryLogin())
      .then(() => {
        if (this.oauthService.hasValidIdToken()) {
          this.isAdmin = this.loginService.getIsAdmin();
          const username = this.oauthService.getIdentityClaims()['preferred_username']
          this.messageService.sendMessage(username, this.loginService.getIsLoggerd());
        }
      });

  }


}
