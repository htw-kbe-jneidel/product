import { Schema, Types } from "mongoose";

export const ProductSchema = new Schema( {
  _id: {
    type: Types.ObjectId,
  },
  name: {
    type    : String,
    required: true,
  },
  image: {
    type   : String,
    trim   : true,
    default: null,
  },
  price: {
    type    : Number,
    min     : 0.01,
    required: true,
  },
  category: {
    type     : String,
    lowercase: true,
    required : true,
  },
} );
