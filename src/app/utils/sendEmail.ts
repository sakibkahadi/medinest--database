import nodemailer from 'nodemailer'
import config from '../config';

export const sendEmail = async(to:string, html:string,)=>{
   

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: config.node_env === 'production', // true for port 465, false for other ports
  auth: {
    user: "sakibkahadi0@gmail.com",
    pass: "oqsk eomu fsia qpqw",
  },
});

// send mail with defined transport object
await transporter.sendMail({
    from: '"sakibkahadi0@gmail.com', // sender address
    to, // list of receivers
    subject: "Reset your password within 2 mins", // Subject line
    text: "", // plain text body
    html // html body
    
})

}