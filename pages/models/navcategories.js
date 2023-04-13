import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const NavCategories = new Schema({
    title: {
        type: String,
    },
    subcategories: {
        type: [Object],
        required: true,
    },
    images: {
        type: [Object],
    }
});
export default mongoose.models.NavCategories || mongoose.model('NavCategories', NavCategories);
