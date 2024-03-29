

const cors =require ('cors')
const dotenv= require('dotenv')
const express=require('express')
const morgan=require('morgan')
const authRoute = require('./Route/authRoute.js');
const cartRoute = require('./Route/cartRoute.js');
const categoryRoute = require('./Route/categoryRoute.js');
const productRoute = require('./Route/productRoute.js');
const orderRoute=require("./Route/orderRoute")


const connectDB = require('./config/DB.js');





//configure env
dotenv.config()

//configuring database
connectDB()

//rest object
const app=express()

//middleware
app.use(morgan('dev'))
app.use(express.json())

app.use(cors({
  origin: ['http://localhost:3000','https://client-tau-wine.vercel.app'],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}

))

app.get('/',(req,res)=>{
  res.send('Your api is live ')
})


//routes
app.use('/',productRoute)
app.use('/',authRoute)
app.use('/',categoryRoute)
app.use('/',cartRoute)
app.use('/',orderRoute)



//run server
const PORT=process.env.PORT || 5500
app.listen(PORT,()=> console.log("server is connected"))





