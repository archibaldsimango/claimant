const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const { createPatient, getAPatient } = require('../controllers/patient')
const { requireSignIn } = require('../middleware')

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

//gcreate a single patient
//http://localhost:5050/api/v1/patient/add
router.post('/add',upload.array('patientPictures'),requireSignIn,createPatient)

//get a single patient
//http://localhost:5050/api/v1/patient/:id
router.get('/:id',getAPatient)

//get all patients
router.get('/all',(req,res)=>{
    res.send('get all patients')
})

//update a single patient
router.put('/update/:id',(req,res)=>{
    res.send('updartinf a patient')
})

//delete a single patient
router.delete('/delete/:id',(req,res)=>{
    res.send('delete a single pharmacy')
})

module.exports = router