//jshint esversion:6


const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const date = require(__dirname + "/date.js");


//console.log(date());

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(__dirname + "/public"));

app.set('view engine', 'ejs');

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.get("/", function(req, res) {


  let day = date.getDate();

  res.render("list", {
    listTitle: day,
    newListItems : items
  });

});

app.post("/",function(req,res){

let item = req.body.newItem;

if (req.body.list === "Work"){

  workItems.push(item);
  res.redirect("/work");

}else{

items.push(item);
console.log(req.body.newItem);
res.redirect("/");
}





});

app.get("/work",function(req,res){
 res.render("list",{listTitle : "Work List", newListItems: workItems});


});

app.post("/work",function(req,res){


let item = req.body.newItem;
workItems.push(item);
res.redirect("/work");


});

app.get("/about",function(req,res){

res.render("about");

});


app.listen(process.env.PORT || 3000, function() {

  console.log("Server is running on port 3000");

});
