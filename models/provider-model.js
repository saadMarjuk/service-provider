const mongoose= require("mongoose");

 const providerSchema=mongoose.Schema({
   image:String,
   name:String,
   price:Number,
   discount:{
    type:Number,
    default:0
   },
   personName:String,
   area:String,
   description:String

 });
 module.exports=mongoose.model("provider",providerSchema);
 