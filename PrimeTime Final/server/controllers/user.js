import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import logger from "./../helpers/logger.js";
import multer from "multer";
import UserModal from "../models/user.js";
import licensekeyModal from "../models/licensekey.js";
import course from "../models/course.js";
import stream from "../models/stream.js";
import newsLetter from "../models/newsLetter.js";
const secret = process.env.secret;
const BASE_URL = process.env.BASE_URL;


export const getTopUsers = async (req, res) => {
  console.log("test")

  try {   
    console.log("test")
    logger.info("get top users !");
    const users = await UserModal.find({followers:{$gte:1000}},null,{limit:3});    
    res.status(200).json(users);
} catch (error) {
    logger.error("errr");
    res.status(404).json({ message: error.message });
}}

export const addUserToNewsletter = async (req, res) => {
  try {     
    const email = req.body;
    
    const doc = new newsLetter({ ...email })
    await doc.save();
    console.log(newsLetter)
    res.status(200).json(newsLetter);
} catch (error) {    
    res.status(404).json({ message: error.message });
}}
export const getUsers = async (req, res) => {
  try {   
    logger.info("tesst");
    const users = await UserModal.find();    
    res.status(200).json(users);
} catch (error) {
    logger.error("errr");
    res.status(404).json({ message: error.message });
}}

export const deleteUser = async (req, res) => {
  try {   
    logger.info("delete user");
     await UserModal.findByIdAndDelete(req.params.id);    
    res.status(200).json("user deleted");
} catch (error) {
    logger.error("errr");
    res.status(404).json({ message: error.message });
}
}
export const updateUserById = async (req, res) => {
  try {   
    logger.info("updating user");
     await UserModal.findByIdAndUpdate(req.params.id,req.body)    
    res.status(200).json("user deleted");
} catch (error) {
    logger.error("errr");
    res.status(404).json({ message: error.message });
}
}

export const checkfollow= async (req,res)=>{
  const{userid,streamerid}=req.params;
  const user= await UserModal.findById(userid)
  res.status(200).json({isfollowing:(user.is_following).includes(streamerid)})
}

export const activateAccount = async (req, res) => {
  const { licensekey, userid } = req.body;
  const license_key = await licensekeyModal.findOne({
    license_key: licensekey,
  });
  if (!license_key)
    return res.status(400).json({ message: "this license key is invalid" });
  if (!license_key.isActivated) {
    const user = await UserModal.findOne({ _id: userid });
    var today = new Date();
    today.setDate(today.getDate() + license_key.duration);
    user.active_until = today;
    user.role = license_key.type;
    user.save();
    license_key.isActivated = true;
    license_key.save();
    return res.status(200).json(user);
  } else {
    return res
      .status(400)
      .json({ message: "this license key is already used" });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "Email adress doesn't exist !" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password !" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.secret,
      {
        expiresIn: "1h",
      }
    );

    console.log(oldUser);

    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await UserModal.create({
      email,
      password: hashedPassword,
      firstname: `${firstName}`,
      lastname: `${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secret, {
      expiresIn: "1h",
    });

    res.status(201).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
export const forgetPass = async (req, res) => {
  const { email } = req.body;

  try {
    console.log("testing email");
    console.log(req.body);
    const oldUser = await UserModal.findOne({ email });
    //if(oldUser)
    //return res.status(200).json({ message: "User exists" });
    console.log(oldUser);
    if (!oldUser)
      return res.status(400).json({ message: "User doesn't exists" });

    // create reusable transporter object using the default SMTP transport
    var transport = nodemailer.createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0d5d9886d6c6ab",
        pass: "7d5d2df933392c",
      },
    });
    const token = jwt.sign(
      { email: oldUser.email },
      process.env.MAILING_SECRET,
      { expiresIn: "1h" }
    );
    // send mail with defined transport object
    let info = await transport.sendMail({
      from: "bachq2@gmail.com", // sender address
      to: email, // list of receivers
      subject: "PrimeTime - Passwored recovery", // Subject line
      html: "Hello " + oldUser.name + "<br>" + process.env.BASE_URL + token, // html body
    });

    res.status(200).json({ messgae: "Password recovery email sent !" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    console.log(error);
  }
};
export const recoverPass = async (req, res) => {
  const { token, password } = req.body;

  try {
    const decodedData = jwt.verify(token, process.env.MAILING_SECRET);
    const oldUser = await UserModal.findOne({ email: decodedData.email });
    console.log(decodedData);
    if (!oldUser)
      return res.status(400).json({ message: "User doesn't exists" });

    const hashedPassword = await bcrypt.hash(password, 12);
    oldUser.password = hashedPassword;
    oldUser
      .save()
      .then((savedDoc) => {
        res.status(200).json({ message: "Password changed sucessfully" });
      })
      .catch((e) => {
        res.status(500).json({ message: "Something went wrong" });
      });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });

    logger.error(error);
  }
};
// image upload start here
const multerConfig = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "../client/public/images/users");
  },
  filename: async (req, file, callback) => {
    // const ext= file.mimetype.split('/')[1];
    console.log(req);
    const user = await UserModal.findById(req.body.username)
    user.hasImage=true
    user.save()
    callback(null, `${req.body.username}.jpg`);
  },
});
const uploadd = multer({
  storage: multerConfig,
});
export const uploadImage = uploadd.single("photo");

export const upload = (req, res) => {
  res.status(200).json({
    succes: "success",
  });
};

// image upload ends here

export const updateProfile= async (req,res)=>{
  const {userid}=req.body
  const user = await UserModal.findById(userid)
  const{firstname,lastname,phonenumber,facebook,instagram,youtube,spotify}=req.body
  user.firstname=firstname;
  user.lastname=lastname;
  user.phone=phonenumber;
  user.facebook=facebook;
  user.instagram=instagram;
  user.youtube=youtube;
  user.spotify=spotify;
  user.save()
  return res.status(200).json(user)
}

export const addFollowing_list = async(req,res)=>{
  const {following,userid}=req.body
  const user = await UserModal.findById(userid)
  const musician = await UserModal.findById(following)
  musician.followers++;
  musician.save();
  user.is_following.push(following)
  user.save()
  return res.status(200).json(user.is_following)

}

export const removeFollow=async(req,res)=>{
  const {following,userid}=req.body
  const user = await UserModal.findByIdAndUpdate({_id: userid},{$pull:{is_following:following}})
  const musician = await UserModal.findById(following)
  musician.followers--;
  musician.save();  return res.status(200).json(user)

}

export const get_followers_number= async(req,res)=>{
  const userid = req.params.userid
  const user = await UserModal.findById(userid)
  return res.status(200).json({"followers_number":user.followers})
}

export const updateChannelDescription= async (req,res)=>{
  const {userid}=req.body
  const user = await UserModal.findById(userid)
  const{text}=req.body
  user.channel_description=text;
  user.save()
  return res.status(200).json(user)
}

export const get_followed= async(req,res)=>{
  const userid = req.params.userid
  
  try{
  const user = await UserModal.findById(userid)
  const followed= await UserModal.find({_id:{$in:user.is_following}},{_id:1,firstname:1,lastname:1})
  return res.status(200).json({"followed":followed})}
  catch(err){
    res.status(404).json({ message: err.message });

  }
  }

export const getCoursesByUserId = async (req,res)=>{
  const userid=req.params.userid
  const user = await UserModal.findById(userid)
  var courses=[]
  if (user.role=="musician")
  courses= await course.find({_id:{$in:user.courses_teaching}})
  else 
  courses= await course.find({_id:{$in:user.courses_learning}})
  return res.status(200).json(courses)
}

export const getStreamers= async(req,res)=>{
  const streamers= await UserModal.find({role:"musician"})
  return res.status(200).json(streamers)
}

export const isLive =async(req,res)=>
{ 
  const userid=req.params.userid
  const user = await UserModal.findById(userid)
  console.log(user)
  const currentStream= await stream.findOne({viewerCount:{$gt:0},streamerName: user.firstname+" "+ user.lastname})
  return res.status(200).json({currentstream:currentStream,streamer:user})
}

export const isCurrentlyStreaming =async(req,res)=>
{ 
  const userid=req.params.userid
  const user = await UserModal.findById(userid)
  console.log(user)
  const currentStream= await stream.find({viewerCount:{$gt:0},streamerName: user.firstname+" "+ user.lastname})
  if (currentStream.length>0)
  return res.status(200).json(true)
  return(res.status(200).json(false))
}