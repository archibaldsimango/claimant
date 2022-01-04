const express = require('express')
const { createPharmacy,
    getPharmacy,
    getAllPharmacies,
    updatePharmacy, 
    getPharmacyDrugs,
    getAllPharmactOrders} = require('../controllers/pharmacy')

const { requireSignIn } = require('../middleware')
const router = express.Router()
const multer = require('multer')
const path = require('path')

//setting multer storage for profile picture
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage })


//create a pharmacy
//post request
//http://localhost:5050/api/v1/pharmacy/create/:id
router.post('/create/:id', requireSignIn, upload.array('logos'), createPharmacy)

//get all pharmacies
router.get('/all', getAllPharmacies)

//get all pharmacy drugs
router.get('/drugs/:id',requireSignIn,getPharmacyDrugs)

//get a single pharmacy
//http://localhost:5050/api/v1/pharmacy/orders
router.get('/orders/:id', requireSignIn, getAllPharmactOrders)

//get a single pharmacy
//http://localhost:5050/api/v1/pharmacy/:id
router.get('/:id', requireSignIn, getPharmacy)


//update a single pharmacy
//http://localhost:5050/api/v1/pharmacy/update/:id
router.put('/update/:id',requireSignIn,upload.array('logos'), updatePharmacy)

//delete a single pharmacy

module.exports = router