const Order = require('../models/Order')
const Patient = require('../models/Patient')
const Product = require('../models/Drug')

//post request
//requires login
//http://localhost:5050/api/v1/order/add/:id
exports.createOrder = async (req, res, next) => {
    try {
        const user = req.user
        const { to } = req.body
        const { id } = req.params
        if (user) {
            const patient = await Patient.findOne({ email: user.email })
            const product = await Product.findOne({ _id: id })
            if (patient) {
                const newOrder = new Order({
                    orderer_name: patient.firstname,
                    orderer_surname: patient.lastname,
                    item: product.name,
                    address: patient.address,
                    to,
                    phonenumber: patient.phonenumber
                })
                const savedOrder = await newOrder.save()
                res.status(200).json({ message: 'Order Created', order: savedOrder })
            } else {
                return res.status(200).json({ error: 'Not Found' })
            }
        } else {
            res.status(200).json({ error: 'Please login to create order' })
        }

        res.json(newOrder)
    } catch (error) {
        next(error)
    }
}

//delte request
//requires login for pharmacy
//http://localhost:5050/api/v1/order/delete/:id
exports.deleteOrder =  async() =>{
    const {id} = req.params
    console.log(id)
}