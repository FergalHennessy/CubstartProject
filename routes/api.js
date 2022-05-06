const express = require('express');

const router = express.Router();

const BlogPost = require('../models/blogPost');


router.get('/', (req, res) => {

    BlogPost.find({})
        .then((data) => {
            console.log('Data:', data);
            res.json(data)
        })
        .catch((error) => {
            console.log('error: ', daerrorta)
        });
});

router.post('/save', (req, res) =>{
    console.log('Body: ', req.body);
    const data = req.body;

    const newBlogPost = new BlogPost(data)
    
    
    newBlogPost.save((error)=>{
        if(error){
            res.status(500).json({msg: 'Sorry, internal server errors'});
        }
        return res.json({
            msg: 'Your data has been saved!'
        })
    })
    
})

router.get('/thing', (req, res) => {
    const data = {
        username: 'luigi',
        age: 99
    };
    res.json(data);
});


module.exports = router;