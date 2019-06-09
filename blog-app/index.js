const path = require('path');
const express = require('express');
const expressEdge=require('express-edge');
const app = new express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const Post=require('./database/models/Post');
const storeUserController=require("./controllers/storeUser");
const loginController=require("./controllers/login");
const loginUserController = require('./controllers/loginUser');

mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))
    
app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views',__dirname+"/views");
app.get('/', async (req, res) => {
    const posts=await Post.find({})
    res.render('index',{
    	posts
    })
});
app.get('/new', (req, res) => {
    res.render('create');
});
app.get('/register',(req,res)=>{
	res.render('register');
});
app.post('/posts/store', (req, res) => {
    Post.create(req.body,(error,post)=>{
    	res.redirect('/')
    })
});
app.post("/users/register",storeUserController);
app.get("/login",loginController);
app.post("/users/login",loginUserController);
app.get('/about', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/about.html'));
});
app.get('/contact', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'pages/contact.html'));
});
app.get('/:id', async (req, res) => {
    const post = await Post.findById(req.params.id)
    res.render('post', {
        post
    })
});
app.listen(4000, () => {
    console.log('App listening on port 4000');
});