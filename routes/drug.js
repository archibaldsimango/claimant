const express = require('express')
const { createDrug, viewDrug, getAllDrugs, editDrug, deleteDrug } = require('../controllers/drug')
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


//create a drug
//post request
router.post('/add',requireSignIn,upload.array('drugPictures'), createDrug)

//see all drugs
//get request
router.get('/all',getAllDrugs)

//view a single drug
//get request
router.get('/:id',viewDrug)

//editing a drug
//pu request
router.put('/edit/:id',editDrug)

//deleting a drug from database
//delete request
router.delete('/delete/:id',deleteDrug)

module.exports = router