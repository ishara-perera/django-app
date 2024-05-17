import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  EditProduct: {},
  EditOrder: {},
};

export const productSlice = createSlice({
  name: "EditProduct",
  initialState,
  reducers: {
    setProductToEdit: (state, action) => {
      state.EditProduct = action.payload;
    },
    setOrderToEdit: (state, action) => {
      state.EditOrder = action.payload;
    },
  },
});

export const { setProductToEdit, setOrderToEdit } = productSlice.actions;
export default productSlice.reducer;
