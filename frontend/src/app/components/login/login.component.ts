import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {NgxSpinnerService} from 'ngx-bootstrap-spinner';
import {Router} from '@angular/router';
import {AlertService} from '../../alerts';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private spinnerService: NgxSpinnerService,
              private alertService: AlertService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isInputInvalid(error: string, name: string): boolean {
    return this.loginForm.get(name).touched && this.loginForm.hasError(error, name);
  }

  submitForm(): void {
    this.spinnerService.show();
    this.subscription = this.authService.login(this.loginForm.value).subscribe(_ => {
      this.router.navigate(['user']).then(() => this.spinnerService.hide());
    }, (error) => {
      this.spinnerService.hide();
      if (error.status === 401) {
        this.alertService.error('Usuario o contraseña inválido');
      } else {
        this.alertService.error('Ocurrió un error al iniciar sesión');
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

}
