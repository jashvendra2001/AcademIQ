import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import dynamic from "next/dynamic";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  useCourseDataUpdateMutation,
  useGetDatabyIdQuery,
} from "@/features/api/courseApi";
import toast from "react-hot-toast";

const CourseEditpage = () => {
  const [courseDataUpdate, { isSuccess, isLoading, isError }] =
    useCourseDataUpdateMutation();
  const params = useParams();
  const courseId = params.id;

  const navigate = useNavigate();
  const { data } = useGetDatabyIdQuery(courseId);
  console.log(data);
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectCategory = (value) => {
    setInput({
      ...input,
      category: value,
    });
  };

  const selectCategoryLevel = (value) => {
    setInput({
      ...input,
      courseLevel: value,
    });
  };

  const handleChange = (value) => {
    setInput({ ...input, description: value });
  };

  const selectThumbnail = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
    }
  };

  const handleCLick = async () => {
    const formData = new FormData();
    formData.append("courseTitle", input.courseTitle);
    formData.append("subTitle", input.subTitle);
    formData.append("description", input.description);
    formData.append("category", input.category);
    formData.append("courseLevel", input.courseLevel);
    formData.append("coursePrice", input.coursePrice);

    // Append the file (thumbnail) if selected
    if (input.courseThumbnail) {
      formData.append("courseThumbnail", input.courseThumbnail);
    }

    try {
      await courseDataUpdate({ formData, courseId }); // Assuming the mutation expects these
      console.log("Course updated successfully!");
    } catch (error) {
      console.log("Error while updating course: ", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(isSuccess);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      setInput({
        ...input, // Spread the current state before adding the new properties
        courseTitle: data?.courseByID?.[0]?.courseTitle,
        subTitle: data?.courseByID?.[0]?.subTitle,
        description: data?.courseByID?.[0]?.description,
        category: data?.courseByID?.[0]?.category,
        courseLevel: data?.courseByID?.[0]?.courseLevel,
        coursePrice: data?.courseByID?.[0]?.coursePrice,
        courseThumbnail: data?.courseByID?.[0]?.courseThumbnail,
      });
    }
  }, [data]);

  const handleLecturePage = () => {
    navigate(`/Admin/Admin/lectureCourse/${courseId}`);
  };

  return (
    <div className="w-full pt-3">
      <div className="editpageSection1 flex justify-between ">
        <h2 className="font-bold">Add detail information regards courses </h2>
        <Button varient="underline" onClick={handleLecturePage}>
          Go to lecture page
        </Button>
      </div>

      <div className="main w-full mt-5  border p-3">
        <div className="upperLayerLeft flex justify-between ">
          <div className="left  leading-normal ">
            <p className="font-bold">basic Information</p>
            <p>Make changes to your course here </p>
          </div>
          <div className="publush flex gap-2  ">
            <Button varient="underline">Publish</Button>
            <Button>Remove Courses</Button>
          </div>
        </div>
        <div className="textGettingSection mt-5">
          <div className="title">
            <p className="font-bold">Title</p>
            <input
              type="text"
              className="w-full p-2 border-2 "
              placeholder="Title"
              value={input.courseTitle}
              name="courseTitle"
              onChange={handleInputChange}
            />
          </div>
          <div className="Sub-title mt-3">
            <p className="font-bold">SubTitle</p>
            <input
              type="text"
              className="w-full p-2 border-2"
              placeholder="Sub-Title"
              value={input.subTitle}
              name="subTitle"
              onChange={handleInputChange}
            />
          </div>
          <div className="Description mt-3">
            <p className="font-bold">Description</p>
            <ReactQuill
              theme="snow"
              value={input.description}
              onChange={handleChange}
            />
          </div>
          <div className="selectMenu flex gap-3 mt-3">
            <div className="categories">
              <Label className="font-bold">Categories</Label>
              <Select
                onValueChange={selectCategory}
                defaultValue={input.category}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Categories</SelectLabel>
                    <SelectItem value="Nextjs">Next.js</SelectItem>
                    <SelectItem value="React">React</SelectItem>
                    <SelectItem value="Vue">Vue</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="courseLevel">
              <Label className="font-bold">Course Level</Label>
              <Select
                onValueChange={selectCategoryLevel}
                defaultValue={input.courseLevel}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Levels</SelectLabel>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced123</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="price">
              <Label>Price (INR)</Label>
              <Input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={handleInputChange}
                placeholder="199"
                className="w-fit"
              />
            </div>
          </div>
          <div className="mt-3">
            <Label className="font-bold">Course Thumbnail</Label>
            <Input
              type="file"
              accept="image/*"
              className="w-fit"
              onChange={selectThumbnail}
            />
          </div>
          <div className="btn mt-5">
            <Button onClick={handleCLick} disable={isLoading}>
              {isLoading ? "loading..." : "UpdateCourse"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseEditpage;
