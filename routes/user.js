const express = require('express')
const { getUser, updateUser } = require('../controllers/users')
const { requireSignIn } = require('../middleware')
const router = express.Router()
const multer = require('multer')
const path = require('path')

//setting multer storage for profile picture
const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req,file, cb){
        cb(null, Date.now() + '-' +file.originalname)
    }
})
const upload = multer({storage})

//list single user info
//get request
router.get('/:id',requireSignIn,getUser)

//update user
router.put('/update/:id',requireSignIn,upload.array('profilepictures'),updateUser)

//delete user
//deleteing user will be added later
router.delete('/user/delete/:id',(req,res)=>{
    res.send('asdfjasdk;lfj')
})

module.exports = router