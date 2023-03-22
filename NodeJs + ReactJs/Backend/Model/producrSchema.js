const mongoose = require("mongoose");

// const categorySchema = mongoose.Schema({
//   tittle: {
//     type: String,
//     required: false,
//   },
//   discription: {
//     type: String,
//     required: false,
//   },
// });

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  category: {
    type:Object
    // type: mongoose.Schema.Types.ObjectId, ref: 'categoryData', required: true 
  },
});

const Product = mongoose.model("productData", productSchema);
// const Category = mongoose.model("categoryData", categorySchema);

module.exports = Product;
// module.exports = Category;
