const express = require("express");
const router = express.Router();
require("../DB/connection");


const Product = require("../Model/producrSchema");
const Category = require("../Model/CategorySchema");


router.get('/paginatedProduct',async (req,res)=>{
  const AllProduct = await Product.find()
  const page =parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startInd = (page-1)*limit
  const lastInd = (page)*limit

  const results = {}
  results.allProduct = AllProduct.length
  results.pageCount = Math.ceil(AllProduct.length/limit)

  if(lastInd<AllProduct.length){
    results.next ={
      page:page+1
    }
  }
  if(startInd>0){
    results.prev ={
      page:page-1
    }
  }

  results.result = AllProduct.slice(startInd,lastInd)
  res.json(results)

})

router.post("/add-data", async (req, res) => {
  const { name, value, category} = req.body;

  console.log(req.body);

  if (!name || !value  ) {
    return res.status(422).json({ error: `Input Field Required` });
  }

  try {
  const product = new Product({ name, value, category,});

    await product.save();
    res.status(201).json({ message: `Product Added SucessFully` });
  } catch (err) {
    res.status(400).json({ message: `Failed To Add Product` });
    console.log(err);
  }

});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  Product.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send(`cannot Delete Product with ${id} Product Not Found`);
      } else {
        res.send({ message: "Product was deleted Sucessfully" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({
          message:
            err.message || `Error Occur while Deleting the Product ${id}`,
        });
    });
});

router.put("/update/:id", (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Data to Update Cannot Be Empty" });
  }

  const id = req.params.id;

  Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(400)
          .send(`cannot Update Product with ${id}. Product Not Found`);
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error Occur while Updating the Product" });
    });
});

// Category 

router.post("/add-category", async (req, res) => {
  const { tittle, discription } = req.body;
  if (!tittle || !discription) {
    return res.status(422).json({ error: `Input Field Required` });
  }

  try {
    const newCategory = new Category({ tittle, discription });

    await newCategory.save();
    res.status(201).json({ message: `Category Added SucessFully` });
  } catch (err) {
    res.status(400).json({ message: `Failed To Add Category` });
    console.log(err);
  }
});


router.get("/category", (req, res) => {
    Category.find()
      .then((user) => res.send(user))
      .catch((err) =>
        res
          .status(500)
          .send({ message: err.message || "Error occur in Find Method" })
      );

});
module.exports = router;

