const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: String, required: true }, // You can also use Date type
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

