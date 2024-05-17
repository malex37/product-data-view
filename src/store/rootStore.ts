import { configureStore } from "@reduxjs/toolkit";
import productStore from "./productStore";

export default configureStore({
  reducer: {
    products: productStore,
  }
});
