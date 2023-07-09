const express = require('express');
const mongoose = require('mongoose');

const app = express();

const validateToken = require('./authentication');
const generateToken = require('./TokenGeneration');

app.use(express.json());

const userSchema = new mongoose.Schema({
  username: {type: String},
  password:String,
  purchasedCourses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}]
});

const adminSchema = new mongoose.Schema({
  username:String,
  password:String
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean
});

const User = mongoose.model('User',userSchema);
const Admin = mongoose.model('Adimn',adminSchema);
const Course = mongoose.model('Course',courseSchema);

mongoose.connect('mongodb+srv://godvsp:godvsp%401234@cluster0.1y8bi1x.mongodb.net/',{useNewUrlParser: true,  useUnifiedTopology: true, dbName: 'SellCourse'});

// Admin routes
app.post('/admin/signup', async (req, res) => {
  // logic to sign up admin
  const {username, password} = req.body;
  const admin = await Admin.findOne({username: username, password: password});
  if(admin){
    res.status(403).json({message: 'Admin already exists'});
  }
  else{
  const newAdmin = new Admin({username: username, password: password});
  await newAdmin.save();
  const token = generateToken(newAdmin);
  res.json({message:'Admin created successfully', token});
  }
});

app.post('/admin/login', async (req, res) => {
  // logic to log in admin
  const {username, password} = req.headers;
  const admin = await Admin.findOne({username, password});
  if(admin){
    const token = generateToken(admin);
    res.status(200).json({message:'Logged in successfully', token});
  }
  else{
  res.sendStatus(401);
  }
});

app.post('/admin/courses', validateToken, async (req, res) => {
  // logic to create a course
  const course = new Course(req.body);
  await course.save();
  res.status(201).json({message: 'Course create successfully', courseId: course.id});
});

app.put('/admin/courses/:courseId', validateToken,async (req, res) => {
  // logic to edit a course
  const courseId = req.params.courseId;
  const course = await Course.findByIdAndUpdate(courseId, req.body, {new: true});
  if(course){
    res.json({message: 'Course updated successfully'})
  }else{
    res.status(404).json({message:'Course not found'});
  }
});

app.get('/admin/courses', validateToken, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({});
  res.status(200).json({courses});
});

// User routes
app.post('/users/signup', async (req, res) => {
  // logic to sign up user
  const {username, password} = req.body;
  const user = await User.findOne({username, password});
  if(user){
    res.status(401).json({message:'User already exists'});
  }
  else{
    const newUser = new User(req.body);
    await newUser.save();
    const token = generateToken(newUser);
    res.status(201).json({message:'User Created successfully', token})
  }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  const user = await User.findOne({username: req.headers.username, password: req.headers.password});
  if(user){
    const token = generateToken(user);
    res.status(200).json({message:'Logged in successfully', token});
  }
  else{
    res.status(401).json({message:'Invalid username or password'});
  }

});

app.get('/users/courses', validateToken, async (req, res) => {
  // logic to list all courses
  const course = await Course.find({published: true});
  res.status(200).json({course})
});

app.post('/users/courses/:courseId',validateToken ,async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId);
  if(course){
    const user = await User.findOne({username: req.user.username});
    if(user){
      user.purchasedCourses.push(course);
      await user.save();
      res.status(201).json({message:'Course purchased successfully'});
    }
    else{
      res.sendStatus(403);
    }
  }else{
    res.sendStatus(404).json({message:'Course not found'});
  }
});

app.get('/users/purchasedCourses', validateToken, async (req, res) => {
  // logic to view purchased courses[]
  const user = await User.findOne({username: req.user.username}).populate('purchasedCourses');
  if(user){
    res.status(200).json({purchasedCourses: user.purchasedCourses || []});
  }else{
    res.status(403).json({message:'User not found'});
  }
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
