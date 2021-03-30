const mongoose=require('mongoose');
const express = require("express");
const app = express();
const routes1=require("./routes/genres.js");
const routes3=require("./routes/movies.js");
const Joi=require("joi");
Joi.objectId=require("joi-objectid").length(Joi);


mongoose.connect("mongodb://localhost:27017/MoeTime",{ useNewUrlParser: true ,useUnifiedTopology: true})
.then(()=> console.log("connected to mongodb"))
.catch(err => console.error("couldn't to mongodb"));

app.use(express.json());
app.use("/api/genres",routes1);
app.use("/api/movies",routes3);


app.listen(3000, () => {
  console.log("listening to port 3000");
});
