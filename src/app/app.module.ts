import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FeatherModule} from 'angular-feather';
import {allIcons} from 'angular-feather/icons';
import {FormsModule} from '@angular/forms'

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FullComponent} from './layouts/full/full.component';
import {DemoFlexyModule} from './demo-flexy-module'

// Modules
import {DashboardModule} from './dashboard/dashboard.module';
import {ComponentsModule} from './components/components.module';
import {HttpClientModule} from '@angular/common/http';
import {NgOptimizedImage} from "@angular/common";
import {HotToastModule} from '@ngneat/hot-toast';
import { NgxDocViewerModule } from 'ngx-doc-viewer';
import { OAuthModule } from 'angular-oauth2-oidc';

import { ModalComponent } from './components/programs/modal/modal.component';
import { AdolescentListComponent } from './components/programs/adolescent-list/adolescent-list.component';
import { AdolescentFormComponent } from './components/programs/adolescent-form/adolescent-form.component';

import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BulkComponent } from './components/programs/bulk/component/bulk/bulk.component';
import { TransDistComponent } from './components/programs/trans-dist/trans-dist.component';


@NgModule({
  declarations: [
    AppComponent,
    FullComponent,
    ModalComponent,
    AdolescentListComponent,
    AdolescentFormComponent,
    BulkComponent,
    TransDistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    
    BrowserAnimationsModule,
    FeatherModule.pick(allIcons),
    DemoFlexyModule,
    DashboardModule,
    ComponentsModule,
    FormsModule,
    HttpClientModule,
    NgOptimizedImage,
    HotToastModule.forRoot(),
    NgxDocViewerModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    OAuthModule.forRoot(
      {
        resourceServer: {
          allowedUrls: ['http://localhost:8081/', 'http://localhost:8082/','http://localhost:9898/'],
          sendAccessToken: true
        }
      }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
