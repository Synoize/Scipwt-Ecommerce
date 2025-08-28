import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
    userId: { type: String, required: true, ref: "User" },
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    offerPrice: { type: Number, required: true },
    image: { type: Array, required: true },
    date: { type: Number, required: true }
});

const ProductModel = models.product || model('product', productSchema);

export default ProductModel;
