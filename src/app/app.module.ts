import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SharedModule } from './shared/modules/shared.module';
import { LoginComponent } from './site/login/login.component';
import { RegisterComponent } from './site/register/register.component';
import { NavbarComponent } from './site/navbar/navbar.component';

import { StartupService } from './shared/services/startup.service';
import { AuthHeaderInterceptor } from './shared/interceptors/header.interceptor';
import { CatchErrorInterceptor } from './shared/interceptors/http-error.interceptor';

export function startupServiceFactory(
  startupService: StartupService
): Function {
  return () => startupService.load();
}
@NgModule({
  declarations: [ AppComponent, LoginComponent, RegisterComponent, NavbarComponent ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FlexLayoutModule,
    SharedModule,
  ],
  providers: [
    {provide: APP_INITIALIZER, useFactory: startupServiceFactory, deps: [StartupService], multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: AuthHeaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: CatchErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
