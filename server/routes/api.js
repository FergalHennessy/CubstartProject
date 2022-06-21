//-------------------------------------------DEPENDENCIES-----------------------------------------------//
const express = require("express");
// recordRoutes is an instance of the express router.
// We use it to define our routes.
//The router is added as a middleware and takes control of requests starting with path /record
const recordRoutes = express.Router();

//callback to connect to the database
const dbo = require("../db/conn");

//This function converts a string to object id (why is this necessary?)
const ObjectId = require("mongodb").ObjectId;


//---------------------------------SCHEMAS-----------------------------------------//
const BlogPost = require('../../models/blogPost');
const ImagePost = require('../../models/imagePost');
const User = require('../../models/user');

//-----------------------------------USERS----------------------------------------//

//LIST ALL USERS
recordRoutes.route("/users").get(function (req, res){
    let db_connect = dbo.getDb("myFirstDatabase");
    db_connect
        .collection("users").find({}).toArray(function (err, result){
            if (err) throw err;
            res.json(result);
        });
})

//GET A USER BY ID
recordRoutes.route("/users/:id").get(function(req, res){
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id)};
    db_connect
        .collection("users")
        .findOne(myquery, function(err, result){
            if (err) throw err;
            res.json(result);
        });
    });

//CREATE A NEW USER? 
recordRoutes.route("/users/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level,
    };
    db_connect.collection("users").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });  

//UPDATE A User? BY ID? (THIS DOES NOT SEEM FUNCTIONAL)
recordRoutes.route("/users/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb(); 
    let myquery = { _id: ObjectId( req.params.id )}; 
    let newvalues = {   
      $set: {     
        name: req.body.name,    
        position: req.body.position,     
        level: req.body.level,   
      }, 
     }
   })

//DELETE A USER
recordRoutes.route("users/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("users").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
   });

//--------------------------------------IMAGEPOSTS-------------------------------------//

//GET ALL IMAGEPOSTS AS ARRAY
recordRoutes.route("/imagePosts").get(function(req, res){
  
  let db_connect = dbo.getDb();
  db_connect.collection("imagePosts").find({}).toArray(function(err, result){
    if(err) throw err;
    res.json(result);
  });

});

//GET AN IMAGEPOST BY ID
recordRoutes.route("/imagePosts/:id").get(function(req, res){
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id)};
  db_connect
      .collection("imagePosts")
      .findOne(myquery, function(err, result){
          if (err) throw err;
          res.json(result);
      });
  });

//CREATE A NEW IMAGEPOST 
recordRoutes.route("/imagePosts/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connect.collection("imagePosts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });  

//UPDATE AN IMAGEPOST BY ID? (THIS DOES NOT SEEM FUNCTIONAL)
recordRoutes.route("/imagePosts/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb(); 
  let myquery = { _id: ObjectId( req.params.id )}; 
  let newvalues = {   
    $set: {     
      name: req.body.name,    
      position: req.body.position,     
      level: req.body.level,   
    }, 
   }
 })

//DELETE AN IMAGEPOST
recordRoutes.route("imagePosts/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("imagePosts").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 imagePost deleted");
    response.json(obj);
  });
 });


 //------------------------------BLOGPOSTS (UNUSED)-------------------------------//

//GET ALL BLOGPOSTS AS ARRAY
recordRoutes.route("/blogPosts").get(function(req, res){
  
  let db_connect = dbo.getDb();
  db_connect.collection("blogPosts").find({}).toArray(function(err, result){
    if(err) throw err;
    res.json(result);
  });

});

//GET AN BLOGPOST BY ID
recordRoutes.route("/blogPosts/:id").get(function(req, res){
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id)};
  db_connect
      .collection("imagePosts")
      .findOne(myquery, function(err, result){
          if (err) throw err;
          res.json(result);
      });
  });

//CREATE A NEW BLOGPOST
recordRoutes.route("/blogPosts/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  db_connect.collection("blogPosts").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });  

//UPDATE AN BLOGPOST BY ID? (THIS DOES NOT SEEM FUNCTIONAL)
recordRoutes.route("/blogPosts/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb(); 
  let myquery = { _id: ObjectId( req.params.id )}; 
  let newvalues = {   
    $set: {     
      name: req.body.name,    
      position: req.body.position,     
      level: req.body.level,   
    }, 
   }
 })

//DELETE AN BLOGPOST
recordRoutes.route("blogPosts/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect.collection("imagePosts").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 imagePost deleted");
    response.json(obj);
  });
 });



module.exports = recordRoutes;