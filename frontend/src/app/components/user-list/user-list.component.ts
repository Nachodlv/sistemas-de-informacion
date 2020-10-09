import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import {User} from '../../models/user-model';
import {UserService} from '../../services/user.service';
import {TableColumn} from '@swimlane/ngx-datatable';
import {TableAction} from '../data-table/data-table.component';
import {tap} from 'rxjs/operators';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users$: Observable<User[]>;
  searchInput = '';
  columns: TableColumn[] = [{name: '#', prop: 'id'}, {name: 'Name'}, {name: 'Role', prop: 'roleToShow'}];
  actions: TableAction<User>[] = [new TableAction<User>({name: 'Delete', flexGrow: 3}, faTrashAlt, (user) => this.deleteUser(user))];

  private subscription: Subscription;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users$ = this.userService.getAll();
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
