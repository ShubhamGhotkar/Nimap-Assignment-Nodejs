import React, { useEffect, useState } from "react";
import BackBtn from "../component/BackBtn";
import "./style.css";
const Form = ({ props }) => {
  const { tittle, callBack, name, path, getPaginatedProduct } = props;
  const { id, click } = callBack;
  const [category, setCategory] = useState([]);
  const [inputData, setInputData] = useState({
    name: "",
    value: "",
    category: {
      id: "",
      category: "",
    },
  });

  useEffect(() => {
    fetch("/category")
      .then((res) => res.json())
      .then((data) => setCategory(data));
  }, []);

  /* Handle Change */
  const handleChange = (e) => {
    setInputData({ ...inputData, [e.target.name]: e.target.value });
  };

  /* Handle Data */
  const handleAddData = async (e) => {
    e.preventDefault();
    let { name, value, category } = inputData;
    console.log(category);
    if (!name || !value || !category.category || !category.id) {
      window.alert("Input Field Must Required");
    } else {
      const res = await fetch("/add-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, value, category }),
      });

      const data = await res.json();
      if (!data) {
        window.alert("Failed to add Product");
      } else {
        window.alert("Product Added Sucessfully");
        console.log("Product Added Sucessfully");
        setInputData({ name: "", value: "", category: "" });
      }
    }
  };

  /* UseEffect for updating Data As per User Click On Edit Button */

  useEffect(() => {
    handleUpdateData();
  }, [click]);

  /* First Find Out Data By Id And Update it on Input Section*/

  const handleUpdateData = async () => {
    const { name, value } = inputData;
    const res = await fetch(`/update/${id}`, {
      method: "Put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, value }),
    });

    const data = await res.json();
    setInputData({ name: data.name, value: data.value });
    // getPaginatedProduct();
  };

  const UpdateData = async () => {
    const { name, value, category } = inputData;

    // here we will add the value and name Of the Product So that when User Click on the Edit Button it Will remains In Table Field;

    console.log(inputData);
    if (!name || !value) {
      window.alert("Fill Input Field ");
    } else {
      const res = await fetch(`/update/${id}`, {
        method: "Put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, value, category }),
      });

      const data = await res.json();

      setTimeout(() => {
        if (data) {
          window.alert("Product Update Sucessfully");
          setInputData({ name: "", value: "", id: "", category: "" });
        } else {
          window.alert("Failed to Update");
        }
      }, 380);
    }
  };

  const HandleDropdown = (e) => {
    const option = category.find((val) => val.tittle === e.target.value);
    let obj = {
      id: option._id || "",
      category: option.tittle || "",
    };
    setInputData({ ...inputData, [e.target.name]: obj });
  };

  return (
    <div id="inp-container">
      <h2>Product Master</h2>
      <div class="inp-div">
        {tittle === "Save" && (
          <div class="label-div">
            <label for="product-cat">Product Category : </label>
          </div>
        )}
        {tittle === "Save" && (
          <select
            name="category"
            value={inputData.category.category}
            id={inputData.category.id}
            onChange={HandleDropdown}
          >
            <option value="" id="" name="">
              Choose Product Category
            </option>
            {category.map((val) => {
              return (
                <option value={val.tittle} id={val._id} name={val._id}>
                  {val.tittle}
                </option>
              );
            })}
          </select>
        )}
      </div>
      <div class="inp-div">
        <div class="label-div">
          <label for="product-name">Product Name : </label>
        </div>
        <input
          type="text"
          name="name"
          onChange={handleChange}
          id="product-name"
          value={inputData.name}
          placeholder="Enter Product Name"
        />
      </div>
      <div class="inp-div">
        <div class="label-div">
          <label for="product-itm">Total Items : </label>
        </div>
        <input
          type="number"
          min="1"
          onChange={handleChange}
          name="value"
          value={inputData.value}
          placeholder="Total Product Quantity"
          id="product-itm"
        />
      </div>
      <div class="inp-div">
        <button
          id="save-btn"
          type="button"
          onClick={tittle === "Save" ? handleAddData : UpdateData}
        >
          {tittle}
        </button>
      </div>
      <div >
      <BackBtn props={{ name: name, path: path }} />
      <BackBtn props={{ name: "Back TO ADD Category", path: "/" }} />
      </div>
    </div>
  );
};

export default Form;
