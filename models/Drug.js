const mongoose = require('mongoose')

const drugSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    dosage:{
        type: String
    },
    description:{
        type: String,
        required: true
    },
    quantity:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        enum: ['public', 'private'],
        default: 'public'
    },
    discountPrice:{
        type: Number,
        default:0
    },
    category:{
        type: String,
        required: true
    },
    precaution:{
        type: String
    },
    barcode:{
        type: Number
    },
    sku:{
        type: String
    },
    brand:{
        type: String
    },
    benefits:{
        type: String
    },
    drugPictures: [
        { img: { type: String } }
    ],
    createdBy: { 
        type: String,
     },
},{
    timestamps: true
})

module.exports = mongoose.model('Drug', drugSchema)