import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductList from "../components/ProductList";

const TShirts = () => {
  const dispatch = useDispatch();
  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    if (!items.length) {
      dispatch(fetchProducts());
    }
  }, [dispatch, items.length]);

  const tShirts = items.filter((p) => {
    const cat = p.category?.toLowerCase() || "";
    return cat.includes("t-shirt") || cat.includes("tshirts") || cat.includes("t shirt");
  });


  return (
    <div>
      <h2 style={{ textAlign: "center", margin: "20px 0" }}>T-Shirts</h2>
      <ProductList products={tShirts} loading={status === "loading"} />
    </div>
  );
};

export default TShirts;
