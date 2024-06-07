// Create a mw wich checks  if the request body is proper and correct
const user_model = require("../models/user.model")
const jwt = require("jsonwebtoken")
const auth_config = require("../configs/auth.config")




const verifySignUpBody = async (req, res, next)=>{
    try {

        // Check for the name
        if(!req.body.name){
            return res.status(400).send({
                message: "Failed! Name was not provided in the request body"
            })
        }

        // Check for the userId
        if(!req.body.userId){
            return res.status(400).send({
                message: "Failed! userId was not provided in the request body"
            })
        }

        // Check for the email
        if(!req.body.email){
            return res.status(400).send({
                message: "Failed! email was not provided in the request body"
            })
        }

        // Check if the user with the same userId is already present
        const user = await user_model.findOne({userId: req.body.userId})
        if (user){
            return res.status(400).send({
                message: "Failed! user with the same userId is already present"
            })
        }

        next()
        
    } catch (error) {
        console.log("Error while validating the request object", error)
        res.status(500).send({
            message: "Error while validating the request body"
        })
    }
}



const verifySignInBody = async(req, res, next) => {

    if(!req.body.userId) {
        return res.status(400).send({
            message: "User Id is not provided!"
        })
    }

    if(!req.body.password){
        return res.status(400).send({
            message: "Password is not provided!"
        })
    }

    next()
}

const verifyToken = (req, res, next)=> {
    // Check if the token is present in the header
    const token = req.headers['x-access-token']

    if(!token){
        return res.status(403).send({
            message: "Unauthorised Action! No token found"
        })
    }

    // If it is a valid token
    jwt.verify(token, auth_config.secret, async (err, decoded)=>{
        if (err){
            return res.status(401).send({
                message: "Unauthorized.!"
            })
        }
        const user =  await user_model.findOne({userId: decoded.id})
        if (!user) {
            return res.status(400).send({
                message: "Unauthorized! The user for this token doesn't exist."
            })
        }
        // set theuser info in the req body
        req.user = user


        next()
    })

    


    // Move to the next step
}


const isAdmin = (req, res, next)=>{
    const user = req.user
    if(user && user.userType == "ADMIN"){
        next()
    } else {
        return res.status(403).send({
            message: "Only ADMIN users are allowed.!"
        })
    }
}


module.exports = {
    verifySignUpBody: verifySignUpBody,
    verifySignInBody: verifySignInBody,
    verifyToken: verifyToken,
    isAdmin: isAdmin
}
