import {Pipe, PipeTransform} from '@angular/core';
import {User} from '../models/user-model';

@Pipe({
  name: 'searchUser'
})
export class SearchUserPipe implements PipeTransform {

  transform(users: User[], searchInput: string): User[] {
    if (!searchInput) {
      return users;
    }
    const searchLowerCase = searchInput.toLowerCase();
    return users.filter(user =>
      user.id.toString().includes(searchLowerCase) ||
      user.name.toLowerCase().includes(searchLowerCase) ||
      user.role.toLowerCase().includes(searchLowerCase));
  }

}
