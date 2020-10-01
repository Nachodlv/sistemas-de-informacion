export class User {
  constructor(public id: string, public name: string, public role: UserRole) {
  }

  static fromJson(json: any): User {
    return Object.assign(User, json);
  }
}

export class UserCreationForm {
  constructor(public name: string = '', public role: UserRole = UserRole.Picker) {
  }
}

export enum UserRole {
  Assigner = 'Assigner',
  Picker = 'Picker',
  Sorter = 'Sorter',
  Packer = 'Packer',
  Dispatcher = 'Dispatcher',
}
