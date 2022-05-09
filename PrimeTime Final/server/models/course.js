import User from './user.js';
import Post from './post.js';
import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    type:{
        type: String,
        required:true
    },
    price:{
      type: Number,
      required:true
  },
    teachers: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    ],
    students: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User"
        }
    ],
    posts: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Post"
        }
    ],
    
    
    
    
    
})

export default mongoose.model("Course", courseSchema);