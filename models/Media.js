import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const MediaSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    hash: {
        type: String
    },
    type: {
        type: String,
        required: true
    }
}, { timestamps: true});

export const MediaModel = mongoose.model('Media', MediaSchema);