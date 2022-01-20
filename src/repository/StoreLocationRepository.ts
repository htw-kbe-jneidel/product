import { Types } from "mongoose";
import { GetStoreLocationInputDataType } from "../type";

export class StoreLocationRepository {
  private model: any;
  constructor( modelInQuestion: any ) {
    this.model = modelInQuestion;
  }

  async getStoreLocation( data: GetStoreLocationInputDataType ): Promise<any> {
    const dataAsObjectIds = {
      _id: new Types.ObjectId( data.storeLocationId ),
    };

    const results = await this.model.find( dataAsObjectIds );
    if ( results.length != 1 )
      return -1;

    return {
      storeLocationId: results[0]._id,
      name           : results[0].name,
      coordinates    : results[0].coordinates,
    };
  }

  async getAllStoreLocations(): Promise<any[]> {
    const results = await this.model.find( {} );

    return results.map( ( p: any ) => {
      return {
        storeLocationId: p._id,
        name           : p.name,
        coordinates    : p.coordinates,
      };
    } );
  }
}
