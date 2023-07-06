const { json } = require('express');
const express = require('express');
const {v4: uuidv4} = require('uuid');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication = (req, res, next) =>{
  const {username, password} = req.headers;

  const existingAdmin = ADMINS.find(a=> a.username === username && a.password === password);
  if(existingAdmin){
    next();
  }
  res.status(401).json({message: "Unauthorized"})
  
}

const userAuthenticaion = (req, res, next)=>{

  const {username, password} = req.headers;
  const existingUser = USERS.find(a=> a.username === username && a.password === password);
  if(existingUser){
    next()
  }
  res.status(401).json({message: "Unauthorized"})

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
  res.status(200).json({message:"Admin created successfully"});

});

app.post('/admin/login', adminAuthentication, (req, res) => {
  // logic to log in admin
  res.status(200).json({message: "Logged in successfully"});
});

app.post('/admin/courses', adminAuthentication, (req, res) => {
  // logic to create a course
  let newCourse = req.body;

  newCourse.id = uuidv4();
  COURSES.push(newCourse);
  res.status(201).json({message: "Course created successfully", courseId: newCourse.id});
});

app.put('/admin/courses/:courseId', adminAuthentication, (req, res) => {
  // logic to edit a course'
  const courseId = req.params.courseId;

  const existingCourse = COURSES.find(a=> a.id === courseId);
  if(existingCourse){
    Object.assign(existingCourse, req.body);
    res.status(202).json({message:"Coures updated successfully"});
  }
  else{
    res.status(404).json({message: "Courese not found!!"});
  }
});

app.get('/admin/courses', adminAuthentication,(req, res) => {
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
    res.status(201).json({message: "User create successfully"});
  }
});

app.post('/users/login', userAuthenticaion,(req, res) => {
  // logic to log in user
  res.status(200).json({message:"Logged in successfully"});
});

app.get('/users/courses', userAuthenticaion,(req, res) => {
  // logic to list all courses
  publishedCourses = COURSES.filter(a=> a.published);
  res.status(200).json({message: COURSES});
});

app.post('/users/courses/:courseId', userAuthenticaion, (req, res) => {
  // logic to purchase a course
  const courseId = req.params.courseId;
  const course = COURSES.find(a=> a.id === courseId && a.published);
  const user = USERS.find(u => u.username === req.headers.username);
  if(course){
    if(user){
      if(!user.purchasedCourses){
        user.purchasedCourses = [];
      }
      user.purchasedCourses.push(course);
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

app.get('/users/purchasedCourses', userAuthenticaion,(req, res) => {
  // logic to view purchased courses
  const user = USERS.find(a=> a.username === req.headers.username);

  if(user && user.purchasedCourses){
    res.status(200).json({purchasedCourses: user.purchasedCourses});
  }
  res.status(404).json({message: "No Courses purchased"});
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
