import {Injectable} from '@angular/core';
import {CachedReplaySubject} from './storage/CachedReplaySubject';
import {User} from '../models/user-model';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser: number;

  constructor(private httpService: HttpService) {
  }

  login(loginForm: { username: string, password: string }): Observable<void> {
    return this.httpService.post('/login', loginForm).pipe(tap((response) => {
      localStorage.setItem(HttpService.USER_KEY, response.headers.get('Authorization').split('Bearer')[1]);
    }), map(_ => {
    }));
  }

  logout(): void {
    localStorage.removeItem(HttpService.USER_KEY);
  }
}

