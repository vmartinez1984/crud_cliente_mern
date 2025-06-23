import express from 'express'
import mongoose from 'mongoose'
import dotenv from "dotenv"
import route from './routes/user.route.js'
import cors from 'cors'

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
dotenv.config();

const port = process.env.PORT || 7000;
const mongoUrl = process.env.MongoUrl 
  //|| "mongodb://root:123456@localhost:27017/?authMechanism=DEFAULT"; 

mongoose.connect(mongoUrl)
.then(() => {
    mongoose.set("strictQuery", true);
    console.log("DB connect succesfully")
}).catch(error => console.log(error))

app.get("/api",(req,res)=>{
    const json = {
        message: "Hello world, users",
        date: new Date()
    }
    res.status(200).json(json)
})

function middleware(req,res,next){
    console.log(req.method, req.path, req.body ? req.body:"" )
    next()
}

app.use("/api",middleware,route)

app.listen(port, () => {
    console.log("Server is running in " + port)
})
