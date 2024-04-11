import mongoose from "mongoose";
import { MediaModel } from "./Media.js";
import { LinkModel } from "./Link.js";

const Schema = mongoose.Schema;

const ProjectSchema = new Schema({
    heroImage : {
        type: mongoose.Schema.Types.ObjectId, 
        ref: MediaModel,
    },
    heading:{
        type: String,
        required: true
    },
    subHeading: {
        type: String,
        required: true
    },
    brief: {
        type: String, 
        required: true
    },
    category: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    media: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: MediaModel 
    }],
    order: { 
        type: Number, 
        required: true 
    },
    guidedBy : [{ 
        type: String, 
    }],
    thanks : {
        type: String
    },
    hyperlinks : [{
        type: mongoose.Schema.Types.ObjectId, 
        ref: LinkModel
    }]
}, { timestamps: true});

export const ProjectModel = mongoose.model('Project', ProjectSchema);