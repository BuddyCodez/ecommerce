// schema for products
// having id, name, description, price, category, image, quantity, other information about product


import mongoose from "mongoose";
const Schema = mongoose.Schema

const UserSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },

    name: {
        type: String,
        required: true,
    },

    description: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    category: {
        type: String,
        required: true
    },

    image: {
        type: String,
        required: true
    },

    quantity: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }

});

export default mongoose.model("products", UserSchema);