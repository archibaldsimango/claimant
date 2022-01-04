const User = require('../models/Users')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

//post request
//register user
//encrypt password
//http://localhost:5050/api/v1/auth/register
exports.registerUser = async (req, res, next) => {
    try {
        let { username, email, password, password2 } = req.body
        if (!username || !email || !password || !password2) {
            res.status(200).json({ error: 'Enter All Fields' })
        }
        else if (password !== password2) {
            res.status(200).json({ error: 'Passwords Do Not Match' })
        }
        else if (password.length < 6) {
            res.status(200).json({ error: 'Password Is Too  Short' })
        }
        else {
            const user = await User.findOne({ email: email })
            if (user) {
                res.status(200).json({ error: 'Account Already Exists' })
            }
            else if (!user) {
                hash = await bcrypt.hash(password, 10)
                if (hash) {
                    const newUser = new User({
                        username: username,
                        password: hash,
                        email: email,
                    })
                    const savedUser = await newUser.save()
                    res.status(200).json({ message: 'Account Created', user: savedUser })
    
                }
            }  
        }
    } catch (error) {
        next(error)
    }
}

//post request
//login a user
//check is password is correct
//assign a token to user
//https://localhost:5050/api/v1/auth/login
exports.loginUser = (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        res.status(403).json({ error: 'Enter All Fields' })
    } else {
        User.findOne({ email: email }, (err, user) => {
            if (err) {
                return res.status(500).json({ error: err })
            }
            else if (!user) {
                return res.status(403).json({ error: "Account Does Not Exist" })
            } else if (user) {

                bcrypt.compare(password, user.password, function (err, result) {
                    if (err) {
                        return res.status(500).json({ error: "Invalid Credentials" })
                    } else if (result) {
                        const token = jwt.sign({
                            username: user.username,
                            email: user.email,
                            user_id: user._id,
                            role: user.role
                        }, process.env.JWT_SECRET)
                        res.status(200).json({
                            message: 'Login Successful',
                            token: token,
                            user: {
                                username: user.username,
                                email: user.email,
                                user_id: user._id,
                                role: user.role
                            }
                        })
                    }
                    else {
                        res.status(200).json({ error: "Invalid Credentials" })
                    }
                });
            }
        })
    }
}