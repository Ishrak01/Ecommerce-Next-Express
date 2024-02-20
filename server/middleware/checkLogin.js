const jwt= require('jsonwebtoken')

const checkLogin=(req,res,next)=>{
  const {authorization}=req.headers

  try {
    if (!authorization) {
      throw new Error("Authentication token missing");
    }
    const token= authorization.split(' ')[1]
    const decoded=jwt.verify(token,process.env.JWT_SECRET)
    const {name,_id}=decoded

    req.name=name
    req._id=_id
    next()
  } catch (error) {
    next("authentication failure")
  }
}

module.exports=checkLogin