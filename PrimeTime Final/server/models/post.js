import User from './user.js';
import Course from './course.js';
import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    content:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:true
    },
    time:{
        type: String,
        required:true
    },
    poster: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    ,
    course: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Course"
        }
    ,
    pdf: {
        type: String
      },
    createdAt: { type: Date },

    
    
    
})

export default mongoose.model("Post", postSchema);