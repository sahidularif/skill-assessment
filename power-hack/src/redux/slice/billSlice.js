import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amount: 0,
};

const billSlice = createSlice({
  name: "amount",
  initialState,
  reducers: {
    increamentByAmount: (state, action) => {
      return { amount: state.amount += action.payload };
    },
    decreamentByAmount: () => {
        return { amount: state.amount -= action.payload };
    },
  },
});

export const { increamentByAmount, decreamentByAmount } = billSlice.actions;
export default billSlice.reducer;