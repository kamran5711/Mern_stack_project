const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const User = require('../../models/User');
const Profile = require('../../models/Profile');

// @route   POST api/posts
// @desc    Create post
// @access  Private
router.post('/', [auth,[
    check('text', 'Text is Required.').not().isEmpty(),
]], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const newPost = {
            text:req.body.text,
            name:user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        const post = new Post(newPost);
        await post.save();
        return res.json(post);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }

});

// @route   GET api/posts
// @desc    Get all posts
// @access  Private
router.get('/', auth, async(req, res)=>{
    try {
        const posts = await Post.find().sort({ date: -1});
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }
});


// @route   GET api/posts/:id
// @desc    Get post by id
// @access  Private
router.get('/:id', auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        if(!post){
            return res.status(404).json({ msg:'Post not found'})
        }
        res.json(post);
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg:'Post not found'});
        }
        res.status(500).send('Server Error.');
    }
});

// @route   DELETE api/posts
// @desc    Delete post by Id
// @access  Private
router.delete('/:id', auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({ msg: 'post not found'});
        }
        // check wheather user has this post or not 
        if(post.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'User not authorized'});
        }
        await post.remove();
        res.json('post removed');
    } catch (err) {
        console.error(err.message);
        if(err.kind === 'ObjectId'){
            return res.status(404).json({ msg:'Post not found'})
        }
        res.status(500).send('Server Error.');
    }
});


// @route   DELETE api/posts/like/:id
// @desc    like a post
// @access  Private
router.put('/like/:id', auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        // check if post already liked or not
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'post already liked'});
        }
        post.likes.unshift({ user: req.user.id });
        await post.save();
        res.json(post.likes);
    } catch (err) {
        
    }
});

// @route   DELETE api/posts/unlike/:id
// @desc    unlike a post
// @access  Private
router.put('/unlike/:id', auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        // check if post already liked or not
        if(post.likes.filter(like=> like.user.toString() === req.user.id).length === 0){
            return res.status(400).json({ msg: 'post has not yet been liked'});
        }
        // get remove index
        const removeIndex = post.likes.map(like=> like.user.toString().indexOf(req.user.id));
        post.likes.splice(removeIndex, 1);
        
        await post.save();
        res.json(post.likes);
    } catch (err) {
        
    }
});

// @route   POST api/posts/comment/:id
// @desc    Comment on a post
// @access  Private
router.post('/comment/:id', [auth,[
    check('text', 'Text is Required.').not().isEmpty(),
]], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const user = await User.findById(req.user.id).select('-password');
        const post = await Post.findById(req.params.id);

        const newComment = {
            text:req.body.text,
            name:user.name,
            avatar: user.avatar,
            user: req.user.id
        }
        post.comments.unshift(newComment);
        await post.save();
        return res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }

});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    delete a comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async(req, res)=>{
    try {
        const post = await Post.findById(req.params.id);
        // pull out comment
        const comment = post.comments.find(comment=> comment.id === req.params.comment_id);
        // make sure comment exist
        if(!comment){
            return res.status(404).json({ msg:'comment does not exist'})
        }
        // check user
        if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg: 'user not authorized'})
        }
        // get remove index
        const removeIndex = post.comments.map(comment=> comment.user.toString().indexOf(req.user.id));
        post.comments.splice(removeIndex, 1);
        await post.save();
        return res.json(post.comments);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error.');
    }
});


module.exports = router;