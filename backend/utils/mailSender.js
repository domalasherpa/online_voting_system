const nodemailer = require("nodemailer");
require('dotenv').config()

const mailSender = async (email, title, body)=>{
	try{
		const transporter = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: process.env.MAIL_PORT,
			secure: false, // Use `true` for port 465, `false` for all other ports
			auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS,
			},
		});

		transporter.verify(function (error, success) {
			if (error) {
				console.log(error);
				throw error;
			} else {
				console.log("Server is ready to take our messages");
			}
		});

		const info = await transporter.sendMail({
			from: process.env.MAIL_USER,
			to: `${email}`,
			subject: `${title}`, 
			html: `${body}`,
		});
		console.log("Email info: ", info);
		return info;
	}
	catch(error){
		console.log(error.message);
	}
}

module.exports = mailSender;