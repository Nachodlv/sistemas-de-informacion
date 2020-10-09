// Angular
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';

// App Components
import {AppComponent} from './app.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import { DataTableComponent } from './components/data-table/data-table.component';
import {ConfirmModalComponent} from './services/confirm-modal.service';

// Ngx Bootstrap
import {ButtonsModule} from 'ngx-bootstrap/buttons';
import {ModalModule} from 'ngx-bootstrap/modal';

// Extras
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AlertModule} from './alerts';
import { NgxSpinnerModule } from 'ngx-bootstrap-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserListComponent } from './components/user-list/user-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SearchUserPipe } from './pipes/search-user.pipe';


@NgModule({
  declarations: [
    // App Components
    AppComponent,
    UserFormComponent,
    DataTableComponent,
    UserListComponent,
    SearchUserPipe,
    ConfirmModalComponent
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
    NgxSpinnerModule,
    NgxDatatableModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
