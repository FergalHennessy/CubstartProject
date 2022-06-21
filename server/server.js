const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
const app = express();
const cors = require('cors');
const multer = require('multer');
const upload = multer({dest: __dirname + '/uploads/images'});
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({extended:false}));

const dbo = require("./db/conn");

//use app.use() to specify middleware as the callback function (see using middleware for details)
app.use(require("./routes/api"));


const MONGODB_URI = 'mongodb+srv://fergalh:isthebest@cluster0.mjmfj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'


//HTTP request logger
app.use(morgan('tiny'));

app.use(cors());
//app.use('/api', routes);




app.listen(PORT, () =>{
    //perform database connection when server starts
    dbo.connectToServer(function (err){
        if(err) console.error(err);
    });
    console.log(`SERVER IS RUNNING ON PORT: ${PORT}`)
})

/*
mongoose.connect(MONGODB_URI || 'mongodb://localhost:8080/api', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected!!!!');
})
*/



if (process.env.NODE_ENV === 'production') {
    app.use(express.static('react-client/build'));
}




