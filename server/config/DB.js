const mongoose=require('mongoose')


const connectDB= async ()=>{
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log('database is connected')
    } catch (error) {
        console.log("connection failed")
        
    }
}

module.exports=connectDB