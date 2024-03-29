import { config } from "dotenv";

config();

export default {
    host: process.env.HOST||"",
    port: 3306,
    database: process.env.DATABASE||"",
    user: process.env.USER||"",
    password: process.env.PASSWORD||"",
    secret: process.env.SECRET,
    email: process.env.EMAIL,
    email_pass: process.env.EMAIL_PASS,
    react_host: process.env.REACT_HOST
};