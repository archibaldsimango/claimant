const Users = require('../models/Users')
const slugify = require('slugify')


//get a single user from all users
//ger request
//http://locahost:5050/api/v1/user/:id
exports.getUser = async (req,res, next)=>{
    try {
        const {id} = req.params
        const user = await Users.findOne({
            _id: id
        })
        if(!user){
           return res.status(500).json({error: 'User Doesnt Exists'})
        }
        else if(user.role === 'user'){
            return res.status(200).json({user: user})
        }
        else{
            return res.status(401).json({error: 'Unauthorised For Action'})
        }
    } catch (error) {
        next(error)
    }
}

//find one document and update it
//put request
//make login for if feilds are mnissing
//http://locahost:5050/api/v1/user/update/:id
exports.updateUser =async (req,res)=>{
    let {username, email, phonenumber, firstname, lastname, prescription, address } = req.body

    //defin pictures
    //to upload multiple pictures
    let profilepictures = [];
    if(req.files.length > 0){
        profilepictures = req.files.map(file =>{
            return {img: file.filename}
        })
    }
    //id from params
    const {id} = req.params

    //user from databse
    const user =await Users.findOne({
        _id: id
    })
    //veriftying form
    if(!phonenumber){
        phonenumber = user.phonenumber
    }
    else if(!email){
        email = user.email
    }
    else if(!firstname){
        firstname = user.firstname
    }
    else if(!lastname){
        lastname = user.lastname
    }
    else if(!prescription){
        prescription = user.prescription
    }
    else if(!address){
        address = user.address
    }
    else if(!profilepictures){
        profilepictures = user.profilepictures
    }

    const newUser = {
        _id: id,
        username,
        email,
        phonenumber,
        firstname,
        lastname,
        prescription,
        address,
        profilepictures,
        address,
        slug: slugify(username)
        // createdBy: req.user._id
    }

    
    if(!user){
        return res.status(200).json({error: "Not Found"})
    }
    const updated = await Users.updateOne({_id:id},newUser)
    res.status(200).json({message: 'Updated Successfully', newInfo: updated})
} 