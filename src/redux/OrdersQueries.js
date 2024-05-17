import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Function to get access token from local storage
const getAccessToken = () => {
    const authTokens = localStorage.getItem("authTokens");
    if (authTokens) {
      const tokens = JSON.parse(authTokens);
      return tokens.access; // Assuming the access token key is 'access_token'
    }
    return null;
};

export const useApiOrdersSlice = createApi({
  reducerPath: "orderReducer",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_DEV_URL }),
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: () => ({
        url: "/api/orders",
      }),
      // transformResponse: (res) => res.sort((a, b) => b.id - a.id),
      providesTags: ["Orders"],
    }),

    getMyOrders: builder.query({
      query: () => ({
        url: "/api/orders/get_my_orders/",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }),
      providesTags: ["Orders"],
    }),

    addOrder: builder.mutation({
      query: (order) => ({
        url: "/api/orders/create/",
        method: "POST",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),

    updateOrder: builder.mutation({
      query: (order) => ({
        url: `/api/orders/${order.id}/update/`,
        method: "PUT",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: order,
      }),
      invalidatesTags: ["Orders"],
    }),

    deleteOrder: builder.mutation({
      query: (id) => ({
        url: `/api/orders/${id}/delete/`,
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
        body: id,
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useGetMyOrdersQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = useApiOrdersSlice;
