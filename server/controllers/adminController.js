const User = require('../models/userSchema')
const catchAsync = require('./../utils/catchAsync');
var csv = require('csvtojson');
const AppError = require('./../utils/appError');
const ContactUs = require('../models/contactUsSchema');
const { eventNames } = require('../models/eventSchema');
const Event = require('../models/eventSchema');

exports.getAllEvents = catchAsync(async (req, res, next) => {
    try {
        const events = await Event.find();
        res.json(events);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch events' });
    }
})

exports.addAnEvent = catchAsync(async (req, res, next) => {
    const { title, date } = req.body;
    const newEvent = new Event({ title, date });
    try {
        await newEvent.save();
        res.status(201).json(newEvent);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add event' });
    }
})


exports.importEvents = catchAsync(async (req, res, next) => {
    try {
        var eventData = [];
        var newEventData = []; // Array to hold new users
        var temp;

        // Read CSV file and parse the data
        await csv()
            .fromFile(req.file.path)
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    temp = {
                        title: res[i].Title,
                        date: res[i].Date,
                    };
                    eventData.push(temp);
                }
            });

        // Check for existing users in the database
        const existingEvents = await Event.find({
            $or: eventData.map(event => ({
                $or: [
                    { title: Event.title },
                    { date: Event.date }
                ]
            }))
        });

        const existingTitles = existingEvents.map(event => event.title); // Get the emails of existing users

        // Filter out new users
        newEventData = eventData.filter(event =>
            !existingTitles.includes(event.title)
        );

        // Create only new users in the database
        if (newEventData.length > 0) {
            await Event.create(newEventData);
        }

        // Respond with the new user data
        await res.status(200).json({
            status: 'success',
            results: newEventData.length,
            data: {
                newEventData
            }
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
});


