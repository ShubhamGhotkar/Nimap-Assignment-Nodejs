const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  tittle: {
    type: String,
    required: false,
  },
  discription: {
    type: String,
    required: false,
  },
});


const Category = mongoose.model("categoryData", categorySchema);

module.exports = Category;