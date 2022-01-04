const mongoose = require('mongoose')

const patientSchema = mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    phonenumber:{
        type:String,
        required: true
    },
    email:{
        type: String
    },
    address:{
        type: String
    },
    slug:{
        type: String,
        required: true
    },
    longitude: {
        type: Number,
        default: 0
    },
    patient_id:{
        type: String
    },
    latitude:{
        type: Number,
        default: 0
    },
    patientPictures: [
        { img: { type: String } }
    ],
},{
    timestamps: true
})

module.exports = mongoose.model('Patient', patientSchema)