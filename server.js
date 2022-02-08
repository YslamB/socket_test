var MongoClient = require('mongodb').MongoClient
var morgan = require('morgan')
const http = require("http")
const express = require("express")
const socketio = require("socket.io")
var mongoose = require("mongoose")
const app = express();

const server = http.createServer(app);
const io = socketio(server);


var url = "mongodb://localhost:27017/"
var ObjectId = mongoose.Types.ObjectId




function insertMDB(){
    
    MongoClient.connect(url, function(err, db) {

        if (err) throw err;

        console.log("Database connected!");

        var dbo = db.db('salam')

        dbo.collection("students").insertOne({f_name:"salam4", l_name:"salamow4", welayat:new ObjectId("62021b28c81c0c4bab590f1e")}, (error, docs)=>{
            console.log(error)
            console.log(docs)
            db.close((error)=>{

                console.log(error)
                console.log('DB Closed')
        
            });
        })
        

    })
}



app.use(morgan('dev'))

function connFunc(socket) {

    console.info(`Socket ${socket.id} has connected.`);

    socket.on("disconnect", () => {

        console.info(`Socket ${socket.id} has disconnected.`);

    });

    socket.emit("welcome", `Welcome! You are visitor number 3`);

    socket.on("insert", (msg)=>{

        console.info('INSERT', msg);
        insertMDB()

    });



}

app.use(express.static("public"));


io.on("connection", connFunc);

server.listen(3000, () => console.info(`Listening on port ${3000}.`));

setInterval(() => {

    io.emit("seconds", ' a secont ');

}, 1000);
