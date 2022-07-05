//Have forgot almost completely everything that this does
const {MongoClient} = require("mongodb");

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
                //_db = db
                _db = db.db('myFirstDatabase'); //changed from mongo guide
                console.log("Successfully connected to MongoDB");
            }
            return callback(err);
        });
    },
    getDb: function (){
        return _db;
    }
}
