const jwt = require('jsonwebtoken')

//checking if user id signed in route
exports.requireSignIn = (req,res,next)=>{

    if(req.headers.authorization){
        const token = req.headers.authorization
        jwt.verify(token, process.env.JWT_SECRET,(err, user)=>{
            if(err){
                next(err)
            }
            if(user){
                req.user = user
                next()
            }
        })
       
    }else{
        return res.status(500).json({message: 'Authorisation Required!'})
    }
}