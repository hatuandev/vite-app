import { combineReducers } from "@reduxjs/toolkit";
import counterSlices from "./counterSlice";
import sidebarSlice from "./sidebarSlice";
import tableDrawerSlice from "./tableDrawerSlice";
import customerSlice from "./customerSlice";

export const rootReducer = combineReducers({
  counter: counterSlices,
  sidebar: sidebarSlice,
  tableDrawer: tableDrawerSlice,
  customer: customerSlice, 
})