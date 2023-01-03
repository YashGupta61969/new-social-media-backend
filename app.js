const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 8000
const multer = require('multer')
const fileUpload = require('express-fileupload');

require('dotenv').config()
require('./src/models')

const userRoute = require('./src/routes/user');
const postsRoute = require('./src/routes/posts');
const commentRoute = require('./src/routes/comments');

app.use(fileUpload({
  limits: {
    fileSize: 10000000, // Around 10MB
},
abortOnLimit: true,
}));
app.use('/uploads', express.static('./uploads'));
app.use(express.urlencoded({extended:true}));
app.use(cors())
app.use(express.json())

app.use('/user',userRoute)
app.use('/posts',postsRoute)
app.use('/comment',commentRoute)


app.use((req, res) => {
    const error = new Error("Not found");
    error.status = 404;
    res.send(error)
  });
  
  app.use((error, req, res) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });

app.listen(port,()=>{
    console.log('Listening At Port http://localhost:8000')
})