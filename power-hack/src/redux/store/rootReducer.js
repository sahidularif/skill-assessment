import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/auth.slice";
import messageSlice from "../slice/messages";
// import messages from "../slice/messages";

const rootReducer = combineReducers({
    auth: authSlice,
    messages: messageSlice
})

export default rootReducer;