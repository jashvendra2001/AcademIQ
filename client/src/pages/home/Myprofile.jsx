import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useProfileUpdateMutation,
  useUserProfileQuery,
} from "@/features/api/authApi.js";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Herocart } from "./Herocart";

const Myprofile = () => {
  const { data, error, isLoading, refetch } = useUserProfileQuery();
  const [
    ProfileUpdate,
    {
      data: dataUpdateProfile,
      error: dataProfileaError,
      isLoading: dataProfileLoading,
    },
  ] = useProfileUpdateMutation();
  const [data12, setData12] = useState({ name: "" }); // Initialize as an object
  const [file, setFile] = useState(""); // Initialize file state

  const loginUserData = useSelector((item) => item.auth.user);

  useEffect(() => {
    if (data) {
      toast.success(data?.message);
    }
  }, [data]);

  useEffect(() => {
    if (dataUpdateProfile) {
      toast.success("Data updated successfully");
      refetch();
    } else if (dataProfileaError) {
      toast.error("Profile update failed");
    }
  }, [dataUpdateProfile, dataProfileaError, refetch]);

  const handleProfileUpdate = (e) => {
    const { name, value } = e.target;
    setData12({
      ...data12,
      [name]: value,
    });
  };

  const handleChangeFile = (e) => {
    const { name } = e.target;
    setFile({
      ...file,
      [name]: e.target.files?.[0],
    });
  };

  const formData = new FormData();
  formData.append("name", data12.name); // Use data12.name instead of the whole object
  formData.append("profilePhoto", file.file);

  const handleProfileUpdateSend = () => {
    for (let [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }
    ProfileUpdate(formData);
  };
  console.log(formData);
  console.log(file, data12);

  return (
    <div className="max-w-4xl mx-auto px-4 my-10">
      <h1 className="font-bold text-2xl text-center md:text-left">PROFILE</h1>
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 my-5">
        <div className="flex flex-col items-center">
          <Avatar className="h-24 w-24 md:h-32 md:w-32 mb-4">
            <AvatarImage src={loginUserData?.photoUrl || ""} alt="@shadcn" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Name:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {data?.user?.name}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Email:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {data?.user?.email}
              </span>
            </h1>
          </div>
          <div className="mb-2">
            <h1 className="font-semibold text-gray-900 dark:text-gray-100 ">
              Role:
              <span className="font-normal text-gray-700 dark:text-gray-300 ml-2">
                {data?.user?.role}
              </span>
            </h1>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="mt-2">
                Edit Profile
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Edit Profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Name</Label>
                  <Input
                    type="text"
                    name="name"
                    value={data12.name}
                    placeholder="Name"
                    className="col-span-3"
                    onChange={handleProfileUpdate}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label>Profile Photo</Label>
                  <Input
                    type="file"
                    name="file"
                    onChange={handleChangeFile}
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleProfileUpdateSend}>Save Changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div>
        <h1 className="font-medium text-lg">Courses you're enrolled in</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 my-5">
          {/* Courses will be rendered here */}
          <Herocart />
          <Herocart />
          <Herocart />
          <Herocart />
        </div>
      </div>
    </div>
  );
};

export default Myprofile;
