import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { APP_BASE_HREF } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent }   from './app.component';
 
import { AppRoutes } from './app.routing';
import { HeaderInterceptor } from './interceptors/header.interceptor';

@NgModule({
    imports:      [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(AppRoutes,{
          useHash: true
        }),
        NgbModule,
        HttpModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent
    ],
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: HeaderInterceptor,
        multi: true
      }
    ],
    exports: [],
    bootstrap:    [ AppComponent ]
})

export class AppModule { }
