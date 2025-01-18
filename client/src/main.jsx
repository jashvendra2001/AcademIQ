import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store, persistor } from "../app/store";
import { Toaster } from "react-hot-toast";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import Login from "./pages/Login";
import Home from "./pages/home/Home";
import MyLearning from "./pages/home/MyLearning";
import Myprofile from "./pages/home/Myprofile";
import { PersistGate } from "redux-persist/integration/react";
import Dashboard from "./pages/admin/dashboard/Dashboard";
import Addcourse from "./pages/admin/course/Addcourse";
import Course from "./pages/admin/course/Course";
import CreateNewCourse from "./pages/admin/course/CreateNewCourse";
import CourseEditpage from "./pages/admin/course/CourseEditpage";
import LectureCreate from "./pages/admin/lecture/LectureCreate";
import EditLecture from "./pages/admin/lecture/EditLecture";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/MyLearning",
        element: <MyLearning />,
      },
      {
        path: "Myprofile",
        element: <Myprofile />,
      },
      {
        path: "Admin",
        element: <Addcourse />,
        children: [
          {
            path: "Admin/Dashboard",
            element: <Dashboard />,
          },
          {
            path: "Admin/Course",
            element: <Course />,
          },
          {
            path: "Admin/CreateCourse",
            element: <CreateNewCourse />,
          },
          {
            path: "Admin/course/:id",
            element: <CourseEditpage />,
          },
          {
            path: "Admin/lectureCourse/:id",
            element: <LectureCreate />,
          },
          {
            path: "Admin/EditLecture/:id/:courseId",
            element: <EditLecture />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={appRouter} />
      </PersistGate>
      <Toaster position="top-right" reverseOrder={false} />
    </Provider>
  </StrictMode>
);
