
// I need to intercept this
const authController = require("../controllers/auth.controller")
const authMW = require("../middlewares/auth.mw")


module.exports = (app) => {
    // POST call to : "0.0.0.0:8080/ecomm/api/v1/auth/signup" for registering the user
    app.post("/ecomm/api/v1/auth/signup",[authMW.verifySignUpBody], authController.signup )
    
    // POST call to : "0.0.0.0:8080/ecomm/api/v1/auth/signin" for logging for the user
    app.post("/ecomm/api/v1/auth/signin", [authMW.verifySignInBody], authController.signin)

}

