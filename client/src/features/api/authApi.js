import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLogin, userLogOut } from "../../../app/authSlice";
import toast from "react-hot-toast";

const user_api = "http://localhost:3000/api/v1/user/";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: user_api,
    credentials: "include", // This ensures credentials (cookies) are included in requests
  }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (inputData) => ({
        url: "register",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          toast(result.data.message);
          dispatch(userLogin({ user: result.data.registerUser }));
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Registration failed");
        }
      },
    }),

    logoutUser: builder.query({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(userLogOut());
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Logout failed");
        }
      },
    }),

    loginUser: builder.mutation({
      query: (inputData) => ({
        url: "login",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result?.data?.message);
          toast.success(result?.data?.message);
          dispatch(userLogin(result?.data?.user));
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Login failed");
        }
      },
    }),

    // Ensure credentials are included when fetching the user profile
    UserProfile: builder.query({
      query: () => ({
        url: "userget",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Fetching user profile failed");
        }
      },
    }),
    ProfileUpdate: builder.mutation({
      query: (inputData) => ({
        url: "/profile/profileUpdate",
        method: "PUT",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(userDataStore(result));
          toast.success(result.message);
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Login failed");
        }
      },
    }),
    UserLogout: builder.mutation({
      query: () => ({
        url: "logout",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(userLogOut(result));
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Fetching user profile failed");
        }
      },
    }),

    userMailSendLogin: builder.mutation({
      query: (inputData) => ({
        url: "/profile/profileUpdate",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          console.log(result);
          dispatch(userDataStore(result));
          toast.success(result.message);
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Login failed");
        }
      },
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useUserMailSendLoginMutation,
  useLoginUserMutation,
  useUserProfileQuery,
  useProfileUpdateMutation,
  useUserLogoutMutation, // Ensure this hook is used in your component
} = authApi;
