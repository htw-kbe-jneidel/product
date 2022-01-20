import { Types } from "mongoose";
import { GetProductInputDataType } from "../type";

export class ProductRepository {
  private model: any;
  constructor( modelInQuestion: any ) {
    this.model = modelInQuestion;
  }

  async getProduct( data: GetProductInputDataType ): Promise<any> {
    const dataAsObjectIds = {
      _id: new Types.ObjectId( data.productId ),
    };

    const results = await this.model.find( dataAsObjectIds );
    if ( results.length != 1 )
      return -1;

    return {
      productId: results[0]._id,
      name     : results[0].name,
      image    : results[0].image,
      price    : results[0].price,
      category : results[0].category,
    };
  }

  async getAllProducts(): Promise<any[]> {
    const results = await this.model.find( {} );

    return results.map( ( p: any ) => {
      return {
        productId: p._id,
        name     : p.name,
        image    : p.image,
        price    : p.price,
        category : p.category,
      };
    } );
  }
}
