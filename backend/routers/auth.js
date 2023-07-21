const express = require('express');
const User = require('../models/User');
const Token = require('../models/Token');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser');
var face_re = require('../middleware/face_reco');
const SendMail = require('../middleware/sendemail');
const crypto = require("crypto");

const JWT_SECRET = process.env.JWTPRIVATEKEY;

/*
router.get('/', (req, res)=>{

    obj = {
        a: 'thos',
        number: 34
    }
    res.json(obj)


    // data display in terminal
    console.log(req.body);
    const user = User(req.body);
    user.save();
    // data display in request
    res.send(req.body);

})  */

// ROUTE : Create a User using: POST "/api/auth/createuser". No login required
router.post('/createuser', [
  body('firstname', 'Enter a valid name').isLength({ min: 3 }),
  body('lastname', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    // Check whether the user with this email exists already
    let user = await User.findOne({ email: req.body.email });
    if (user && !user.verified) {
      return res.status(400).json({ success, error: "user already exists Please do email verification or login to get new verification link" })
    }
    if (user) {
      return res.status(400).json({ success, error: "Sorry a user with this email already exists" })
    }

    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    user = await User.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      password: secPass,
      email: req.body.email,
      image: req.body.image,
    });

    


    // const data = {
    //   user: {
    //     id: user.id
    //   }
    // }
    // const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;

    // res.json(user)
    res.status(201).send({ success, "firstname": user.firstname, "lastname": user.lastname, "email": user.email, "message": "account created" });
    // res.status(201).send({ success, authtoken, "name": user.name, "email": user.email, "message": "An Email sent to your account please verify" });

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
})


// ROUTE : Authenticate a User using: POST "/api/auth/login". No login required
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
  let success = false;
  // If there are errors, return Bad request and the errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      success = false
      return res.status(400).json({ error: "Please try to login with correct credentials" });
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      success = false
      return res.status(400).json({ success, error: "Please try to login with correct credentials" });
    }



    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    // const authtoken = user.generateAuthToken();
    success = true;
    res.status(200).send({ success, authtoken, message: "logged in successfully", "firstname": user.firstname, "lastname": user.lastname, "email": user.email });
    // res.json({ success, authtoken, "name": user.name, "email": user.email })

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router