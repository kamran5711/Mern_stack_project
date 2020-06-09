const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');
const User = require('../../models/User');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route   GET api/profile/me
// @desc    get current users profiles
// @access  Private
router.get('/me',auth, async(req, res)=>{
    try {
        let profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name','avator']);
        if(!profile){
            return res.status(400).json({ msg:"there is no user for current profile."});
        }
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});

// @route   POST api/profile
// @desc    create or update user profile
// @access  provate

router.post('/', [auth,[
    check('status','status is required.').not().isEmpty(),
    check('skills', 'Skills are required.').not().isEmpty()
]], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const { 
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        twitter,
        facebook,
        instagram,
        linkedin } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if(company) profileFields.company = company;
    if(website) profileFields.website = website;
    if(location) profileFields.location = location;
    if(bio) profileFields.bio = bio;
    if(status) profileFields.status = status;
    if(githubusername) profileFields.githubusername = githubusername;
    if(skills){
        profileFields.skills = skills.split(',').map(skill=> skill.trim() );
    }
    // Build social object
    profileFields.social = {};
    if(youtube) profileFields.social.youtube = youtube;
    if(twitter) profileFields.social.twitter = twitter;
    if(facebook) profileFields.social.facebook = facebook;
    if(instagram) profileFields.social.instagram = instagram;
    if(linkedin) profileFields.social.linkedin = linkedin;

    try {
        let profile = await Profile.findOne({user: req.user.id});
        if(profile){
        // update profile
        profile = await Profile.findOneAndUpdate({user:req.user.id}, {$set: profileFields}, {new:true});
        return res.json(profile);
        }
        // create profile
        profile = new Profile(profileFields);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});

// @route   GET api/profile
// @desc    get all profiles
// @access  public

router.get('/', async (req, res)=>{
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avator']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server error.');
    }
});


// @route   GET api/profile/user/:user_id
// @desc    get profile by user id
// @access  public

router.get('/user/:user_id', async (req, res)=>{
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avator']);
        if(!profile) return res.status(400).json({msg: 'profile not found'});
        
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        if(err.kind == 'ObjectId'){
            return res.status(400).json({msg: 'profile not found'});
        }
        return res.status(500).send('server error.');
    }
});

// @route   Delete api/profile
// @desc    Delete profile, user and posts
// @access  private

router.delete('/', auth, async(req, res)=>{
    try {
        // @todos remove posts related to this user profile


        // remove profile
        await Profile.findOneAndRemove({user:req.user.id});

        // remove user
        await User.findOneAndRemove({_id:req.user.id});
        return res.json({msg:'User removed.'})
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error.');
    }
});

// @route   Put api/profile/experience
// @desc    Put experience to profile
// @access  private

router.put('/experience',[auth,[
    check('title','Title is required.').not().isEmpty(),
    check('company','Company is required.').not().isEmpty(),
    check('from', 'From date is required.').not().isEmpty()
]], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const { title, company, from, location, to, current, description } = req.body;
    const newExp = { title, company, from, location, to, current, description };
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.experiences.unshift(newExp);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error.');
    }
});

// @route   Delete api/profile/experience/:exp_id
// @desc    Delete profile's experience
// @access  private

router.delete('/experience/:exp_id', auth, async(req, res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});
        // get remove index
        const removeIndex = profile.experiences.map(item=> item.id).indexOf(req.params.exp_id);
        profile.experiences.splice(removeIndex, 1);
        await profile.save();
        return res.json({msg:'Experience removed.'})
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error.');
    }
});

// @route   Put api/profile/education
// @desc    Put education to profile
// @access  private

router.put('/education',[auth,[
    check('school','school is required.').not().isEmpty(),
    check('degree','degree is required.').not().isEmpty(),
    check('from', 'From date is required.').not().isEmpty(),
    check('fieldofstudy', 'Feild of study is required.').not().isEmpty(),
]], async(req, res)=> {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array() });
    }

    const { school, degree, from, fieldofstudy, to, current, description } = req.body;
    const newEdu = { school, degree, from, fieldofstudy, to, current, description };
    try {
        const profile = await Profile.findOne({user:req.user.id});
        profile.education.unshift(newEdu);
        console.log(profile);
        await profile.save();
        return res.json(profile);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error.');
    }
});

// @route   Delete api/profile/education/:edu_id
// @desc    Delete profile's education
// @access  private

router.delete('/education/:edu_id', auth, async(req, res)=>{
    try {
        const profile = await Profile.findOne({user:req.user.id});
        // get remove index
        const removeIndex = profile.education.map(item=> item.id).indexOf(req.params.edu_id);
        profile.education.splice(removeIndex, 1);
        await profile.save();
        return res.json({msg:'Education removed.'})
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('server error.');
    }
});

module.exports = router;