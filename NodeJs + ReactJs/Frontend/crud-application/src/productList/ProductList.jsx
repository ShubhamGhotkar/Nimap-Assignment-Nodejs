import React, { useEffect, useState, useRef } from "react";
import Header from "../header/Header";
import Form from "../form/Form";
import List from "../list/List";
import ReactPaginate from "react-paginate";
import "./style.css";
const ProductList = () => {
  const [callBack, setCallBack] = useState({ id: "", Click: false });
  const [data, setData] = useState([]);

  const [limit] = useState(10);
  const [pageCount, setPageCount] = useState(1);

  const currentPage = useRef();

  useEffect(() => {
    currentPage.current = 1;
    // getPaginatedProduct();
  }, []);
  useEffect(() => {
    getPaginatedProduct();
  }, [data, handlePageClick]);

  function handlePageClick(e) {
    currentPage.current = e.selected + 1;
  }
  function getPaginatedProduct() {
    fetch(`/paginatedProduct?page=${currentPage.current}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data.result);
        setPageCount(data.pageCount);
      });
  }
  return (
    <div className="table-container">
      <Header props="CRUD operations" />
      <div className="tab-container">
        <table class="table">
          <thead class="thead-dark">
            <tr id="tr">
              <th>Sr No</th>
              <th>Product Name</th>
              <th>Product ID</th>
              <th>Total Items</th>
              <th>Category Name</th>
              <th>Category Id</th>
              <th>Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            <List
              id="list-comp"
              setCallBack={setCallBack}
              callBack={callBack}
              data={data}
              getPaginatedProduct={getPaginatedProduct}
            />
          </tbody>
        </table>
        <Form
          id="form-id"
          props={{
            tittle: "Update",
            callBack: callBack,
            name: "Back To Add Product",
            path: "/add-product",
            setData: setData,
          }}
        />
      </div>
      <div id="pagination">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          marginPagesDisplayed={2}
          containerClassName="pagination justify-content-center"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          activeClassName="active"
        />
      </div>
    </div>
  );
};

export default ProductList;
