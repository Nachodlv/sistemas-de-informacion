import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserFormComponent} from './components/user-form/user-form.component';


const routes: Routes = [
  { path: '',   redirectTo: 'user', pathMatch: 'full' }, // redirect to `first-component`
  { path: 'user', component: UserListComponent },
  { path: 'user/create', component: UserFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
