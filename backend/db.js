const mongoose = require('mongoose')

// const url = "mongodb+srv://rishiraj2812:rishiraj2812@cluster0.nqskxmo.mongodb.net/?retryWrites=true&w=majority";
const url = "mongodb+srv://rishiraj2812:rishiraj2812@cluster0.nqskxmo.mongodb.net/test?retryWrites=true&w=majority";

module.exports.connect = () => {
   mongoose
     .connect(process.env.mongoUrl)
     .then(() => console.log(" db connected succesfully"))
     .catch((err) => console.log("ERR: ",err));

};