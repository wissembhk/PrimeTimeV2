
import nodemailer from "nodemailer";

import newsLetter from "../models/newsLetter.js"

export const sendNewsletter = async (req, res) => {
    const doc = new newsLetter()
    const usersEmail  = await newsLetter.find({},{email:1})
    console.log(usersEmail)
  
    try {  
      // create reusable transporter object using the default SMTP transport
      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "0d5d9886d6c6ab",
          pass: "7d5d2df933392c",
        },
      });
      
      // send mail with defined transport object
      let info = await transport.sendMail({
        from: "bachq2@gmail.com", // sender address
        to: usersEmail, // list of receivers
        subject: "PrimeTime - NewsLetter", // Subject line
        html: "Hello "  + "<br>" + "New streaming event is launching in a few minutes !", // html body
      });
  
      res.status(200).json({ messgae: "Password recovery email sent !" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
  
      console.log(error);
    }
  };