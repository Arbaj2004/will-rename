const User = require('../models/userSchema')
const catchAsync = require('./../utils/catchAsync');
var csv = require('csvtojson');
const AppError = require('./../utils/appError');
const ContactUs = require('../models/contactUsSchema');

exports.getAllUsers = catchAsync(async (req, res, next) => {
    try {
        const user = await User.find();
        res.json({
            message: 'searched user',
            data: user,
            success: true
        })
    } catch (error) {
        res.status(500).json({
            message: error.message || error,
            error: true
        })
    }
})

exports.importUsers = catchAsync(async (req, res, next) => {
    try {
        var userData = [];
        var newUserData = []; // Array to hold new users
        var temp;

        // Read CSV file and parse the data
        await csv()
            .fromFile(req.file.path)
            .then((res) => {
                for (let i = 0; i < res.length; i++) {
                    temp = {
                        name: res[i].Name,
                        email: res[i].Email,
                        mis: res[i].MIS,
                        password: res[i].Password,
                        passwordConfirm: res[i].Password
                    };
                    userData.push(temp);
                }
            });

        // Check for existing users in the database
        const existingUsers = await User.find({
            $or: userData.map(user => ({
                $or: [
                    { email: user.email },
                    { mis: user.mis }
                ]
            }))
        });

        const existingEmails = existingUsers.map(user => user.email); // Get the emails of existing users
        const existingMIS = existingUsers.map(user => user.mis); // Get the MIS of existing users

        // Filter out new users
        newUserData = userData.filter(user =>
            !existingEmails.includes(user.email) &&
            !existingMIS.includes(user.mis)
        );

        // Create only new users in the database
        if (newUserData.length > 0) {
            await User.create(newUserData);
        }

        // Respond with the new user data
        await res.status(200).json({
            status: 'success',
            results: newUserData.length,
            data: {
                newUserData
            }
        });
    } catch (error) {
        return next(new AppError(error.message, 500));
    }
});


