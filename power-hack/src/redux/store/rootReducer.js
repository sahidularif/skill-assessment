import { combineReducers } from "@reduxjs/toolkit";
import authSlice from "../slice/auth.slice";
import messageSlice from "../slice/messages";
import billSlice from '../slice/billSlice'

const rootReducer = combineReducers({
    auth: authSlice,
    messages: messageSlice,
    amount: billSlice
})

export default rootReducer;