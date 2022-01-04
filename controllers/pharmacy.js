const slugify = require('slugify')
const Drug = require('../models/Drug')
const Pharmacy = require("../models/Pharmacy")
const Order = require('../models/Order')

//create a pharmacy
//post request
//http://localhost:5050/api/v1/pharmacy/create/:id
exports.createPharmacy = async (req, res, next) => {
    try {
        const user = req.user
        if (user.role !== 'pharmacy') {
            return res.status(403).json({ error: 'Not Authorised' })
        }
        const { name, phonenumber, address, website } = req.body
        if (!name || !phonenumber || !address) {
            return res.status(400).json({ error: 'Enter Required Fields' })
        }

        //defining pictures
        let logos = [];
        if (req.files.length > 0) {
            logos = req.files.map(file => {
                return { img: file.filename }
            })
        }

        const pharmacy = await Pharmacy.findOne({ name: name })
        if (pharmacy) {
            return res.status(409).json({ error: 'Pharmacy Already Registered' })
        }
        const newPharmacy = new Pharmacy({
            _id: user.user_id,
            name: name,
            phonenumber: phonenumber,
            password: user.password,
            email: user.email,
            address: address,
            website: website,
            logos: logos,
            role: user.role,
            auth_id: user._id,
            longitude: 0,
            latitude: 0,
            slug: slugify(name)
        })
        const savedPharmacy = await newPharmacy.save()
        res.status(200).json({ message: 'Pharmacy Created Successfully', Pharmacy: savedPharmacy })
    } catch (error) {
        next(error)
    }
}

//get a single pharmacy info
//post request
//http://localhost:5050/api/v1/pharmacy/:id
exports.getPharmacy = async (req, res, next) => {
    try {
        const pharmacy = await Pharmacy.findOne({ _id: req.params.id })
        if (pharmacy) {
            return res.status(200).json({ pharmacy: pharmacy })
        }
        else if(!pharmacy){
            return res.status(404).json({ error: "Not Found" })
        }
    } catch (error) {
        next(error)
    }
}

//get all orders
//get request
//http://localhost:5050/api/v1/pharmacy/orders/:id
exports.getAllPharmactOrders = async (req,res, next) =>{
    try {
        const { id } = req.params
        const orders = await Order.find({ to: id })
        if (!orders) {
            return res.status(404).json({ error: 'Not Found' })
        } else {
            res.status(200).json(orders)
        }
    } catch (error) {
        next(error)
    }
}

//get all drugs of a pharmacy
//get request
//http://localhost:5050/api/v1/pharmacy/drugs/:id
exports.getPharmacyDrugs = async (req, res, next) => {
    // const user = req.user
    try {
        const { id } = req.params
        const drugs = await Drug.find({ createdBy: id })
        if (!drugs) {
            return res.status(404).json({ error: 'Not Found' })
        } else {
            res.status(200).json(drugs)
        }
    } catch (error) {
        next(error)
    }
}

//get all single pharmacy info
//post request
//http://localhost:5050/api/v1/pharmacy/all
exports.getAllPharmacies = async (req, res) => {
    const pharmacies = await Pharmacy.find({})
    if (pharmacies) {
        return res.status(200).json({ pharmacies: pharmacies })
    }
    return res.status(404).json({ error: 'Not Found' })
}

//update a pharmacy's info
//put request
//http://localhost:5050/api/v1/pharmacy/update/:id
exports.updatePharmacy = async (req, res, next) => {
    try {
        const { id } = req.params
    const pharmacy = await Pharmacy.findOne({ _id: id })
    if (pharmacy) {
        let { name, email, phonenumber, address, website } = req.body
        //defining pictures
        //can upload multiple pictures
        let logos = [];
        if (req.files.length > 0) {
            logos = req.files.map(file => {
                return { img: file.filename }
            })
        }

        //verifying form so as to not save null values
        if (!phonenumber) {
            phonenumber = pharmacy.phonenumber
        }
        else if (!email) {
            email = pharmacy.email
        }
        else if (!name) {
            name = pharmacy.name
        }
        else if (!website) {
            website = pharmacy.website
        }
        else if (!address) {
            address = pharmacy.address
        }
        else if (!logos) {
            logos = pharmacy.logos
        }

        const newPharmacy = new Pharmacy({
            _id: pharmacy._id,
            phonenumber,
            email,
            website,
            address,
            logos,
            name
        })
        res.json(newPharmacy)
        const updated = await Pharmacy.findOneAndUpdate({ _id: id }, newPharmacy)
        return res.status(200).json({ message: 'Updated Successfully', newInfo: updated })
    } else {
        return res.status(404).json({ error: 'Not Found' })
    }
    } catch (error) {
        next(error)
    }
}