import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import orebiReducer from "./orebiSlice";
import { useApiProductsSlice } from "./ProductsQueries";
import { productSlice } from "./productSlice";
import { useApiOrdersSlice } from "./OrdersQueries";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, orebiReducer);

export const store = configureStore({
  reducer: {
    orebiReducer: persistedReducer,
    product: productSlice.reducer,
    [useApiProductsSlice.reducerPath]: useApiProductsSlice.reducer,
    [useApiOrdersSlice.reducerPath]: useApiOrdersSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      useApiProductsSlice.middleware, 
      useApiOrdersSlice.middleware
    ),
});

export let persistor = persistStore(store);
