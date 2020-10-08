const express =require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator");
 
const {signin,signout} = require("../controller/auth")


router.post("/signin",
[
    check("email","email is required").isEmail(),
    check("password","password is required").isLength({min  : 3}),
],
    signin);


    router.get("/signout", signout);

module.exports = router
