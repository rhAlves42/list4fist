export interface IResponseMessages<Entity> {
    whenSaveSuccess: (entity: Entity | string) => object;
    // whenImageUploadError: (entity: Entity | string, details?: Error) => object;
}
  