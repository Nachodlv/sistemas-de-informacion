import {Injectable} from '@angular/core';
import {CachedReplaySubject} from './storage/CachedReplaySubject';
import {User, UserCreationForm, UserRole} from '../models/user-model';
import {Observable, of} from 'rxjs';
import {HttpService} from './http.service';
import {map, switchMap} from 'rxjs/operators';

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

  deleteUser(user: User): Observable<void> {
    return of(this.usersCached.deleteValue(user));
  }

  getAll(): Observable<User[]> {
    return this.usersCached.getAll(() => of([
      new User(1, 'Nacho', UserRole.PICKER),
      new User(2, 'Eduardo', UserRole.ASSIGNER),
      new User(3, 'Juan', UserRole.DISPATCHER),
      new User(3, 'Juan', UserRole.DISPATCHER),
      new User(4, 'Juan', UserRole.DISPATCHER),
      new User(5, 'Juan', UserRole.DISPATCHER),
      new User(6, 'Juan', UserRole.DISPATCHER),
      new User(7, 'Juan', UserRole.DISPATCHER),
      new User(8, 'Juan', UserRole.DISPATCHER),
      new User(9, 'Juan', UserRole.DISPATCHER),
      new User(10, 'Juan', UserRole.DISPATCHER),
      new User(11, 'Juan', UserRole.DISPATCHER),
      new User(12, 'Juan', UserRole.DISPATCHER),
      new User(13, 'Juan', UserRole.DISPATCHER),
    ]));
  }
}
