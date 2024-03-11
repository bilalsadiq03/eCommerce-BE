// Controller for creating the category
const category_model = require("../models/category.model")


exports.createNewCtegory = async (req, res)=>{
    // Read the category body

    // Create the category object
    const categoryData = {
        name: req.body.name,
        description: req.body.description 
    } 

    // Insert into mongodb
    try {
        const category = await category_model.create(categoryData)
        res.status(201).send(category)
    } catch (error) {
        console.log("Error while creating the category",error)
        return res.status(500).send({
            message: "Error while creating the category"
        })
        
    }

    // Return the response of the craeted category
}




