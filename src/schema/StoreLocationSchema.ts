import { Schema, Types } from "mongoose";

export const StoreLocationSchema: any = new Schema( {
  _id: {
    type: Types.ObjectId,
  },
  name: {
    type    : String,
    required: true,
  },
  coordinates: {
    type    : String,
    match   : /\d{2}\.\d{6},\d{2}\.\d{6}/, // 13.388860,52.517037
    required: true,
  },
} );
