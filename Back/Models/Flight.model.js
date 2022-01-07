const mongoose = require("mongoose");

const flightSchema = new mongoose.Schema({ 
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    pictures: {
        type: Object,
        required: true,
    },
    date: {
        type: String,
        required: true,
        trim: true
    }
}, { timestamps: true });

const Flight = mongoose.model("Flight", flightSchema);

module.exports = Flight;