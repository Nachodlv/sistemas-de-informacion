import {Injectable} from '@angular/core';
import {User, UserRole} from '../models/user-model';
import {HttpService} from './http.service';
import {Observable, throwError} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import jwt_decode from 'jwt-decode';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser: number;

  constructor(private httpService: HttpService, private userService: UserService) {
  }

  login(loginForm: { username: string, password: string }): Observable<UserRole> {
    return this.httpService.post('/login', loginForm).pipe(map((response) => {
      const token = response.headers.get('Authorization').split('Bearer')[1];
      const tokenDecoded = jwt_decode(token);
      localStorage.setItem(HttpService.USER_KEY, token);
      this.loggedUser = tokenDecoded.id;
      return tokenDecoded.role as UserRole;
    }));
  }

  logout(): void {
    this.loggedUser = null;
    localStorage.removeItem(HttpService.USER_KEY);
  }

  getLoggedUser(): Observable<User> {
    if (!this.loggedUser) {
      throwError('No logged user!');
    }
    return this.userService.getUser(this.loggedUser);
  }

  isAuthorized(allowedRoles: string[]): Observable<boolean> {
    return this.getRole().pipe(map(userRole => allowedRoles.includes(userRole)));
  }

  private getRole(): Observable<UserRole> {
    return this.httpService.get('/role').pipe(map(response => response.body.role));
  }
}

