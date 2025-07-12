const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD  // Use the generated google app password
    }
});

// Send email function
exports.sendEmail = async (to, subject, text, html, cc, bcc, file) => {

    try {
        let mailOptions = {
            from: `${process.env.COMPANY} <${process.env.GMAIL_USER}>`,//'"Magnanim Systems" <magnanimsystems99@gmail.com>',
            to,
            cc,
            bcc,
            subject,
            text,
            html,
            attachments: file
                ? [{
                    filename: file.originalname,
                    path: file.path,
                    contentType: file.mimetype
                }]
                : []
        };

        let info = await transporter.sendMail(mailOptions);
        return info;
    } catch (error) {
        console.error("❌ Error sending email:", error);
        throw error;
    }
}