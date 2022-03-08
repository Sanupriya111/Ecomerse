const mongoose=require("mongoose");
const Schema=mongoose.Schema
const cartSchema= new Schema (
    {
        prd_id:{type:Schema.Types.ObjectId,ref:"product"},//database
        qty:Number,
        total:Number
    }
    
)
const cartdata=mongoose.model("cart",cartSchema)
module.exports=cartdata;