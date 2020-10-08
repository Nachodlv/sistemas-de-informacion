// Angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

// App Components
import {AppComponent} from './app.component';
import {UserFormComponent} from './components/user-form/user-form.component';

// Ngx Bootstrap
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ModalModule} from 'ngx-bootstrap/modal';

// Extras
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AlertModule} from './alerts';
import { NgxSpinnerModule } from 'ngx-bootstrap-spinner';


@NgModule({
  declarations: [
    // App Components
    AppComponent,
    UserFormComponent,
  ],
  imports: [

    // Angular
    BrowserModule,
    AppRoutingModule,

    // Ngx Bootstrap
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),

    // Extras
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertModule,
    NgxSpinnerModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
