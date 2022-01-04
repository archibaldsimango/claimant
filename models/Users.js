const mongoose = require('mongoose')

//schema for authenticartion for both user and pharmacy
const authSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required: true,
    },
    role:{
        type:String,
        required: true,
        enum: ['user', 'pharmacy'],
        default: 'user'
    },
    password:{
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Auth', authSchema)