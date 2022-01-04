const express = require('express')
const app = express()
require('dotenv').config()
const helmet = require('helmet')
const morgan = require('morgan')
const connectDB = require('./db')
const cors = require('cors')
app.use(cors({methods: "*"}))

//definig the port
const Port = process.env.Port || 5050

//app level middleware
app.use(helmet())
app.use(morgan('common'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(__dirname + '/uploads'));

//user defined routers
const authRoute = require('./routes/auth')
const userRoute = require('./routes/user')
const pharmacyRoute = require('./routes/pharmacy')
const drugRoute = require('./routes/drug')
const paymemtRoute = require('./routes/payment')
const patientRoute = require('./routes/patient')
const ordersRoute = require('./routes/order')
app.use('/api/v1/auth', authRoute)
app.use('/api/v1/user', userRoute)
app.use('/api/v1/pharmacy', pharmacyRoute)
app.use('/api/v1/drug', drugRoute)
app.use('/api/v1/',paymemtRoute)
app.use('/api/v1/patient',patientRoute)
app.use('/api/v1/order', ordersRoute)

//connecting database
connectDB()
//listener
app.listen(Port,(err)=>{
    if(err){
        console.log(err)
    }else{
        console.log(`Server Up On ${Port}`)
    }
})