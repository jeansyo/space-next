import { model, models, Schema } from "mongoose";

const destination = Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
    },
    images: {
        type: Array,
        default: []
    },
    distance: {
        type: String
    },
    travel: {
        type: String
    }
});

export default models.destination || model( "destination", destination )