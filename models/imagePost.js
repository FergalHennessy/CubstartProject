const mongoose = require('mongoose');

//Schema
const schema = mongoose.Schema;
const ImagePostSchema = new schema({
    title: String,
    body: String,
    posts: Array,
    locations: Array,
    imgsrc: String,
    innertext: String
});

//Model
const BlogPost = mongoose.model('ImagePost', ImagePostSchema);

module.exports = BlogPost;