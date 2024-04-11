import mongoose from "mongoose";

const Schema = mongoose.Schema;

const LinkSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    url: {
        type: String, 
        required: true
    }
});

export const LinkModel = mongoose.model('Link', LinkSchema);