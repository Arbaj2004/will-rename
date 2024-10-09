// emailTemplates.js

// Function to generate the password reset email HTML content
const passwordResetEmail = (user, resetURL) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset</title>
    </head>
    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="margin: 20px auto; background-color: #ffffff; border: 1px solid #dddddd; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <tr>
                <td align="center" bgcolor="#2596be" style="padding: 20px 0;">
                    <h1 style="color: #ffffff; margin: 0;">Reset Your Password</h1>
                </td>
            </tr>
            <tr>
                <td style="padding: 40px 30px;">
                    <p style="font-size: 16px; color: #333333;">Hi ${user.name},</p>
                    <p style="font-size: 16px; color: #333333;">We received a request to reset your password for your account. Click the button below to reset it:</p>
                    <table border="0" cellpadding="0" cellspacing="0" style="margin: 20px 0;">
                        <tr>
                            <td align="center" bgcolor="#2596be" style="border-radius: 5px;">
                                <a href="${resetURL}" target="_blank" style="font-size: 16px; color: #ffffff; text-decoration: none; padding: 12px 24px; display: inline-block; border-radius: 5px;">Reset Password</a>
                            </td>
                        </tr>
                    </table>
                    <p style="font-size: 16px; color: #333333;">If you didn't request this, please ignore this email or contact support if you have questions.</p>
                    <p style="font-size: 16px; color: #333333;">Thanks,<br>The [Your Website Name] Team</p>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#f4f4f4" style="padding: 20px;">
                    <p style="font-size: 12px; color: #777777;">If you're having trouble with the button above, copy and paste the URL below into your web browser:</p>
                    <p style="font-size: 12px; color: #2596be;"><a href="${resetURL}" style="color: #2596be;">${resetURL}</a></p>
                </td>
            </tr>
            <tr>
                <td align="center" bgcolor="#2596be" style="padding: 10px;">
                    <p style="font-size: 12px; color: #ffffff;">&copy; 2024 [Your Website Name]. All rights reserved.</p>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
};

// Export the function to use it in other files
module.exports = { passwordResetEmail };
