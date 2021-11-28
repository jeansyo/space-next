import { model, models, Schema } from "mongoose";

const crew = Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    role: {
        type: String,
    },
    bio: {
        type: String,
    },
    images: {
        type: Array,
        default: []
    }
});

export default models.crew || model( "crew", crew )