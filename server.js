import express from 'express';
import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';
import router from './backend/routes/index.js';
import bodyParser from "body-parser";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config();
const app = express();
//init middleware
app.use(express.json())
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
//define routes
app.use('/api',router);
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'build')));
app.get("/", function(req, res){res.sendFile(path.join(__dirname, 'build', 'index.html'));});
const port = process.env.PORT||4000;
app.listen(port,()=>
    console.log(`server listening on port ${port}`),
);

mongoose
    .connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then((res)=>console.log("monge db connection created"));