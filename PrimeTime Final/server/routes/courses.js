import express from 'express';
const router= express.Router();
import Course from "../models/course.js";
import Post from "../models/post.js";
import User from "../models/user.js";
//const spawn = require('child_process').spawn;
//import spawn from 'child_process';
import spawn from 'child_process';
import cors from 'cors';
import sum from "./lyrics.mjs";
import stripe from "stripe";
import multer from 'multer';
var stripe1 = stripe('sk_test_51KcqoWJoQcapggoAcqRgLXQyc3pYB9OK94khZLmfnQe0LxzQCh5t7dsmBfJQaO88qtqM1QChc0R4RS8Pf9yv8u9f00G3hBY3ci');
router.use(cors());




router.post("/paymentCourse", cors(), async (req, res) => {
    console.log("stripe-routes.js 9 | route reached", req.body);
      let { amount, id } = req.body
   
    console.log("stripe-routes.js 10 | amount and id", amount, id);
      try {
          const payment = await stripe1.paymentIntents.create({
              amount,
              currency: "USD",
              description: "PrimeTime Courses",
              payment_method: id,
              confirm: true
          })
          console.log("stripe-routes.js 19 | payment", payment);
          res.json({
              message: "Payment successful",
              success: true
          })
      } catch (error) {
          console.log("stripe-routes.js 17 | error", error);
          res.json({
              message: "Payment failed",
              success: false
          })
      }
  })
  

router.get('/searchlyrics/:search',async(req,res)=>{
    try{
        const search = req.params.search +' lyrics';
         
       
        const process = spawn.spawn('python',['./routes/lyrics.py', search]);
        var response ='';
        process.stdout.on('data', data =>{
            
            response += data.toString();
            console.log(response)
            res.send(response)
            
        });
        /*
        spawn.exec('node lyrics.mjs {{args}}',
        function (error, stdout, stderr) {
            console.log(stdout);
            if (error !== null) {
            console.log('exec error: ' + error);
            }
            res.send(stdout)
        });
        */

    }
    catch(err){
        res.send('Error' + err)
    }

});


/* posts*/
    router.post('/addpost',async(req,res)=>{
        let d = new Date();
        const months = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
          ]
       console.log(req.body.content +' ...  ' + req.body.poster +' .... '+ req.body.course)
        const post = new Post({
            content : req.body.content,
            date : d.getFullYear()+'/'+(months[d.getMonth()])+'/'+d.getDate(),
            time : d.getHours()+':'+d.getMinutes(),
            poster : req.body.poster,
            course : req.body.course,
            pdf : req.body.pdf,
            createdAt: d
        })
        

        try{
            
            const post1= await post.save()
            await res.json(post1)

            

            
            
        }catch(err){
            res.send('Error',err)
        }

    })

    router.get('/getpostsbycourse/:id',async(req,res)=>{
        let idcourse = req.params.id
        

        try{
            
            const post1= await Post.find({ 'course': idcourse }).sort({ 'date' : 'desc' }).populate("poster")
            console.log(post1)
            await res.json(post1)

            

            
            
        }catch(err){
            res.send('Error',err)
        }

    })
/* ************************************ */


router.get('/searchcourse/:keyword',async(req,res)=>{
    let search = req.params.keyword
    console.log( req.params.keyword)
    

    try{
        
        const courses= await Course.find({"name": { $regex: '.*' + search + '.*' } })
        console.log(courses)
        await res.json(courses)

        

        
        
    }catch(err){
        res.send('Error',err)
    }

})
router.get('/', async(req,res)=>{
    try{  
        const courses = await Course.find()
        res.json(courses)

    }catch(err){
        res.send('Error '+ err)
    } 
})

router.post('/',async(req,res)=>{
    const course1 = new Course({
        name : req.body.name,
        price : req.body.price,
        type : req.body.type
    })
    

    try{
        const c1= await course1.save()

        /* adding teacher to course */
        const course = await Course.findById(c1._id)
        const teacher = await User.findById(req.body.user._id)
        if(teacher !== null && course !== null)
        {
            const oldstudents = course.students;
            const set = new Set([course]);
            var teacher_exist=0;
            const ee =Array.from(oldstudents)
            
            ee.forEach(element => {
                if(element._id==teacher._id){
                    teacher_exist=1;
                }
                
            });
            
            if(teacher_exist==0){
                await Course.findByIdAndUpdate({ '_id': course._id }, { $addToSet: { teachers: teacher._id } });
                await User.findByIdAndUpdate({ '_id': teacher._id }, { $addToSet: { courses_teaching: course._id } });
                const c1= await course.save()
                const course2 = await Course.findById(course._id)
                await res.json(course2)
            }
            else if(teacher_exist==1)
            {
                console.log('this teacher already exists in students list')
                res.send('this teacher already exists in students list')
            }

        }
        else res.send('teacher or course doesnt exist !')









        /* end teacher add*/





        
    }catch(err){
        res.send('Error',err)
    }

})

/*
router.get('/retreivecourseteachers/:id',async (req,res)=>{
    try{
        const course = await Course.findById(req.params.id)
            const oldstudents = course.teachers;
            const set = new Set([course]);
            var teacher_exist=0;
            let teacher = new User();
            let ee =Array.from(oldstudents)
            let teachers = new Array();
            ee.forEach(async element => {
                let p = new user();
                p= await User.findById(element._id)
                console.log(p)
                teachers.push(p)
                console.log(teachers)
                
                
            });
            setTimeout(() => {res.json(teachers)}, 2000);
    }
    catch(err){
        res.send('Error'+err)
    }

})*/


router.put('/addteachertocourse/:id',async(req,res)=>{
    try{
        const course = await Course.findById(req.params.id)
        const teacher = await User.findById(req.body.teacher_id)
        if(teacher !== null && course !== null)
        {
            const oldteachers = course.teachers;
            var student_exist=0;
            const ee =Array.from(oldteachers)
            var teacher_exist=0;
            
            ee.forEach(element => {
                if(element._id==req.params.id){
                    teacher_exist=1;
                }
                
            });
            
            if(teacher_exist==0){
                await Course.findByIdAndUpdate({ '_id': req.params.id }, { $addToSet: { teachers: req.body.teacher_id } });
                await User.findByIdAndUpdate({ '_id': req.body.teacher_id }, { $addToSet: { courses_teaching: req.params.id} });
                const c1= await course.save()
                const course2 = await Course.findById(req.params.id).populate("teachers")
                console.log(course2)
                await res.json(course2)
            }
            else if(teacher_exist==1)
            {
                console.log('this teacher already exists in students list')
                res.send('this teacher already exists in students list')
            }

        }
        else res.send('teacher or course doesnt exist !')
        
        
        
    }catch(err){
        res.send('Error'+err)
    }

})


router.put('/addstudenttocourse',async(req,res)=>{
    
    try{
        const course = await Course.findById(req.body.course_id)
        const student = await User.findById(req.body.student_id)
        if(student !== null && course !== null)
        {
            const oldteachers = course.teachers;
            var student_exist=0;
            const ee =Array.from(oldteachers)

            ee.forEach(element => {
                if(element._id==req.body.student_id){
                    student_exist=1;
                }
                
            });
            console.log(student_exist)

            if(student_exist==0){
                await Course.findByIdAndUpdate({ '_id': req.body.course_id }, { $addToSet: { students: req.body.student_id } });
                await User.findByIdAndUpdate({ '_id': req.body.student_id }, { $addToSet: { courses_learning: req.body.course_id } });
                const c1= await course.save()
                const course2 = await Course.findById(req.body.course_id)
                await res.json(course2)
            }
            else if(student_exist==1)
            {
                console.log('this student already exists in teachers list')
                res.send('this student already exists in teachers list')
            }
        }
        else res.send('student or course doesnt exist !')
        
        
    }catch(err){
        res.send('Error')
    }

})


router.put("/removestudentfromcourse", async (req, res) => {
    try {
      const course = await Course.findById(req.body.course_id);
      const user = await User.findById(req.body.student_id);
      console.log(user);
      const oldstudents = course.students || [];
      const oldcourses = user.courses_learning || [];
  
      for (var i = 0; i < oldstudents.length; i++) {
        const student_id = String(oldstudents[i]._id);
  
        if (student_id === req.body.student_id) {
          oldstudents.splice(i, 1);
  
          i--;
        }
      }
      console.log(oldcourses);
      for (var i = 0; i < oldcourses.length; i++) {
        const course_id = String(oldcourses[i]._id);
  
        if (course_id === req.body.course_id) {
          oldcourses.splice(i, 1);
  
          i--;
        }
      }
      console.log(oldcourses);
      course.students = oldstudents;
  
      user.courses_learning = oldcourses;
      console.log("d");
      console.log(user);
      const c2 = await user.save();
      const c1 = await course.save();
      const course2 = await Course.findById(req.body.course_id);
      const user2 = await User.findById(req.body.student_id);
      await res.json(course2);
    } catch (err) {
      res.send("Error");
    }
  });
  
  router.put("/removeteacherfromcourse/:id", async (req, res) => {
    try {
      const course = await Course.findById(req.params.id);
      const user = await User.findById(req.body.teacher_id);
      console.log("teacher id "+req.body.teacher_id)
      const oldteachers = course.teachers || [];
      const oldcourses = user.courses_teaching || [];
      for (var i = 0; i < oldteachers.length; i++) {
        const teacher_id = String(oldteachers[i]._id);
  
        if (teacher_id === req.body.teacher_id) {
          oldteachers.splice(i, 1);
          i--;
        }
      }
  
      for (var i = 0; i < oldcourses.length; i++) {
        const course_id = String(oldcourses[i]._id);
  
        if (course_id === req.params.id) {
          oldcourses.splice(i, 1);
  
          i--;
        }
      }
      course.teachers = oldteachers;
      const c1 = await course.save();
      const c2 = await user.save();
      const course2 = await Course.findById(req.params.id);
      await res.json(course2);
    } catch (err) {
      res.send("Error"+err);
    }
  });
  

router.get('/:id', async(req,res)=>{
    try{
        const course = await Course.findById(req.params.id)
        res.json(course)

    }catch(err){
        res.send('Error '+ err)
    }
})

router.get('/retreivecourseteachers/:id/', async(req,res)=>{
    try{
        const course = await Course.findById(req.params.id).populate("teachers");
        res.json(course)
        console.log(course)

    }catch(err){
        res.send('Error '+ err)
    }
})

router.get('/retreivecoursestudents/:id/', async(req,res)=>{
    try{
        const course = await Course.findById(req.params.id).populate("students");
        await res.json(course)
        console.log(course)

    }catch(err){
        res.send('Error '+ err)
    }
})

router.delete('/:id', async(req,res)=>{
    try{
        const course = await Course.findByIdAndDelete(req.params.id)
        res.json(course)

    }catch(err){
        res.send('Error '+ err)
    }
})

router.put('/:id', async(req,res)=>{
    try{
        const course = await Course.findById(req.params.id)
        if(req.body.name)
        course.name =req.body.name
        if(req.body.type)
        course.type =req.body.type
        if(req.body.user)
        course.user =req.body.user

        await course.save()
        res.json(course)

    }catch(err){
        res.send('Error '+ err)
    }
})




const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, "../client/public/images/files");
    },
    filename: (req, file, callback) => {
      // const ext= file.mimetype.split('/')[1];
      console.log(req);
      const d = new Date();
      callback(null, req.body.username+d.getHours()+d.getMinutes()+`.pdf`);
    },
  });
  const uploadd = multer({
    storage: multerConfig,
  });
  const uploadImage = uploadd.single("photo");
  
   const upload = (req, res) => {
    res.status(200).json({
      succes: "success",
    });
  }
  router.post('/uploadPDF',uploadImage,upload);


export default router;