export interface IResponseMessages<Entity> {
    whenSaveSuccess?: (entity: Entity | string) => object;
    whenUpdateSuccess?: (entity: Entity | string) => object;
    whenRemoveSuccess?: () => object;
    whenImageUploadError?: (entity: Entity | string, details?: Error) => object;
  }
