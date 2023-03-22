import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
const BackBtn = ({ props }) => {
  return (
    <div class="inp-div">
      <Link to={props.path}>
        <button id="back-btn">&#x2190; {props.name}</button>
      </Link>
    </div>
  );
};

export default BackBtn;
