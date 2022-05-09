import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  firstname: { type: String, required:  true },
  lastname: { type: String, required:  true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  facebook: { type: String,default:"" },
  instagram: { type: String,default:"" },
  youtube: { type: String,default:"" },
  spotify: { type: String,default:"" },
  phone:{type:String , default:""},
  id: { type: String },
  role: {type:String,required:true,default:"user"},
  active_until:{type:Date},
  channel_description: {type:String,default:""},
  is_following:[{type:String}],
  followers:{type:Number,default:0},
  hasImage:{type:Boolean,default:false},

  courses_teaching: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ],
  courses_learning: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
});

export default mongoose.model("User", userSchema);