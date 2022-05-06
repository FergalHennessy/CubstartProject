const mongoose = require('mongoose');

//Schema
const schema = mongoose.Schema;
const BlogPostSchema = new schema({
    title: String,
    body: String,
    date: {
        type: String,
        default: Date.now()
    }
});

//Model
const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

module.exports = BlogPost;