import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/slices/productSlice";
import ProductList from "../components/ProductList";
import { Box, Grid } from "@mui/material";


const NewArrivals = () => {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // const newArrivalProducts = items.filter(
  //   (p) => p.category.toLowerCase() === "new arrivals"
  // );

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;

  return (
    <Box
      sx={{
        minHeight: "100vh",
        py: 6,
        px: 3,
        background: "linear-gradient(to right, #ffecd2, #fcb69f)",
      }}
    >

      
        <Grid container spacing={4} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} lg={3}>
              <ProductList products={items} />
            </Grid>
         
        </Grid>

    </Box>
  );
};

export default NewArrivals;
