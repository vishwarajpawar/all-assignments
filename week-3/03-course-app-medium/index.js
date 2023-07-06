const { json } = require('express');
const express = require('express');
const {v4: uuidv4} = require('uuid');
const fs = require("fs");

const generateJwt = require('./TokenGeneration');
const verifyToken = require('./authentication');
const path = require('path');

const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

try {
  
  ADMINS = JSON.parse(fs.readFileSync(path.join(__dirname,"admins.json"),"utf-8"));
  USERS = JSON.parse(fs.readFileSync(path.join(__dirname, "users.json"),'utf-8'));
  COURSES = JSON.parse(fs.readFileSync(path.join(__dirname,"courses.json"),'utf-8'));

} catch{

  ADMINS = [];
  USERS = [];
  COURSES = [];

}

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const newAdmin = req.body;

  const existingAdmin = ADMINS.find(a => a.username === newAdmin.username);

  if(existingAdmin){
    res.status(403).json({message:"user already exists!!!"});
  }
  ADMINS.push(newAdmin);
  fs.writeFileSync(path.join(__dirname,"admins.json"),JSON.stringify(ADMINS));
  const token = generateJwt(newAdmin);
  res.status(200).json({message:"Admin created successfully", token});

});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const {username, passeword}= req.headers;

  const admin = ADMINS.find(a=> a.username === username && a.passeword === passeword);
  if(admin){
    const token = generateJwt(admin);
    res.status(200).json({message: "Logged in successfully", token});
  }
  else{
    res.status(403).json({message:"Admin authentication failed"})
  }
  
});

app.post('/admin/courses', verifyToken, (req, res) => {
  // logic to create a course
  let newCourse = req.body;

  newCourse.id = uuidv4();
  COURSES.push(newCourse);
  fs.writeFileSync(path.join(__dirname,'courses.json'),JSON.stringify(COURSES));
  res.status(201).json({message: "Course created successfully", courseId: newCourse.id});
});

app.put('/admin/courses/:courseId', verifyToken, (req, res) => {
  // logic to edit a course'
  const courseId = req.params.courseId;

  const existingCourse = COURSES.find(a=> a.id === courseId);
  if(existingCourse){
    Object.assign(existingCourse, req.body);
    fs.writeFileSync(path.join(__dirname,'courses.json'),JSON.stringify(COURSES));
    res.status(202).json({message:"Coures updated successfully"});
  }
  else{
    res.status(404).json({message: "Courese not found!!"});
  }
});

app.get('/admin/courses', verifyToken,(req, res) => {
  // logic to get all courses
  res.status(200).json({Courses: COURSES});
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const newUser = req.body;
  const existingUser = USERS.find(a=> a.username === newUser.username);
  if(existingUser){
    res.status(401).json({message: "Unauthorized"});
  }
  else{
    USERS.push(newUser);
    fs.writeFileSync(path.join(__dirname,'users.json'),JSON.stringify(USERS));
    const token = generateJwt(newUser);
    res.status(201).json({message: "User create successfully", token});
  }
});

app.post('/users/login',(req, res) => {
  // logic to log in user
  const {username, password } = req.headers;
  const user = USERS.find(a=> a.username === username && a.password === password);
  if(user){
  const token = generateJwt(user);
  res.status(200).json({message:"Logged in successfully", token});
  }
  res.sendStatus(401);
});

app.get('/users/courses', verifyToken,(req, res) => {
  // logic to list all courses
  publishedCourses = COURSES.filter(a=> a.published);
  res.status(200).json({message: COURSES});
});

app.post('/users/courses/:courseId', verifyToken, (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;
  const course = COURSES.find(a=> a.id === courseId && a.published);
  const user = USERS.find(u => u.username === req.user.username);
  if(course){
    if(user){
      if(!user.purchasedCourses){
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
      fs.writeFileSync(path.join(__dirname,'users.json'),JSON.stringify(USERS));
      res.status(201).json({message:"Course purchased successfully"});
    }
    else{
      res.status(403).json("User not found");
    }
  } 
  else{
    res.status(404).json("Course not found");
  }

});

app.get('/users/purchasedCourses', verifyToken,(req, res) => {
  // logic to view purchased courses
  const user = USERS.find(a=> a.username === req.user.username);

  if(user && user.purchasedCourses){
    res.status(200).json({purchasedCourses: user.purchasedCourses});
  }
  res.status(404).json({message: "No Courses purchased"});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
