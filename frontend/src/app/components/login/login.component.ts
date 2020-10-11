import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
  }

  isInputInvalid(error: string, name: string): boolean {
    return this.loginForm.get(name).touched && this.loginForm.hasError(error, name);
  }

  submitForm(): void {}

}
