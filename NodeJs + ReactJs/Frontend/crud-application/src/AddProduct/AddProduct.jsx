import React from "react";
import Header from "../header/Header";
import Form from "../form/Form";
import "./style.css";
const AddProduct = () => {
  return (
    <>
      <Header />
      <div id="ml">
        <Form
          props={{
            tittle: "Save",
            name: "Back To  Product List",
            path: "/list",
            callBack: { id: "", Click: false },
          }}
        />
      </div>
    </>
  );
};

export default AddProduct;
