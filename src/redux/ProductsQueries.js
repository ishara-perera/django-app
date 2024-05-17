import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { toast } from "react-toastify";

// Function to get access token from local storage
const getAccessToken = () => {
    const authTokens = localStorage.getItem("authTokens");
    if (authTokens) {
      const tokens = JSON.parse(authTokens);
      return tokens.access; // Assuming the access token key is 'access_token'
    }
    return null;
};

export const useApiProductsSlice = createApi({
  reducerPath: "productReducer",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_DEV_URL }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/api/products",
      }),
      // transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Products"],
    }),

    getMyProducts: builder.query({
      query: () => ({
        url: "/api/products/get_my_products/",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
      providesTags: ["Products"],
    }),

    addProduct: builder.mutation({
      query: (product) => ({
        url: "/api/products/create/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    updateProduct: builder.mutation({
      query: (product) => ({
        url: `/api/products/${product.id}/update/`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: product,
      }),
      invalidatesTags: ["Products"],
    }),

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/api/products/${id}/delete/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: id,
      }),
      invalidatesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetMyProductsQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = useApiProductsSlice;
