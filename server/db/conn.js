const express = require('express');
const app = express();
const {MongoClient} = require("mongodb");
const routes = require('../../routes/api.js');
const PORT = process.env.PORT || 8080;
const cors = require('cors');
const path = require('path');
app.use(express.json());
app.use(express.urlencoded({extended:false}));
const Db = "mongodb+srv://fergalh:isthebest@cluster0.mjmfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(Db || 'mongodb://localhost:8080/api', {
    useNewUrlParser:true,
    useUnifiedTopology: true
});

var _db;

module.exports ={
    connectToServer: function(callback){
        client.connect(function(err, db){
            if(db){
                _db = db.db('myFirstDatabase');
                console.log("Successfully connected to MongoDB");
            }
            return callback(err);
        })
    },
    getDb: function (){
        return _db;
    }
}

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('react-client/build'));
}

app.use(cors());
app.use('/api', routes);