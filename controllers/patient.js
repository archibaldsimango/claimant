const Patient = require('../models/Patient')
const slugify = require('slugify')

//create a single patient
//post request
//http://localhost:5050/api/v1/patient/add
exports.createPatient = async (req, res, next) => {
    const user = req.user
    const { firstname, lastname, phonenumber, address } = req.body
    try {
        //defining pictures
        let patientPictures = [];
        if (req.files.length > 0) {
            patientPictures = req.files.map(file => {
                return { img: file.filename }
            })
        }

        //validating inputs at backed side
        if (!firstname || !lastname || !phonenumber || !address) {
            return res.status(200).json({ error: 'Please enter all fields' })
        } else {
            const patient = new Patient({
                firstname,
                lastname,
                phonenumber,
                address,
                patientPictures,
                email: user.email,
                slug: slugify(firstname),
                patient_id: user.user_id
            })
            const savedPatient = await patient.save()
            res.status(200).json({ message: 'Account Created Successfully', user: savedPatient })
        }
    } catch (error) {
        next(error)
    }
}

//get a single patient
//get request
//http://localhost:5050/api/v1/patient/:id
exports.getAPatient = async(req,res, next)=>{
    try {
        const patient = await Patient.findOne({ _id: req.params.id })
        if(!patient){
            return res.status(200).json({error: 'Not Found'})
        }else{
            return res.status(200).json({message: 'Success', patient : patient})
        }
    } catch (error) {
        next(error)
    }
}