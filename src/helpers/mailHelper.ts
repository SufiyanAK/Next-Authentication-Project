import User from '@/models/user.model';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

interface Email {
    email: string,
    emailType: 'VERIFY' | 'RESET',
    userId: string
}

export const sendEmail = async ({ email, emailType, userId }: Email) => {
    try {
        const verifyToken = await bcryptjs.hash(userId.toString(), 10);
        const encodedToken = encodeURIComponent(verifyToken);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    verifyUser: {
                        token: encodedToken,
                        expires: new Date(Date.now() + 3600000)
                    },
                }
            })

        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId, {
                $set: {
                    forgetPassword: {
                        token: verifyToken,
                        expires: new Date(Date.now() + 3600000)
                    },
                }
            })
        }

        const verifyEmailPage =
            `
            <div>
                <a href="${process.env.DOMAIN}/verifyemail?token=${encodedToken}">
                    <p>Verify your email</p>
                </a>
                or Copy and Paste the link in your browser.
                <br />
                ${process.env.DOMAIN}/verifyemail?token=${encodedToken}          
            </div>
            `;

        const resetPasswordPage =
            `
            <div>
                <a href="${process.env.DOMAIN}/resetpassword?token=${encodedToken}">
                    <p>Reset your password</p>
                </a>
                or Copy and Paste the link in your browser.
                <br />
                ${process.env.DOMAIN}/resetpassword?token=${encodedToken}          
            </div>
            `;


        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c589ed04e7c112",
                pass: "03e00b2e4fa41c"
            }
        });


        const mailOptions = {
            from: 'sufiyankhattak14@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset password',
            html: emailType === 'VERIFY' ? verifyEmailPage : resetPasswordPage
        }

        const mailResponse = await transporter.sendMail(mailOptions)

        return mailResponse;

    } catch (error) {
        console.log("Error Sending Email: ", error);
    }
}