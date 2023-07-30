const Router = require("express");
const User = require("../models/User");
const router = new Router();
const bcrypt = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("config");
router.post("/registration",[
        check("name","Name must be longer than 3 and shorter than 21").isLength({min:3,max:21}),
        check("password","Password must be longer than 8 and shorter than 31").isLength({min:8,max:31}),
    ],
    async (req, res) => {
        try {
            console.log(req.body);
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({message:"Incorrect request",errors});
            }

            const { name, password } = req.body;

            const existingUser = await User.findOne({ name });
            if (existingUser) {
                return res.json({ message: "User already exists" });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({
                name,
                password: hashedPassword,
            });
            await newUser.save();

            return res.json({ message: "User registered successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    });

router.get("/login", async (req, res) => {
    try {
        const{name,password} = req.body;
        const user = await User.findOne({name});
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isValidPass = bcrypt.compareSync(password,user.password);
        if(!isValidPass){
            return res.status(400).json({message:"Invalid password"});
        }
        const token = jwt.sign({id:user.id}, config.get("secretKey"),{expiresIn:"1h"});
        return res.status(200).json({
            token,
            user:{
                id:user.id,
                name:user.name
            }
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
});
module.exports = router;
