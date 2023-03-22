const mongoose = require("mongoose");
const dotenv = require("dotenv");
const DB = process.env.DATABASE;
mongoose
  .connect(DB, {
  })
  .then(() => {
    console.log(`mongoDB connected Sucessfully`);
  })
  .catch(() => {
    console.log(`not connected`);
  });
