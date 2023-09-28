require("dotenv").config({
    path : "./config/config.env"
})
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const app = express()
const db = require("./db")
const PORT = process.env.PORT || 80
const router = require("./routers")
// db connections

db.connect();

//midddleware
app.use(bodyParser.json({ limit: "500mb" }))
app.use(bodyParser.urlencoded({ extended: true,limit:"500mb"}))

app.use(express.json())

//headers
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","*");
    next()
})

//api
app.use("/api" , router)
//static resources
app.use("/upload",express.static(path.join(__dirname,"/../uploads")))
app.use(express.static(path.join(__dirname,"/../frontend/build")))

app.get("/",(req,res) => {
    res.json("hello");
}
app.get("*",(req,res) => {

    try{
        res.sendFile(path.join(`${__dirname}/../frontend/build/index.html`))
    } catch(e) {
        res.send("oops! error occered")
    }

})

//cors
app.use(cors(
    {
         origin: ["https://socialguide-frontend.vercel.app"],
         method: ["POST","GET"],
         credentials: true
    }
    
));


//server listen
app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})
