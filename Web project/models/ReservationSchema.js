const mongoose = require('mongoose');
const { Schema } = mongoose;

const reservationSchema = new Schema({
    restaurantEmail: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    numberOfPeople: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    }
});

const Reservation = mongoose.model('Reservation', reservationSchema);
module.exports = Reservation;
