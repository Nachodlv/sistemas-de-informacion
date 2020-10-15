import { Component, OnInit } from '@angular/core';
import {HttpService} from '../../services/http.service';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }
}
