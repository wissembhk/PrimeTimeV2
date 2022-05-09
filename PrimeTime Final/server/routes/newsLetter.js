import express from "express";
import { sendNewsletter } from "../controllers/newsLetter.js";

const router = express.Router();


router.get('/sendNewsletter', sendNewsletter);

export default router;