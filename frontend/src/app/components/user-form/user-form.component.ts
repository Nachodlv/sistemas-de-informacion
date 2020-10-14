import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {UserCreationForm, UserRole, UserRoleMapping} from '../../models/user-model';
import {AlertService} from '../../alerts';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-bootstrap-spinner';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit, OnDestroy {

  public registerForm: FormGroup;
  public userRoleTypes: string[] = Object.values(UserRole);
  public userRoleMapping = UserRoleMapping;

  private userSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService,
              private alertService: AlertService,
              private ngxSpinner: NgxSpinnerService, private router: Router) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      repeatPassword: [''],
      role: [UserRole.PICKER]
    }, {validator: this.checkPasswords});
  }

  checkPasswords(group: FormGroup): { notSame: boolean } {
    const pass = group.get('password').value;
    const confirmPass = group.get('repeatPassword').value;
    return pass === confirmPass ? null : {notSame: true};
  }

  submitForm(): void {
    this.registerForm.markAllAsTouched();
    this.ngxSpinner.show();
    if (this.registerForm.valid) {
      this.userSubscription = this.userService.save(Object.assign(new UserCreationForm(), this.registerForm.value)).subscribe(user => {
        this.ngxSpinner.hide();
        this.router.navigate(['user']).then(() => {
          this.alertService.success('Usuario creado exitosamente!');
        });
      }, (_ => {
        this.alertService.error('Ocurrió un error al crear el usuario.');
        this.ngxSpinner.hide();
      }));
    }
  }

  isInputInvalid(error: string, name: string): boolean {
    return this.registerForm.get(name).touched && this.registerForm.hasError(error, name);
  }

  isRepeatedPasswordInvalid(): boolean {
    return this.registerForm.get('repeatPassword').touched && this.registerForm.hasError('notSame');
  }

  ngOnDestroy(): void {
    this.userSubscription?.unsubscribe();
  }
}
