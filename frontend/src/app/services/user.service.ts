import {Injectable} from '@angular/core';
import {CachedReplaySubject} from './storage/CachedReplaySubject';
import {User, UserCreationForm} from '../models/user-model';
import {Observable, of} from 'rxjs';
import {HttpService} from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersCached = new CachedReplaySubject<User>();

  constructor(private http: HttpService) {
  }

  save(userForm: UserCreationForm): Observable<User> {
    // TODO make backend request
    const user = new User('1', userForm.name, userForm.role);
    this.usersCached.set(user.id, user);
    return of(user);
  }
}
