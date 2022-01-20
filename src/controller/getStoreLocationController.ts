import { StoreLocationRepository } from "../repository";
import { GetStoreLocationInputDataType } from "../type";
import { getStoreLocationValidator } from "../validator";

export function getStoreLocationController( repository: StoreLocationRepository ) {
  return async ( data: GetStoreLocationInputDataType ) => {
    const validationError = getStoreLocationValidator( data );
    if ( validationError !== null )
      return validationError;

    const result = await repository.getStoreLocation( data );

    if ( result == -1 ) {
      return {
        error   : true,
        errorMsg: "invalid storeLocationId supplied",
      };
    } else {
      return {
        storeLocation: result,
        error        : false,
      };
    }
  };
}
