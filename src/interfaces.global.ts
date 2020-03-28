export interface IResponseMessages<Entity> {
  whenSaveSuccess?: (entity: Entity | string) => object;
  whenUpdateSuccess?: (entity: Entity | string) => object;
  whenChangePasswordSucess?: (entity: Entity | string) => object;
  whenRemoveSuccess?: () => object;
  whenImageUploadError?: (entity: Entity | string, details?: Error) => object;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IChangePassword {
  email: string;
  currentPassword?: string;
  newPassword: string;
  dbPassword?: string;
}

export interface IForgotPassword {
  email: string;
}
