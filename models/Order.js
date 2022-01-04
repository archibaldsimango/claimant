const mongoose = require('mongoose')

const orderSchema = mongoose.Schema({
    orderer_name:{
        type: String,
        required: true
    },
    orderer_surname:{
        type: String,
        required: true
    },
    phonenumber:{
        type: String,
        required: true
    },
    item:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: ['pending...', 'recieved'],
        default: 'pending...'
    },
    address:{
        type: String,
        required: true
    },
    to:{
        type: String
    }
},{
    timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)