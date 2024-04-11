import mongoose from 'mongoose';
import increment from './Increment.js';
import decrement from './Decrement.js'

const counterSchema = new mongoose.Schema({
    sequence_value: {
        type: Number, 
        default: 0 
    }, 
});

counterSchema.statics.increment = increment;
counterSchema.statics.decrement = decrement;
export const counter = mongoose.model('Counter', counterSchema);