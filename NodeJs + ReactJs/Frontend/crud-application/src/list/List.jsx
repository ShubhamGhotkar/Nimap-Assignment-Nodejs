import React, { useEffect, useState } from "react";
import "./style.css";
const List = ({ setCallBack, callBack, data }) => {
  const handleDelete = async (id) => {
    let res = await fetch(`/delete/${id}`, {
      method: "Delete",
    });

    res = res.json();

    setTimeout(() => {
      if (res) {
        window.alert("Product Remove Sucessfully");
      }
    }, 480);
  };

  const handleEdit = (id) => {
    setCallBack({ id: id, click: !callBack.click });
  };
  return (
    <>
      {data.map((val, ind) => {
        const { name, value, category } = val;

        return (
          <tr key={ind}>
            <th id="F-th">{ind + 1}</th>
            <th>{name}</th>
            <th>{val._id}</th>
            <th>{value}</th>
            <th>{category.category}</th>
            <th>{category.id}</th>
            <th>
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  handleEdit(val._id);
                }}
              >
                Edit
              </button>
              <button className="btn" onClick={() => handleDelete(val._id)}>
                Delete
              </button>
            </th>
          </tr>
        );
      })}
    </>
  );
};

export default List;
