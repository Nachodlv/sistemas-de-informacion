export class User {
  constructor(public id: string, public name: string, public role: UserRole) {
  }

  static fromJson(json: any): User {
    return new User(json.id, json.name, json.role);
  }
}

export class UserCreationForm {
  constructor(public name: string = '', public role: UserRole = UserRole.PICKER) {
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
