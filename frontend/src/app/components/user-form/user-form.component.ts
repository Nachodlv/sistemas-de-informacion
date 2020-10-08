import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../services/user.service';
import {UserCreationForm, UserRole, UserRoleMapping} from '../../models/user-model';
import {AlertService} from '../../alerts';
import {Subscription} from 'rxjs';

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

  constructor(private formBuilder: FormBuilder, private userService: UserService, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
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
    if (this.registerForm.valid) {
      this.userSubscription = this.userService.save(Object.assign(new UserCreationForm(), this.registerForm.value)).subscribe(user => {
        this.alertService.success('Usuario creado exitosamente!');
        console.log(user);
      }, (_ => this.alertService.error('Ocurrió un error al crear el usuario.')));
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
