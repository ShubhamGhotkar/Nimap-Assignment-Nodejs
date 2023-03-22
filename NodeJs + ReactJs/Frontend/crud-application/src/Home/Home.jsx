import React, { useState } from "react";
import Header from "../header/Header";
import BackBtn from "../component/BackBtn";
import "./home-style.css";
function Home() {
  const [inputValue, setInputValue] = useState({
    tittle: "",
    discription: "",
  });
  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };
  const handleClick = async () => {
    const { tittle, discription } = inputValue;
    if (!tittle) {
      return window.alert("Input Field must");
    } else {
      const res = await fetch("/add-category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tittle, discription }),
      });

      const data = await res.json();
      if (!data) {
        await window.alert("Failes To Add Category");
      } else {
        await window.alert("Category Added Sucessfully");
        setInputValue({ tittle: "", discription: "" });
      }
    }
  };
  return (
    <>
      <Header />
      <h3 style={{ margin: "3rem 16% ", fontWeight: 620 }}>Add Category</h3>
      <div id="home-container">
        <div id="home-tittle" className="comm-class">
          <label>Tittle * </label>
          <br />
          <input
            type="input"
            name="tittle"
            value={inputValue.tittle}
            placeholder="Write Tittle Here"
            onChange={handleChange}
          />
        </div>
        <div id="home-dis" className="comm-class">
          <label>Discription (Optional)</label>
          <br />
          <textarea
            placeholder="Describe category here..!"
            name="discription"
            value={inputValue.discription}
            onChange={handleChange}
          />
        </div>
        <button id="home-btn" onClick={handleClick}>Add Category</button>
      </div>
      <div style={{marginRight:"40vw",marginTop:"2rem"}}>
        <BackBtn props={{ name: "Go To Add Product", path: "/add-product" }} />
      </div>
    </>
  );
}

export default Home;
