import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useCreateCourseMutation,
  useGetCreatorCoursesQuery,
} from "@/features/api/courseApi";

const CreateNewCourse = () => {
  const [selectedOption, setSelectedOption] = useState("Select Options");
  const [inputData, setInputData] = useState({
    courseTitle: "",
  });
  const { data, isSuccess, isLoading, isError, error, refetch } =
    useGetCreatorCoursesQuery();

  const [createCourse, { isLoading: createCourseLoading }] =
    useCreateCourseMutation();

  const handleSelect = (option) => setSelectedOption(option);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handleCreateCourse = async () => {
    if (!inputData.courseTitle) {
      alert("Course title cannot be empty.");
      return;
    }

    const payload = {
      description: selectedOption,
      courseTitle: inputData.courseTitle,
    };

    await createCourse(payload);
    refetch();
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create a New Course
        </h2>

        {/* Course Title Input */}
        <div className="mb-6">
          <label
            htmlFor="courseTitle"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Course Title
          </label>
          <input
            type="text"
            id="courseTitle"
            name="courseTitle"
            placeholder="Enter course title"
            value={inputData.courseTitle}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            onChange={handleInput}
          />
        </div>

        {/* Dropdown Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-400">
              {selectedOption}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full mt-2 shadow-lg bg-white rounded-lg">
            <DropdownMenuLabel className="text-gray-600 font-semibold">
              Select an Option
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleSelect("Python")}>
                Python
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelect("Javascript")}>
                Javascript
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSelect("React js")}>
                React js
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Submit Button */}
        <Button
          className="w-full mt-6 py-3 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-lg hover:from-teal-600 hover:to-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
          disabled={createCourseLoading}
          onClick={handleCreateCourse}
        >
          {createCourseLoading ? (
            <span className="animate-spin">🔄 Creating...</span>
          ) : (
            "Create Course"
          )}
        </Button>
      </div>
    </div>
  );
};

export default CreateNewCourse;
