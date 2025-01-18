import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { courseData } from "../../../app/courseSlice";
import toast from "react-hot-toast";
import axios from "axios";

const user_api = "http://localhost:3000/api/v1/course/";

export const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: user_api,
    credentials: "include",
    tagTypes: ["CoursesLecture"],
  }),
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (inputData) => ({
        url: "courseCreate",
        method: "POST",
        body: inputData,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.message || "Course created successfully");
        } catch (error) {
          toast.error(error?.data?.message || "Course creation failed");
        }
      },
    }),

    getCreatorCourses: builder.query({
      query: () => ({
        url: "creatorCourse",
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(courseData(data)); // Correctly pass fetched data to the reducer
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Failed to load courses");
        }
      },
    }),
    courseDataUpdate: builder.mutation({
      query: ({ formData, courseId }) => ({
        url: `/courseEdit/${courseId}`,
        method: "PUT",
        body: formData,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          toast.success(result.data.message || "Course updated successfully!");
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Course update failed");
        }
      },
    }),
    getDatabyId: builder.query({
      query: (id) => ({
        url: `getCourseById/${id}`,
        method: "GET",
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Failed to load courses");
        }
      },
    }),
    CreateLecture: builder.mutation({
      query: ({ lectureTitle, courseId }) => ({
        url: `/lectureCreate/${courseId}`,
        method: "POST",
        body: { lectureTitle },
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          toast.success(data.message || "createLecture created successfully");
        } catch (error) {
          toast.error(error?.data?.message || "createLecture creation failed");
        }
      },
    }),
    getCourseLectureById: builder.query({
      query: (courseId) => ({
        url: `/lectureCreate/${courseId}`,
        method: "GET",
        providesTags: ["CoursesLecture"],
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data.courseLectureData.lectures);
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Failed to load courseLecture");
        }
      },
    }),
    courseLectureUpdate: builder.mutation({
      query: ({ payload, courseId }) => ({
        url: `lectureUpdate/${courseId}`,
        method: "PUT",
        body: payload,
      }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          toast.success(result.data.message || "Lecture updated successfully!");
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Lecture update failed");
        }
      },
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `courseDelete/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CoursesLecture"],
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
        } catch (error) {
          console.error(error);
          toast.error(error?.data?.message || "Failed to load courses");
        }
      },
    }),
    // videoUpload: builder.mutation({
    //   query: (file) => ({
    //     url: "videoUpload",
    //     method: "POST",
    //     body: file,
    //   }),
    //   async onQueryStarted(_, { queryFulfilled }) {
    //     try {
    //       const { data } = await queryFulfilled;
    //       toast.success(data.message || "videoUpload  successfully");
    //     } catch (error) {
    //       toast.error(error?.data?.message || "videoUpload creation failed");
    //     }
    //   },
    // }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
  useCourseDataUpdateMutation,
  useGetDatabyIdQuery,
  useCreateLectureMutation,
  useGetCourseLectureByIdQuery,
  useCourseLectureUpdateMutation,
  useDeleteCourseMutation,
  // useVideoUploadMutation,
} = courseApi;
