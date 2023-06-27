const express=require('express');
const path=require('path');
const data=require("./models/login");
const ejs=require("ejs");
const mongoose=require('mongoose');
const Register=require("./models/validate.js");
require("./db/connect-db");

const app=express();
app.use(express.json());
const static_path=path.join(__dirname,"../public");
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine","ejs");
let users="";

app.get("/",(req,res)=>{
res.render("index");
})
app.post("/index",async(req,res)=>{
try {
  const id=req.body.Id;
  const password=req.body.pswd;
  const verify=await data.findOne({id:id});
   if(verify!=null){
    if(verify.id=='customer1'&&verify.password==password){
      users="customer1"
      res.redirect("/validation");
    }
    else if(verify.id=='customer2'&&verify.password==password){
      users="customer2"
      res.redirect("/validation");
    }
    else if(verify.id=='admin'&&verify.password==password){
      res.redirect("/admin");
    }
    else{
      res.send("Wrong details")
    }
   }
   else{
    res.send("Wrong details");
   }
} catch (error) {
  console.log(error);
}
})
app.get("/validation",(req,res)=>{
  res.render("validation");
})
app.post("/validation",async(req,res)=>{
  try {
    const user=new Register({
      user : users,
      date : req.body.date,
      comapny : req.body.company,
      owner : req.body.owner,
      item : req.body.item,
      quantity : req.body.quantity,
      weight : req.body.weight,
      request : req.body.request,
      tid : req.body.tid,
      shipment :req.body.shipment,
      box : req.body.box,
      specification : req.body.specification,
      checklist : req.body.checklist,
    })
    const register=await user.save();
    res.send("Details saved");
  } catch (error) {
    console.log(error);
  }
})

app.get("/admin",async(req,res)=>{
  try {
    const obj1=await Register.find({user:"customer1"})
    const obj2=await Register.find({user:"customer2"})
    let s1q=0;let s2q=0;let s1b=0;let s1w=0;let s2b=0;let s2w=0;
    let cus1={};let cus2={};let total={};
    for(let i=0;i<obj1.length;i++){
      s1q=s1q+parseInt(obj1[i].quantity);
      s1b=s1b+parseInt(obj1[i].box);
      s1w=s1w+parseInt(obj1[i].weight);
    }
    for(let i=0;i<obj2.length;i++){
      s2q=s2q+parseInt(obj2[i].quantity);
      s2b=s2b+parseInt(obj2[i].box);
      s2w=s2w+parseInt(obj2[i].weight);
    }
    cus1.quantity=s1q;cus1.box=s1b;cus1.weight=s1w;
    cus2.quantity=s2q;cus2.box=s2b;cus2.weight=s2w;
    total.quantity=s1q+s2q;total.box=s1b+s2b;total.weight=s1w+s2w;   
    res.render("admin",{detail1:cus1,detail2:cus2,detail3:total});
    
  } catch (error) {
    console.log(error);
  }
})


app.listen(5000,()=>{
  console.log('listening');
})