import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'


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


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'iconos/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
   
var upload = multer({ storage: storage })

app.post('/upload-icon', upload.single('file'), (req, res, next) => {
    const file = req.file
    console.log(file)
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    //   res.send(file)
    
  })

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