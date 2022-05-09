import mongoose from "mongoose";

const streamSchema = mongoose.Schema({
  meetingId: { type: String, required:  true },
  streamerName: { type: String, required:  true },
  viewerCount: { type: Number, required: true,default:0 },
  streamTitle: { type: String, required: true },
  streamImg: { type: String, required: true },
  isrecorded:{type:Boolean,default: false},
  created_at:{type:Date,default: Date.now},
  totalViews:{ type: Number, required: true,default:0 }


});

export default mongoose.model("stream", streamSchema);   