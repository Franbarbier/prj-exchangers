import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import plataformasRoutes from './routes/plataformas.js';

// import { verifyToken } from './auth.js';

const app = express()

process.env.TZ = "America/Argentina/Buenos_Aires";

app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors({
    origin: '*'
}));

app.use('/plataformas', plataformasRoutes)


const CONNECTION_URL = 'mongodb+srv://prj:prjexchangers123@prj-exchangers.dkon2qb.mongodb.net/?retryWrites=true&w=majority'
const PORT = process.env.PORT || 5000



mongoose.connect(CONNECTION_URL, 
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=> app.listen(PORT, ()=>console.log('Server running on port: ' + PORT)))
    .catch((error)=> console.log(error.message)) 


// mongoose.set('useFindAndModify', false)