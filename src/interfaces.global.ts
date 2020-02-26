export interface IResponseMessages<Entity> {
    whenSaveSuccess?: (entity: Entity | string) => object;
    whenUpdateSuccess?: (entity: Entity | string) => object;
    whenChangePasswordSucess?: (entity: Entity | string) => object;
    whenRemoveSuccess?: () => object;
    whenImageUploadError?: (entity: Entity | string, details?: Error) => object;
  }

export interface ILogin {
  email: string | String;
  password: string | String;
}

export interface IChangePassword {
  email: string | String;
  currentPassword?: string | String;
  newPassword: string | String;
}

export interface IForgotPassword {
  email: String;
}
