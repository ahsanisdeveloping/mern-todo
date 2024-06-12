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
        },
        signout: (state,action)=>{
            state.currentUser = null;
        }
    }
});
export const {signin,signout} = authSlice.actions;
export default authSlice.reducer;