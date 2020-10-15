import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListComponent} from './components/user-list/user-list.component';
import {UserFormComponent} from './components/user-form/user-form.component';
import {LoginComponent} from './components/login/login.component';
import {AuthorizationGuard} from './guard/authorization.guard';
import {UserRole} from './models/user-model';


const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserListComponent, canActivate: [AuthorizationGuard], data: {allowedRoles: [UserRole.ASSIGNER]}},
  {path: 'user/create', component: UserFormComponent, canActivate: [AuthorizationGuard], data: {allowedRoles: [UserRole.ASSIGNER]}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
