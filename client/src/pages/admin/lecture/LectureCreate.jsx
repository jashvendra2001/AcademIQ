import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCreateLectureMutation,
  useGetCourseLectureByIdQuery,
} from "@/features/api/courseApi";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Edit, Loader2 } from "lucide-react";

import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LectureCreate = () => {
  const params = useParams();
  const courseId = params.id;
  const [lectureTitle, setLectureTitle] = useState("");
  const navigate = useNavigate();
  const [CreateLecture, { isLoading, isSuccess, isError }] =
    useCreateLectureMutation();
  const {
    data,
    refetch,
    isSuccess: courseLecture,
  } = useGetCourseLectureByIdQuery(courseId);
  const lecturs = data?.courseLectureData?.lectures || [];
  console.log(lecturs);

  const handleChnage = (e) => {
    setLectureTitle(e.target.value);
  };
  console.log(lectureTitle);

  const createLectureHandler = async () => {
    if (lectureTitle.length > 0) {
      await CreateLecture({ lectureTitle, courseId });
      refetch();
      setLectureTitle("");
    }
  };

  const handleEditLecture = (lectureId) => {
    navigate(`/Admin/Admin/EditLecture/${lectureId}/${courseId}`);
  };

  return (
    <div>
      <div className="flex-1 mx-10">
        <div className="mb-4">
          <h1 className="font-bold text-xl">
            Let's add lectures, add some basic details for your new lecture
          </h1>
          <p className="text-sm">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus,
            laborum!
          </p>
        </div>
        <div className="space-y-4">
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              value={lectureTitle}
              onChange={handleChnage}
              placeholder="Your Title Name"
            />
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/admin/course/${courseId}`)}
            >
              Back to course
            </Button>
            <Button disabled={isLoading} onClick={createLectureHandler}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Create lecture"
              )}
            </Button>
          </div>
          <div className="mt-10  ">
            {lecturs?.length === 0 ? (
              <p>No lecture provided</p>
            ) : (
              lecturs.map((item) => {
                return (
                  <div className="mb-1 flex bg-slate-400 p-2 justify-between ">
                    <h1 className="item  font-bold ">{item.lectureTitle}</h1>
                    <Edit
                      className="cursor-pointer"
                      onClick={() => handleEditLecture(item._id)}
                    />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LectureCreate;
