const Drug = require("../models/Drug")

//creating a drug 
//post request
//http://localhsot:5050/api/v1/drug/add
exports.createDrug = async(req, res, next) => {
    try {
        const user = req.user
        if (user.role = "pharmacy") {
            const { name, description, barcode, sku, quantity, discountPrice, category,price, brand, dosage, benefits, precaution } = req.body
            //defining pictures
            let drugPictures = [];
            if (req.files.length > 0) {
                drugPictures = req.files.map(file => {
                    return { img: file.filename }
                })
            }
            const newDrug = new Drug({
                brand,
                benefits,
                dosage,
                name,
                description,
                barcode,
                sku,
                quantity,
                discountPrice,
                category,
                status: 'public',
                precaution,
                createdBy: user.user_id,
                drugPictures,
                price
            })

            const savedDrug = await newDrug.save()
            res.status(200).json({message: 'Product Saved', product: savedDrug})
        } else {
            res.status(403).json({ error: 'Not Authorised' })
        }
    } catch (error) {
        next(error)
    }
}

//get all drug
//get request
//http://localhost:5050/api/v1/drug/all
exports.getAllDrugs =async (req, res, next) => {
    try {
        const drugs = await Drug.find({})
        res.status(200).json({products: drugs})
    } catch (error) {
        next(error)
    }
}

//view a single drug
//get request
//http://localhost:5050/api/v1/drug/:id
exports.viewDrug = async(req, res,next) => {
    try {
        const {id} = req.params
        const drug = await Drug.findOne({_id: id})
        res.status(200).json(drug)

    } catch (error) {
        next(error)
    }
}

//edit a single drug
//put request
//http://localhost:5050/api/v1/drug/edit/:id
exports.editDrug = async (req, res, next) => {    
    try {
        const user = req.user
        if(user.role === 'pharmacy'){
            const {id} = req.params
            const drug = await Drug.findOne({_id: id})
            if(!drug){
                return res.status(404).json({error: 'Not Found'})
            }else{
                let { name, description, barcode, sku, quantity, discountPrice, category,price } = req.body
                let drugPictures = [];
                if (req.files.length > 0) {
                    drugPictures = req.files.map(file => {
                        return { img: file.filename }
                    })
                }
                if(!name){
                    name = user.name
                }
                else if(!description){
                    description = user.description
                }
                else if(!barcode){
                    barcode = user.barcode
                }
                else if(!sku){
                    sku = user.sku
                }
                else if(!quantity){
                    quantity = user.quantity
                }
                else if(!discountPrice){
                    discountPrice = user.discountPrice
                }
                else if(!category){
                    category = user.category
                }
                else if(!price){
                    price = user.price
                }
                else if(!drugPictures){
                    drugPictures = user.drugPictures
                }else{
                   const newDrug = new Drug({
                       name,
                       category,
                       price,
                       barcode,
                       sku,
                       description,
                       quantity,
                       discountPrice,
                       drugPictures,
                       createdBy: user.user_id
                   })

                   res.send(newDrug)
                }
            }
        }else{
            return res.status(403).json({error: 'Not Authorised'})
        }
    } catch (error) {
        next(error)
    }
}

//delete a drug
//delete request
//http://localhost:5050/api/v1/drug/delete/:id
exports.deleteDrug = (req, res) => {
    res.send('deleting a single drug')
}