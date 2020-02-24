export interface IResponseMessages<Entity> {
    whenSaveSuccess?: (entity: Entity | string) => object;
    whenUpdateSuccess?: (entity: Entity | string) => object;
    whenRemoveSuccess?: () => object;
    whenImageUploadError?: (entity: Entity | string, details?: Error) => object;
  }

export interface ILogin {
  email: String;
  password: String;
}

export interface IChangePassword {
  email: String;
  currentPassword?: String;
  newPassword: String;
}