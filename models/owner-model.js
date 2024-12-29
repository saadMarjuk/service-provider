const mongoose= require("mongoose");

 const ownerSchema=mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    service:{
        type:Array,
        default:[]
    },

    picture:String,
    gstin:String



 });

    
 module.exports=mongoose.model('Owner',ownerSchema);
 