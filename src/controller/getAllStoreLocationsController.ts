import { StoreLocationRepository } from "../repository";

export function getAllStoreLocationsController( repository: StoreLocationRepository ) {
  return async () => {
    const result = await repository.getAllStoreLocations();
    return result;
  };
}
