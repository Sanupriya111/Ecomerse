const mongoose=require("mongoose");
const Schema=mongoose.Schema
const RegisterSchema= new Schema (
    {
        login_id:{type:Schema.Types.ObjectId,ref:"login"},
       FirstName:String,
       Lastname:String,
       Email:String,
       Contact:String
       
    }
    
)
const registerdata=mongoose.model("register",RegisterSchema)
module.exports=registerdata;