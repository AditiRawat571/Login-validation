const mongoose=require("mongoose");
const idschema=new mongoose.Schema({
    id :{
        type:String,
        required:true
    },
    password :{
        type:String,
        required:true
    }
   
})
const Notes=new mongoose.model("Id",idschema);
module.exports=Notes;