const mongoose=require("mongoose");
const idschema=new mongoose.Schema({
      user : {type:String},
      date : {type : String },
      comapny : {type : String },
      owner : {type : String },
      item : {type : String },
      quantity : {type : String },
      weight : {type : String },
      request : {type : String },
      tid : {type : String },
      shipment :{type : String },
      box : {type : String },
      specification : {type : String },
      checklist : {type : String },
   
})
const Notes=new mongoose.model("user",idschema);
module.exports=Notes;