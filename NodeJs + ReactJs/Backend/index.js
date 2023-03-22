const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

dotenv.config({ path: "./config.env" });

require("./DB/connection");
app.use(express.json());
const User = require("./Model/producrSchema");

app.use(require("./Router/auth"));

// if(process.env.NODE_ENV === "production"){
//   app.use(express.static(path.join("/Frontend/crud-application/build")))
//   app.get("*",(req,res)=>res.sendFile(path.resolve(__dirname,"Frontend","crud-application","build","index.html")))
// }

app.listen(5000, () => {
  "connected sucessfully";
});
