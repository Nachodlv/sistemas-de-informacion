import {Injectable} from '@angular/core';
import {CachedReplaySubject} from './storage/CachedReplaySubject';
import {User} from '../models/user-model';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedUser: number;

  constructor(private httpService: HttpService) {
  }

  login(loginForm: {username: string, password: string}): Observable<void> {
    return this.httpService.post('/login', loginForm).pipe(tap((response) => {
      console.log(response);
      localStorage.setItem(HttpService.USER_KEY, response.headers.get('Authorization'));
    }), map(_ => {}));
  }
}

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    return next.handle(request).pipe(
      tap(response => {
        if (response.headers) {
          console.log('Header keys', response.headers.keys());
          console.log('Authorization: ', response.headers.get('authorization'));
        }
      }),
    );
  }
}
