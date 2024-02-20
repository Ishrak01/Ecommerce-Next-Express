const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const userModel = require('../model/userModel.js');

//Post register
exports.registerController =async (req,res)=>{
try {
    const {name,email,password,phone,address}= req.body
    if(!name&& !email && !password && !phone && !address){
        return res.send({error:"All fields are required"})
    }

   //exsisting user find
   const exist= await userModel.findOne({email})
   if(exist){
    return res.status(200).send({message:"Email taken already"})
   }

   //password check
   if(password.length<6){
    return res.status(400).send({message:"Password should be 6 character long"})
   }

   //password bcrypt
   const hashedPassword= await bcrypt.hash(password,10)

   //save registration
   const user =new userModel({name,email,phone,address,password:hashedPassword})
   await user.save()

   res.status(201).send({message:"Account created successfully",user})



} catch (error) {
    res.json({error:'error signing up'})

}
}

//Post Login
exports.loginController= async(req,res)=>{
    try {
        const{email,password}=req.body
        if(!email && !password){
            return res.json({message:"email and password must be required"})
        }
        const user=await userModel.findOne({email})
        if(!user){
            return res.json({error:"Please enter your valid email address"})
        }
//password matching
        const match= await bcrypt.compare(password,user.password)
        if(!match){
            return res.json({message:"Password do not match"})
        }
        
//token 
        const token= jwt.sign({id:user._id,name:user.name},process.env.JWT_SECRET,{expiresIn:"1h"})  
        res.status(200).send({message:"login successfull",user:{
            name:user.name,
            _id:user._id,
            email:user.email,
            phone:user.address,
            role:user.role
        },token})
       
console.log(user)
    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Error in login"})
    }
    
}


//forgot password
exports.ForgotPassword= async (req,res)=>{
    const {email}= req.body
    try {
        if(email){  
            const user= await userModel.findOne({email:email})

            if(user){

                // //Regenerate token
                 let token= jwt.sign({id:user._id,name:user.name},
                    process.env.JWT_SECRET,{expiresIn: '1h'})

                    //replace token for browser support
                    token = token.replaceAll('.', '~')

                   
                    
                    const link= `http://localhost:3000/customer/passwordReset/${user._id}/${token}`

                    

                    //create a transporter
                    const transporter=nodemailer.createTransport({
                        service:'gmail',
                        host: 'smtp.gmail.com',
                        port: 465,
                       
                        auth:{
                            user: process.env.EMAIL,  //sender email address
                            pass:process.env.EMAIL_PASSWORD, //app password from gmail account
                        }

                    })
                    
                    //define email option
                    const mailOptions={
                        from: process.env.EMAIL,
                        to: email,
                        subject:'password reset request',
                        
    
                        text:link,
                    
                        
                    }

                      //..............
             transporter.sendMail(mailOptions,(error,info)=>{
                if(error){
                    console.log("mail not send",error)
                    return res.status(400).json({message:error})
                }
                return res.status(200).json({message:'email sent'})
            })
        }}
           

       
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({message:error})
    }

    
   
}

// password Reset

exports.ResetPassword= async (req,res)=>{
    const {password, confirmPassword}= req.body
    let {id,token}= req.params
    
    try {
        if(password && confirmPassword && id && token){
            if(password==confirmPassword){
               //token verifying
                   
               const user= await userModel.findById(id)
               console.log(user);
               
               token = token.replaceAll('~', '.')
               console.log("token : " ,token)
               const refreshToken = token;
               const validToken= await jwt.verify(refreshToken,process.env.JWT_SECRET) 
               if(validToken){
               

                //password hashing and updateuser pass
               
                const hashedPassword= await bcrypt.hash(password,10)
                user.password = hashedPassword; 
                const updateUser= await userModel.findByIdAndUpdate(id, user)
                await updateUser.save()
                    
                return res.status(200).json({message:'Password changed successfully'})
            }else{
                return res.status(400).json({message:"Password doesnt match"})

            }   
              
        }else{
            return res.status(400).json({message:"all fields are required"})
           }
            
               
               
            }
            else{
                return res.status(400).json({message:'body is not correct'})
            }
        }
        catch (error) {
            console.log(error,'error')
            return res.status(400).json({message:'error'})
        }
    }


//get all user
exports.GetAllUser= async (req,res)=>{
    try {
        const user=await userModel.find()

        res.status(200).json(user)
    } catch (error) {
        res.status(401).json({message:"something went wrong"})
    }
}




