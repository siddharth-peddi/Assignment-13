const { Schema, model } = require('mongoose');

const innerProductSchema = new Schema(
  {
    productid: { type: Number, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    name: { type: String, required: true },
    instock: { type: Boolean, default: true }
  },
  { _id: false }
);

const productSchema = new Schema(
  {
    id: { type: Number, required: true },
    product: innerProductSchema
  },
  { versionKey: false }
);

module.exports = model('Product', productSchema);
