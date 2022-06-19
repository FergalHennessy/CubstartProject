const express = require('express');
const { token } = require('morgan');

const router = express.Router();

const BlogPost = require('../models/blogPost');
const ImagePost = require('../models/imagePost')
const User = require('../models/user')

//on get to root(api) return all the blogposts we have
router.get('/', (req, res) => {

    BlogPost.find({})
        .then((data) => {
            console.log('Data:', data);
            res.json(data)
        })
        .catch((error) => {
            console.log('error: ', error)
        });
});

//on post to branch(save) create new blogPost based on models.
router.post('/save', (req, res) =>{
    console.log('Body: ', req.body);
    const data = req.body;

    const newBlogPost = new BlogPost(data)
    
    
    newBlogPost.save((error)=>{
        if(error){
            res.status(500).json({msg: 'Sorry, internal server errors'});
        }
        return res.json({
            msg: 'Your mainPost has been saved! (serverSide)'
        })
    })
    
})

router.get('/imagePosts', (req, res) => {
    ImagePost.find({})
        .then((data)=>{
            console.log('IMAGEPOSTS:', data);
            res.json(data);
        }).catch((error) => {console.log("imagePost get error", error)});
});

router.get('/login', (req, res) => {
    res.send ({
        token: 'test123'
    });
    console.log(req);
})

//RECEIVE LOGIN REQUEST =>
router.post('/login', (req, res) => {
    console.log('Login Request: ', req.body);
    const data = req.body;

    const newUser = new User(data)
    
    
    newUser.save((error)=>{
        if(error){
            res.status(500).json({msg: 'Sorry, internal server errors'});
        }
    
        return res.json({
            msg: "Current user has properties:", username: req.body.username, password: req.body.password
        });
    })
})

//RECEIVE NEWUSER REQUEST =>
router.post('/newUser', (req, res) => {
    console.log('New User Request: ', req.body);
    const data = req.body;

    const newUser = new User(data)
    
    
    newUser.save((error)=>{
        if(error){
            res.status(500).json({msg: 'Sorry, internal server errors'});
        }
        return res.json({
            msg: "Requesting new user with properties: ", username: req.body.username, password: req.body.password 
        })
    })
})


module.exports = router;