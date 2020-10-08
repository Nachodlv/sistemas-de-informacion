import {Injectable} from '@angular/core';
import {CachedReplaySubject} from './storage/CachedReplaySubject';
import {User, UserCreationForm} from '../models/user-model';
import {Observable, of} from 'rxjs';
import {HttpService} from './http.service';
import {map, switchMap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = '/user';
  private usersCached = new CachedReplaySubject<string, User>();

  constructor(private http: HttpService) {
  }

  save(userForm: UserCreationForm): Observable<User> {
    return this.http.post(this.url, userForm).pipe(
      map(response => User.fromJson(response.body)),
      switchMap(user => this.usersCached.addValue(user.id, user)));
  }
}
