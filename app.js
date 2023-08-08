const mongoose=require('mongoose');
const express = require("express");
const app = express();
const routes1=require("./routes/genres.js");
const routes2=require("./routes/customers.js");
const routes3=require("./routes/movies.js");
const routes4=require("./routes/rentals");
const routes5=require("./routes/users");
const routes6=require("./routes/auth");
const Joi=require("joi");
// Joi.objectId=require("joi-objectid").length(Joi);


mongoose.connect("mongodb://127.0.0.1:27017/MovieTime",{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=> console.log("connected to mongodb"))
.catch(err => console.error("couldn't connect to mongodb"));

app.use(express.json());
app.use("/api/genres",routes1);
app.use("/api/customers",routes2);
app.use("/api/movies",routes3);
app.use("/api/rentals",routes4);
app.use("/api/users",routes5);
app.use("/api/auth",routes6);


app.listen(3000, () => {
  console.log("listening to port 3000");
});
