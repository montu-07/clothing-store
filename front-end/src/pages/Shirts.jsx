import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductList from "../components/ProductList";

const Shirts = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

const shirts = items.filter((p) => {
  const cat = p.category?.toLowerCase() || "";
  return cat.includes("shirt") && !cat.includes("t-shirt");
});


  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>Shirts</h2>
      <ProductList products={shirts} loading={status === "loading"} />
    </div>
  );
};

export default Shirts;
