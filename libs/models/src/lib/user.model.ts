export interface UserRoleModel {
  id?: string;
  name?: string;
  description?: string;
}

export interface UserMetadata {
  rate?: number;
}

export interface UserModel {
  username: string;
  roles: Array<UserRoleModel>;
  user_metadata?: UserMetadata;
}
