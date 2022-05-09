import express from 'express';
import {createLicenseKey} from '../controllers/licensekey.js'

const router = express.Router();



router.post('/createLicenseKey', createLicenseKey);

export default router;