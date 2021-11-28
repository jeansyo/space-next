import { model, models, Schema } from "mongoose";

const technology = Schema({
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
    }
});

export default models.technologie || model( "technologie", technology )