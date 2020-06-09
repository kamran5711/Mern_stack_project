const express = require('express');
const router = express.Router();
const gravtor = require('gravatar');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register route
// @access  public
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'please enter a valid email').isEmail(),
    check('password', 'Password should be at least six charactor.').isLength({min:6})
] , async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()});
    }

    const {name, email, password } = req.body;
    try {
        let user = await User.findOne({email});
        if(user){
            return res.status(400).json({ errors: [{"msg":"user already exists."}]});
        }
        // see if the user exists
        // get gravtor
        const avator = gravtor.url(email,{
            s: '200',
            r: 'pg',
            d: 'mm'
        });
        
        user = new User({
            name,
            email,
            avator,
            password
        });
        //encrypt password

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        // return jsonwebtoken
        const payload = {
            user:{
                id:user.id
            }
        }
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn:3600 }, (err, token)=>{
            if(err) throw err;
            res.json({ token });
        });
    }catch (err) {
        console.error(err.message);
        return res.status(500).send('server error');
    }

});
module.exports = router;