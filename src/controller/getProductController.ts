import { ProductRepository } from "../repository";
import { GetProductInputDataType } from "../type";
import { getProductValidator } from "../validator";

export function getProductController( repository: ProductRepository ) {
  return async ( data: GetProductInputDataType ) => {
    const validationError = getProductValidator( data );
    if ( validationError !== null )
      return validationError;

    const result = await repository.getProduct( data );

    if ( result == -1 ) {
      return {
        error   : true,
        errorMsg: "invalid productId supplied",
      };
    } else {
      return {
        product: result,
        error  : false,
      };
    }
  };
}
