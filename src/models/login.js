const mongoose=require("mongoose");
const Schema=mongoose.Schema
const LoginSchema= new Schema (
    {
       
       Username:String,
       Password:String,
       role:String
    }
    
)
const logindata=mongoose.model("login",LoginSchema)
module.exports=logindata;