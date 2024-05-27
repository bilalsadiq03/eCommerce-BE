// This will be the starting file of the project. 
// Created Admin User at 1:20:00
const express = require("express")
const mongoose = require("mongoose")

const app = express()
const server_config = require("./configs/server.config.js")
const db_config = require("./configs/db.config.js")
const user_model = require("./models/user.model.js")
const bcrypt = require("bcryptjs")

app.use(express.json())

// Creating an admin user at the sarting of the application if not alraedy present.
// Create connection with mongoDB
mongoose.connect(db_config.DB_URL)
const db = mongoose.connection

db.on("error", ()=>{
    console.log("Error while connecting to MongoDB...")
})
db.once("open", ()=>{
    console.log("Successfully connected to MOngoDB...")
    init()
})


async function init(){
    try {
        let user = await user_model.findOne({userId: "admin"})

        if (user) {
            console.log('Admin is already Present.!')
            return
    }
        
    } catch (error) {
        console.log("Error while reading the data", error)
    }

    

    try {
       user = await user_model.create({
        name : "Bilal",
        userId: "admin",
        email: 'bnaq860@gamil.com',
        userType: "ADMIN",
        password: bcrypt.hashSync("Welcome1",8)
       }) 
       console.log("Admin created...", user)

    } catch (error) {
        console.log('Error: ',error)
    }
}

// Sticth the route to the server
require("./routes/auth.route.js")(app)
require("./routes/category.route.js")(app)
require("./routes/product.route.js")(app)
require("./routes/order.route.js")(app)


// Starting the Server...
app.listen(server_config.PORT, ()=>{
    console.log(`Server started at  http://localhost:${server_config.PORT}`)
})