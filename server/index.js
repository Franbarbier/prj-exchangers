import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'

import {Storage} from '@google-cloud/storage'

import plataformasRoutes from './routes/plataformas.js';
import faqsRoutes from './routes/faqs.js';

// import { verifyToken } from './auth.js';

const app = express()


process.env.TZ = "America/Argentina/Buenos_Aires";

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors({
    origin: '*'
}));

app.use('/plataformas', plataformasRoutes)
app.use('/faqs', faqsRoutes)


const gc = new Storage({
  keyFilename: "pivotal-leaf-190722-1453958d93f5.json",
  projectId : "pivotal-leaf-190722"
})

const googleBucket = gc.bucket("prj-calculadora")

const multerVar = new multer({
  storage: multer.memoryStorage(),
});
// Display a form for uploading files.
app.get('/', (req, res) => {
  res.render('form.pug');
});

app.post('/upload-icon', multerVar.single('file'), (req, res, next) => {
  if (!req.file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  // Create a new blob in the bucket and upload the file data.
  const blob = googleBucket.file('iconos/'+req.file.originalname);
  const blobStream = blob.createWriteStream();
  console.log('iconos/'+req.file.originalname )

  blobStream.on('error', err => {
    next(err);
  });

  blobStream.on('finish', () => {  
  res.status(200).send(req.file.originalname);
  });
  
  blobStream.end(req.file.buffer);
  res.status(200);
});


app.get('/', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send({ "msg": "This has CORS enabled 🎈" })
})

const CONNECTION_URL = 'mongodb+srv://prj:prjexchangers123@prj-exchangers.dkon2qb.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000



mongoose.connect(CONNECTION_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=> console.log('Server running on port: ' + PORT)))
    .catch((error)=> console.log(error.message)) 



// mongoose.set('useFindAndModify', false)