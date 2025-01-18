import React, { useState } from "react";
import axios from "axios"; // ✅ Import Axios
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

import {
  useCourseLectureUpdateMutation,
  useCreateLectureMutation,
  useDeleteCourseMutation,
} from "@/features/api/courseApi";
import { useParams } from "react-router-dom";

const LectureTab = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [isSuccess, setisSuccess] = useState(false);

  const [isFree, setIsfree] = useState(true);
  const [
    courseLectureUpdate,
    { isSuccess: lectureUpdate, isloading, isError },
  ] = useCourseLectureUpdateMutation();

  const [deleteCourse, { isLoading }] = useDeleteCourseMutation();

  const params = useParams();
  const courseId = params.id;
  const paramscourseID = useParams();
  const courseLecture = paramscourseID.courseId;

  const handleChangeVideo = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/course/videoUpload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            );
            setUploadProgress(percent); // ✅ Update progress state
          },
        }
      );
      setData(response);
      if (response) {
        setisSuccess(false);
        console.log(data);
      }

      console.log("Upload Successful:", response.data);
      alert("Video uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      alert("Video upload failed!");
    }
  };
  const handleFress = () => {
    setIsfree(false);
  };

  const handleUploadLecture = async () => {
    console.log(data?.data?.responseVideo?.secure_url);
    const formData = new FormData();

    formData.append("lectureTitle", title);
    formData.append("videoUrl", data?.data?.responseVideo?.secure_url);
    formData.append("isPreviewFree", isFree);
    console.log([...formData.entries()]);

    const payload = {
      lectureTitle: title,
      videoUrl: data?.data?.responseVideo?.secure_url,
      isPreviewFree: isFree,
    };

    await courseLectureUpdate({ courseId, payload });
  };

  const handleDeleteLecture = () => {
    console.log(courseId);
    deleteCourse(courseId);
  };
  return (
    <div>
      <Card className="w-full">
        <CardHeader className="flex justify-between">
          <div>
            <CardTitle>Edit Lecture</CardTitle>
            <CardDescription>
              Make changes and click save when done.
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="destructive" onClick={handleDeleteLecture}>
              Remove Lecture
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div>
            <Label>Title</Label>
            <Input
              type="text"
              placeholder="Ex. Introduction to Javascript"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="my-5">
            <Label>
              Video <span className="text-red-500">*</span>
            </Label>
            <Input
              type="file"
              accept="video/*"
              className="w-fit"
              onChange={handleChangeVideo}
            />
          </div>
          <div className="flex items-center space-x-2 my-5">
            <Switch onClick={handleFress} />
            <Label htmlFor="airplane-mode">Is this video FREE</Label>
          </div>

          <div className="mt-4">
            <Button onClick={handleUploadLecture} disabled={isSuccess}>
              Update Lecture
            </Button>
          </div>

          {/* ✅ Progress Bar for Upload */}
          {uploadProgress > 0 && (
            <>
              <progress value={uploadProgress} max="100"></progress>
              <p>{uploadProgress} %uploaded</p>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default LectureTab;
