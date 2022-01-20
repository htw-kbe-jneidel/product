import { ProductRepository } from "../repository";

export function getAllProductsController( repository: ProductRepository ) {
  return async () => {
    const result = await repository.getAllProducts();
    return result;
  };
}
