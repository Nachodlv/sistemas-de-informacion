import {Injectable} from '@angular/core';
import {CachedReplaySubject} from './storage/CachedReplaySubject';
import {User, UserCreationForm, UserRole} from '../models/user-model';
import {Observable, of} from 'rxjs';
import {HttpService} from './http.service';
import {map, switchMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = '/user';
  private usersCached = new CachedReplaySubject<number, User>();

  constructor(private http: HttpService) {
  }

  save(userForm: UserCreationForm): Observable<User> {
    return this.http.post(this.url, userForm).pipe(
      map(response => User.fromJson(response.body)),
      switchMap(user => this.usersCached.addValue(user)));
  }

  deleteUser(userId: number): Observable<boolean> {
    return this.http.delete(`${this.url}/${userId}`).pipe(
      tap((_) => this.usersCached.deleteValue(userId)),
      map((response) => response.body)
    );
  }

  getUser(userId: number): Observable<User> {
    return this.usersCached.get(userId,
      () => this.http.get(`${this.url}/${userId}`).pipe(map(response => User.fromJson(response.body)
      )));
  }

  getAll(): Observable<User[]> {
    return this.usersCached.getAll(() =>
      this.http.get(this.url).pipe(
        map(response => response.body.map(user => User.fromJson(user)))
      ));
  }
}
