const e = require("express");
const express = require("express");
const math=require("mathjs");
const app = express();


const { initializeApp , cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
var serviceAccount = require("./key.json");
initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();
db.settings({ignoreUndefinedProperties:true})
app.set("view engine","ejs");
app.use(express.static('public'));
app.get('/', function (req, res) {  
  res.send("hello");
}) ;
app.get('/login', (req, res) =>{  
  res.render("login");  
}) ;
app.get('/signup', (req, res) =>{  
  res.render("signup");  
}) ;
app.get('/home', (req, res) =>{  
  res.render("home");  
}) ;
app.get('/shop', (req, res) =>{  
  res.render("shop");  
}) ;

app.get('/loginsubmit', (req, res) =>{  
    const Email = req.query.Email;
    const Password = req.query.Password;
    db.collection("users")
    .where("Email", "==", Email)
    .where("Password", "==", Password)
    .get()
    .then((docs) => {
      if(docs.size > 0){
        res.render("home");
      }
      else{
        res.send("Login unsuccessful");
      }
      });
}) ;
app.get('/signupsubmit', (req, res) =>{  
  const Name = req.query.Name;
  const Email = req.query.Email;
  const Password = req.query.Password;
  const ReqPassword = req.query.ReqPassword;
  db.collection("users").add({
    Name : Name,
    Email : Email,
    Password : Password,
    ReqPassword : ReqPassword
})
  .then(() => {res.render("home")});
});
app.use(express.static('public'));

const arr=[];
const costs=[];
var amount=0;
app.get("/lipstick",(req,res)=>{
  const val=req.query.item;
  var c=req.query.cost;
  costs.push(c);
  if(isNaN(c)){
    c=0;
}
  c = parseInt(c);
  amount=amount+c;
  arr.push(val);
  res.render("lipstick");
});

app.get("/eyeliner",(req,res)=>{
  const val=req.query.item;
  var c=req.query.cost;
  costs.push(c);
  if(isNaN(c)){
    c=0;
}
  c = parseInt(c);
  amount=amount+c;
  arr.push(val);
  res.render("eyeliner");
});


app.get("/nailpolish",(req,res)=>{
  const val=req.query.item;
  var c=req.query.cost;
  costs.push(c);
  if(isNaN(c)){
    c=0;
}
  c = parseInt(c);
  amount=amount+c;
  arr.push(val);
  res.render("nailpolish");
});


app.get("/blenders",(req,res)=>{
  const val=req.query.item;
  var c=req.query.cost;
  costs.push(c);
  if(isNaN(c)){
    c=0;
}
  c = parseInt(c);
  amount=amount+c;
  arr.push(val);
  res.render("blenders");
});


app.get("/powders",(req,res)=>{
  const val=req.query.item;
  var c=req.query.cost;
  costs.push(c);
  if(isNaN(c)){
    c=0;
}
  c = parseInt(c);
  amount=amount+c;
  arr.push(val);
  res.render("powders");
});



app.get("/cart",(req,res)=>{
  if(typeof(arr) != "undefined"){
    db.collection("Abc").add({
      Cart : arr,
      Costs : costs,
      TotalCost : amount,
    }).then(()=>{
      res.render("cart",{Data : arr, amount : amount, costs : costs});
    });
  }
});
app.listen(4000, function () {  
console.log('Example app listening on port 4000!')  
});
