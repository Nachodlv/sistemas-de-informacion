import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription, throwError} from 'rxjs';
import {User} from '../../models/user-model';
import {UserService} from '../../services/user.service';
import {TableColumn} from '@swimlane/ngx-datatable';
import {TableAction} from '../data-table/data-table.component';
import {faTrashAlt} from '@fortawesome/free-regular-svg-icons';
import {NgxSpinnerService} from 'ngx-bootstrap-spinner';
import {AlertService} from '../../alerts';
import {ConfirmModalService} from '../../services/confirm-modal.service';
import {catchError, tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  users$: Observable<User[]>;
  searchInput = '';
  columns: TableColumn[] = [{name: '#', prop: 'id'}, {name: 'Name'}, {name: 'Role', prop: 'roleToShow'}];
  actions: TableAction<User>[] = [new TableAction<User>({name: 'Delete', flexGrow: 3}, faTrashAlt, (user) => this.showDeleteAlert(user))];

  private subscriptions: Subscription[] = [];

  constructor(private userService: UserService,
              private spinnerService: NgxSpinnerService,
              private alertService: AlertService,
              private confirmModalService: ConfirmModalService) {
  }

  ngOnInit(): void {
    this.spinnerService.show();
    this.users$ = this.userService.getAll().pipe(
      tap(_ => this.spinnerService.hide()),
      catchError(e => {
        this.alertService.error('Ocurrió un error al obtener a los usuarios');
        return throwError(e);
      })
    );
  }

  private showDeleteAlert(user: User): void {
    this.confirmModalService.openDeleteModal(`Desea eliminar a ${user.name}?`, 'Cancelar', 'Eliminar').subscribe(deleteUser => {
      if (deleteUser) {
        this.deleteUser(user);
      }
    });

  }

  private deleteUser(user: User): void {
    this.spinnerService.show();
    this.subscriptions.push(this.userService.deleteUser(user.id).subscribe((deleted) => {
      this.spinnerService.hide();
      if (deleted) {
        this.alertService.success('Usuario eliminado exitosamente');
      } else {
        this.alertService.error('Usuario no existente');
      }
    }, (_) => {
      this.alertService.error('Ocurrió un error al eliminar el usuario');
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

}
