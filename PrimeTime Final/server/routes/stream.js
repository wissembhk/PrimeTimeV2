import express from 'express';


import { createStream, fetch_sessions,getStreamByName2,getStreamByName, getStreamById, getStreams,setRecording,upload,uploadImage, viewsInc,getAllStreamsByName, viewsDec, featuredStreamer, viewsNull } from '../controllers/stream.js';

const router = express.Router();

router.post('/uploadStreamImg',uploadImage,upload)

router.post('/', createStream);
router.get('/viewsInc/:id', viewsInc);
router.post('/viewsDec/:id', viewsDec);
router.post('/viewsNull/:id', viewsNull);

router.get('/allStreams', getStreams);
router.get('/getStreamById/:id',getStreamById)
router.get('/fetchSessions/:meetid',fetch_sessions)
router.get('/setStreamRecorded/:meetid',setRecording)
router.get('/getStreamByName/:name',getStreamByName)
router.get('/getStreamByName2/:name',getStreamByName2)
router.get('/getAllStreamsByName/:name',getAllStreamsByName)
router.get('/getFeaturedStreamer',featuredStreamer);





export default router;