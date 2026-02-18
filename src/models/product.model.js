import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  stock: {
    type: Number,
    required: true
  },
  status: {
    type: Boolean,
    default: true
  }
});

productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model("Product", productSchema);