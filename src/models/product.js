const mongoose=require("mongoose");

// mongoose.connect("mongodb+srv://sanupriya:sanubijinyash@cluster0.jecxu.mongodb.net/Ecomerse?retryWrites=true&w=majority",
// mongoose.connect("mongodb+srv://sanupriya:sanubijinyash@cluster0.jecxu.mongodb.net/FruitsNodejsDB?retryWrites=true&w=majority")   
//  .then(() => console.log("Database connected!"))
//  .catch(err => console.log(err));


const Schema=mongoose.Schema
const productSchema= new Schema (
    {
        productName:String,
        price:Number,
        Image:String
    }
    
)
const productdata=mongoose.model("product",productSchema)
module.exports=productdata;