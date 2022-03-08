var express = require('express')
const productrouter=express.Router();
const productdata=require("../models/product")
const cartdata=require("../models/cart");
const logindata=require("../models/login");
const registerdata=require("../models/register");

productrouter.get('/home',(req,res)=>{
    productdata.find().then((item)=>{
console.log(item)
  

res.render("index",{
    item,
nav: [{ link: "/home", name: "HOME" },
{ link: "/register", name: "REGISTER" }
,
{ link: "/", name: "LOGOUT" },
{ link: "/show", name: "SHOWCART" }]
})
})
})

productrouter.get('/Admin', (req, res) => {
 productdata.find().then((item)=>{
    res.render("Admin",{
    item,
nav: [{ link: "/home", name: "HOME" },
{ link: "/register", name: "REGISTER" }
,
{ link: "/", name: "LOGOUT" }
,
{ link: "/additem", name: "ADD ITEM" }]
})
})

})

productrouter.get('/additem', (req, res) => {
    res.render("additem",{nav: [{ link: "/", name: "LOGOUT" }]})
})
productrouter.get('/', (req, res) => {
    res.render("login",{val:null})
})
productrouter.get('/register', (req, res) => {
    res.render("register")
})


productrouter.post('/register', (req, res) => {
    const logindetails={
        Username:req.body.Username,
        Password:req.body.Password,
        role:req.body.usertype
        }
        var logindetail=logindata(logindetails)
         logindetail.save().then((response)=>{
            const registerdetails={
                FirstName:req.body.FirstName,
               Lastname:req.body.Lastname,
               Email:req.body.Email,
               Contact:req.body.Contact,
              
            }
         })
            var registerdetail=registerdata(registerdetails)
            registerdetail.save().then((response)=>{
                
            
                console.log("successfully registerd" +response)
                  })
                  //res.redirect("register")
        
            console.log("successfully login" +response._id)
            
    
              res.redirect("/login")
    
    })
productrouter.post("/login",(req,res)=>{

logindata.findOne({Username:req.body.Username

            })
            .then((registerdetail) => {console.log(registerdetail)

                if(registerdetail.Password===req.body.Password)
                 if (registerdetail.role === "admin") {
                            res.redirect('/Admin')
                        } else {
                            res.redirect('/home')
                        }
                    
            }).catch((registerdetail)=>{
                res.render('login',{val:"User not exist"})
            })
            

})
productrouter.post("/add",(req,res)=>{
   const items={
    productName:req.body.productName,
    price:req.body.price,
    Image:req.body.Image
}
console.log(req.body)
  var pname= productdata(items)
  pname.save().then((response)=>{
console.log("successfully added" +response)
  })
  res.redirect("/")
})
productrouter.get('/singleview/:id',(req,res)=>{
    const id=req.params.id;
    productdata.findOne({_id:id}).then((item)=>{
        console.log(item)
        res.render("singleview",{item})

    })
     
    })
        productrouter.post('/show/:id',(req,res)=>{
        const id=req.params.id;
        const qty=req.body.qty;
        console.log(id)
        let total=1;
        productdata.findOne({_id:id}).then((item)=>{
            console.log(item.price +" qty: "+ qty)
            total=item.price*qty;
            
            const items={
                prd_id:id,
                qty:qty,
                total:total
            }
           console.log(items);
           var cdata=cartdata(items)
           cdata.save();
           res.redirect('/show');
        })
        
         })
         
         productrouter.get("/edit/:id", (req, res) => {
             const id = req.params.id;
    productdata.findOne({
            _id: id
        })
        .then((item) => {
            
    
               res.render("edit",{item})
})
})
    productrouter.post('/update/:id', function(req, res) {
    const id = req.params.id;
     var item = {
        productName: req.body.productName,
        price: req.body.price,
        Image: req.body.Image
    }
   console.log(item);
    productdata.findByIdAndUpdate({
                _id: id
            },item)
        .then((response) => {console.log(response);
            res.redirect('/Admin')

        })
})

productrouter.post('/delete/:id', function(req, res) {
    const id = req.params.id;
    var item = {
        productName: req.body.name,
        price: req.body.price,

        Image: req.body.Image
    }
    
    productdata.findByIdAndDelete({
                _id: id
            },
            item)
        .then((item) => {

            res.redirect('/Admin')

        })

})





productrouter.get("/show",(req,res)=>{
//cartdata.find().then((items)=>{
    // console.log(items)
//    productdata.findOne({_id:items.prd_id}).then((totalitems)=>{console.log(totalitems);
   
cartdata.aggregate([
    { $lookup:
       {
         from: 'products',
         localField: 'prd_id',
         foreignField: '_id',
         as: 'productdetails'
       }
     }]).then((details)=>{
         console.log(JSON.stringify(details));
    res.render("showcart",{details})
     })

})
//})

    

module.exports=productrouter;