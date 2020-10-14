export class User {

  public roleToShow: string;

  constructor(public id: number, public name: string, public role: UserRole, public username: string) {
    this.roleToShow = UserRoleMapping[role];
  }

  static fromJson(json: any): User {
    return new User(json.id, json.name, json.role, json.username);
  }
}

export class UserCreationForm {
  constructor(public name: string = '', public role: UserRole = UserRole.PICKER, public username: string) {
  }
}

export enum UserRole {
  ASSIGNER = 'ASSIGNER',
  PICKER = 'PICKER',
  SORTER = 'SORTER',
  PACKER = 'PACKER',
  DISPATCHER = 'DISPATCHER',
}

export const UserRoleMapping: Record<UserRole, string> = {
  [UserRole.ASSIGNER]: 'Assigner',
  [UserRole.PICKER]: 'Picker',
  [UserRole.SORTER]: 'Sorter',
  [UserRole.PACKER]: 'Packer',
  [UserRole.DISPATCHER]: 'Dispatcher',
};
