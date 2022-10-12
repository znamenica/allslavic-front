import nodemailer from "nodemailer";

const handler = (req, res) => {
    const transporter = nodemailer.createTransport({
        port: process.env.EMAIL_PORT,
        host: process.env.EMAIL_HOST,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
        tls: {
            rejectUnauthorized: false
        },
    });
    const mailData = {
        from: process.env.EMAIL_USERNAME,
        to: req.body.emailTo,
        subject: `Message From ${req.body.name}`,
        text: `
        Почта: ${req.body.emailFrom}\n
        Содержимое: ${req.body.message}
        `,
        html: `<div>
            <p><b>Почта: </b><a href="mailto:${req.body.emailFrom}">${req.body.emailFrom}</a></p>
            <p><b>Содержимое:</b></p>
            <p>${req.body.message}</p>
            </div>`,
    }
    return new Promise((resolve) => {
        transporter.sendMail(mailData, function (err, info) {
            if (err) {
                resolve(res.status(400).send());
                console.log(err);
            } else {
                resolve(res.status(200).send());
                console.log(info);
            }
        });
    });
};

export default handler;
