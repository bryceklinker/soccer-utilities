export interface UserRoleModel {
  id?: string;
  name?: string;
  description?: string;
}

export interface UserModel {
  username: string;
  roles: Array<UserRoleModel>;
  user_metadata?: {
    rate?: number;
  };
}
