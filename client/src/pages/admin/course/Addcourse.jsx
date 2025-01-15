import React from "react";
import { Link, Outlet } from "react-router-dom";

const Addcourse = () => {
  return (
    <div>
      <div className="Addcourse    flex gap-3 max-w-7xl mx-auto">
        <div className="cover   h-screen px-10 py-3 bg-gray-200">
          <Link to="Admin/Dashboard">
            <h1 className="font-bold space-y-3">Dashboard</h1>
          </Link>
          <Link to="Admin/Course">
            <h1 className="font-bold ">Courses</h1>
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default Addcourse;
