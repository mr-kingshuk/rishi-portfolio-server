import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const GeneralSchema = new Schema({
    brief: {
        type: String,
    },
    resume:{
        type: String
    }
}, { timestamps: true});

export const GeneralModel = mongoose.model('General', GeneralSchema);