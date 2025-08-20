import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, { payload }) => {
      state.push({ ...payload, quantity: 1 });
    },
    incrementQuantity: (state, { payload }) => {
      const item = state.find(p => p.id === payload);
      if (item) item.quantity += 1;
    },
    decrementQuantity: (state, { payload }) => {
      const item = state.find(p => p.id === payload);
      if (item) item.quantity = Math.max(item.quantity - 1, 1);
    },
    removeFromCart: (state, { payload }) => state.filter(p => p.id !== payload),
    clearCart: () => []
  },
  updateQuantity: (state, action) => {
    const { id, quantity } = action.payload;
    const item = state.items.find((i) => i.id === id);
    if (item && quantity > 0) {
      item.quantity = quantity;
    } else if (item && quantity <= 0) {
      // agar 0 ya negative ho gaya to remove kar do
      state.items = state.items.filter((i) => i.id !== id);
    }
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  updateQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
