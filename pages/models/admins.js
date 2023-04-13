import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const AdminSchema = new Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: 'junior'
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    },
});
export default mongoose.models.Admin || mongoose.model('Admin', AdminSchema);
