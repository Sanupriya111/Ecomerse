var express = require('express')
const mongoose=require("mongoose");
var app = express();
var prouter=require('./src/routers/product')

mongoose.connect("mongodb+srv://sanubijin:sanubijinyash@cluster0.wj2bk.mongodb.net/Ecomerse?retryWrites=true&w=majority",()=>{console.log("db connected")})
app.use(express.json())

app.use(express.static('./public'));//static file
app.use(express.urlencoded({extended:true})) //middle wear

app.set('view engine', 'ejs');
app.set('views', __dirname + "/src/views")//files directory

app.use('/',prouter)
app.listen(3400, () => {
    console.log("server is listening to port :3400");
})