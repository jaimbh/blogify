require('dotenv').config()
const express = require('express');
const path = require('path');
const fs = require('fs');
const shell = require("child_process");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const Blog = require('./models/blog');

const userRoute = require('./routes/user')
const blogRoute = require('./routes/blog')
const middleware = require('./middlewares/authentication')

const app = express();
const PORT = process.env.PORT;

if(!fs.existsSync('./public/uploads')){
	shell.exec('mkdir /root/blogapp/public/uploads');
}

mongoose.connect(process.env.MONGO_URL)
.then(() => console.log('db connected'))
.catch((err) => console.log(err));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.urlencoded({extended: false}));
app.use(cookieParser())
app.use(middleware.checkForAuthenticationCookie('token'))
app.use(express.json());
app.use(express.static('./public'));

app.get('/', async (req, res)=>{
	const allBlogs = await Blog.find({});
	
	res.render('home', {
		user: req.user,
		blogs: allBlogs
	})
})

app.use('/user', userRoute)
app.use('/blog', blogRoute)

app.listen(PORT, () => console.log(`server started at ${PORT}`));