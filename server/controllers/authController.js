const jwt = require('jsonwebtoken');
const User = require('../models/userSchema')
const catchAsync = require('./../utils/catchAsync');
const AppError = require('../utils/appError');
const crypto = require('crypto');
const { promisify } = require('util');
const { countReset } = require('console');
const sendEmail = require('../utils/email');
const { passwordResetEmail } = require('../helpers/passwordResetEmail');

const createSendToken = (user, statusCode, req, res) => {
    const tokenData = {
        id: user._id,
        email: user.email
    }
    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
    // Remove password from output
    user.password = undefined;

    res.status(statusCode).cookie('token', token, { maxAge: 9000000, httpOnly: true, secure: true, }).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.login = catchAsync(async (req, res, next) => {
    const { userkey, password } = req.body;
    // 1) Check if email and password exist
    if (!userkey || !password) {
        return next(new AppError('Please provide email and password!', 400));
    }
    // 2) Check if user exists && password is correct
    var user;
    if (userkey) {
        user = await User.findOne({ email: userkey }).select('+password');
    }
    if (!user) {
        user = await User.findOne({ mis: userkey }).select('+password');
    }
    if (!user || !(await user.correctPassword(password, user.password))) {
        return next(new AppError('Incorrect email or password', 401));
    }
    // 3) If everything ok, send token to client
    createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
    res.cookie('jwt', 'loggedout', {
        maxAge: 9000,
        httpOnly: true
    });
    res.status(200).clearCookie('token').json({ status: 'success' });
};


exports.forgotPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on POSTed email
    var user;
    if (req.body.userkey) {
        user = await User.findOne({ email: req.body.userkey });
    }
    if (!user) {
        user = await User.findOne({ mis: req.body.userkey });
    }
    if (!user) {
        return next(new AppError('There is no user with email address.', 404));
    }

    // 2) Generate the random reset token
    const resetToken = user.createPasswordResetToken();
    // console.log("Before saving:", user);
    await user.save({ validateBeforeSave: false });
    // console.log("After saving:", user);

    // await user.save({ validateBeforeSave: false });

    // 3) Send it to user's email
    const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`
    console.log(resetURL);
    try {
        // await sendEmail({
        //     email: user.email,
        //     subject: 'Your password reset token (valid for 10 min)',
        //     html: passwordResetEmail(user, resetURL)
        // });
        // console.log("😒😒😒😒", resetToken);
        res.status(200).json({
            status: 'success',
            message: 'Token sent to email!'
        });
    } catch (err) {
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({ validateBeforeSave: false });
        console.log(err);
        return next(
            new AppError('There was an error sending the email. Try again later!'),
            500
        );
    }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
    // 1) Get user based on the token
    const hashedToken = crypto
        .createHash('sha256')
        .update(req.params.token)
        .digest('hex');

    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() }
    });

    // 2) If token has not expired, and there is user, set the new password
    if (!user) {
        return next(new AppError('Token is invalid or has expired', 400));
    }
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    // 3) Update changedPasswordAt property for the user
    // 4) Log the user in, send JWT
    createSendToken(user, 200, req, res);
});