const mongoose = require('mongoose')

const pharmacySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required:true
    },
    phonenumber:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        default: ""
    },
    password:{
        type: String,
    },
    longitude:{
        type:Number
    },
    latitude:{
        type:Number
    },
    auth_id:{
        type: String
    },
    slug:{
        type: String,
    },
    website:{
        type: String
    },
    role:{
        type: String,
        default : 'pharmacy'
    },
    logos: [
        { img: { type: String } }
    ],
},{
    timestamps: true
})

module.exports = mongoose.model('Pharmacy', pharmacySchema)