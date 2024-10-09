const Branch = require('../models/userSchema')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const Resource = require('../models/resourcesSchema');

exports.createResources = catchAsync(async (req, res, next) => {
    try {
        const newResource = await Resource.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                resource: newResource
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail'
        })
    }


});