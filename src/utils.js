// import dotenv from "dotenv"
// import path from "path";
// dotenv.config({path: path.resolve(__dirname, ".env")});

import { adjectives, nouns } from "./words"
import nodemailer from "nodemailer";
import sgTransport from "nodemailer-sendgrid-transport"
import jwt from "jsonwebtoken"


export const generateSecret = () => {
     const randomNumber = Math.floor(Math.random() * adjectives.length);
     return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
};

// console.log(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD)

export const sendMail = (email) => {
     const options = {
          auth:{
               api_user:process.env.SENDGRID_USERNAME,
               api_key:process.env.SENDGRID_PASSWORD
          }
          
     }

     const client = nodemailer.createTransport(sgTransport(options));
     return client.sendMail(email)
};

export const sendSecretMail = (adress, secret) => {
     const email = {
          from : "nico@prismagram.com",
          to: adress,
          subject : "Login Secret from PrismaGram  ✉️",
          html : `Hello ! Your login secret it <strong>${secret}</strong>,<br/> Copy paste on the website/app to log in`
     }
     return sendMail(email);
}

export const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET);