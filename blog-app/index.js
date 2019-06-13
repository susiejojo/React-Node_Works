const path = require('path');
const express = require('express');
const expressEdge=require('express-edge');
const app = new express();
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
const fileUpload=require("express-fileupload");
const Post=require('./database/models/Post');
const createPostController = require('./controllers/createPost')
const storeUserController=require("./controllers/storeUser");
const loginController=require("./controllers/login");
const createUserController=require("./controllers/createUser");
const loginUserController = require('./controllers/loginUser');
const expressSession = require('express-session');
const storePostController=require('./controllers/storePost.js');
const connectMongo = require('connect-mongo');
const auth = require("./middleware/auth");
const connectFlash = require("connect-flash");

mongoose.connect('mongodb://localhost:27017/node-blog', { useNewUrlParser: true })
    .then(() => 'You are now connected to Mongo!')
    .catch(err => console.error('Something went wrong', err))
const mongoStore = connectMongo(expressSession);
 
app.use(expressSession({
    secret: 'secret',
    store: new mongoStore({
        mongooseConnection: mongoose.connection
    })
}));  
app.use(fileUpload());
app.use(express.static('public'));
app.use(expressEdge);
app.use(connectFlash());
app.use(expressSession({
    secret: 'secret'
}));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));
const storePost = require('./middleware/storePost')
app.use('/posts/store', storePostController)
app.set('views',__dirname+"/views");
app.get('/', async (req, res) => {
    const posts=await Post.find({})
    res.render('index',{
        posts
    })
});
app.get("/new",auth,createPostController);
app.get("/register",createUserController);
app.get("/new",createPostController);
app.post('/posts/store', (req, res) => {
    Post.create(req.body,(error,post)=>{
        res.redirect('/')
    })
});
app.post("/users/register",storeUserController);
app.get("/login",loginController);
app.post("/login",loginController);
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