import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  courseData: [],
};
const courseSlice = createSlice({
  name: "CourseSlice",
  initialState,
  reducers: {
    courseData: (state, action) => {
      state.courseData = action.payload;
    },
  },
});

export const { courseData } = courseSlice.actions;

export default courseSlice.reducer;
