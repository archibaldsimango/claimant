const express = require('express')
const { createOrder, deleteOrder } = require('../controllers/order')
const { requireSignIn } = require('../middleware')
const router = express.Router()

//create an order
//http://localhost:5050/api/v1/order/add/:id
router.post('/add/:id',requireSignIn,createOrder)

//get an order
router.get('/:id',(req,res)=>{
    res.send('all orders are here')
})

//get all orders
router.get('/all',(req,res)=>{
    res.send('get all orders')
})

//update an order
router.put('/:id',(req,res)=>{
    res.send('update an order')
})

//delete an order
//http://localhost:5050/api/v1/delete/:id
router.delete('/:id',requireSignIn,deleteOrder)
module.exports = router