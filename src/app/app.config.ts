import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration(), importProvidersFrom(BrowserAnimationsModule, ToastrModule.forRoot({
    positionClass: 'toast-top-right',
    preventDuplicates: true,
    closeButton: true,
    progressBar: true,
    timeOut: 1500,
    easing: 'ease-in',
    extendedTimeOut: 1000,
    tapToDismiss: true,
    newestOnTop: true,
    maxOpened: 5,
    autoDismiss: true,
    enableHtml: true,
    toastClass: 'ngx-toastr toast-validacion toast-denegado'
  }))],
};
