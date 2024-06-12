import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
  };

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers: {
        signin: (state,action)=>{
            state.currentUser = action.payload;
        }
    }
});
export const {signin} = authSlice.actions;
export default authSlice.reducer;