import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, Links, Navigate, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserLogoutMutation } from "@/features/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../../app/authSlice";

export function Dropdown() {
  const [UserLogout, { isLoading, isSuccess, iserror }] =
    useUserLogoutMutation();
  const dispatch = useDispatch();
  const userData = useSelector((item) => item.auth.user);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await UserLogout();

    dispatch(userLogOut());
    navigate("/Login");
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link to="MyLearning">
            <DropdownMenuItem className="cursor-pointer">
              MyLearning
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem className="cursor-pointer">
            <Link to="Myprofile">Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={handleLogout}>
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {userData.role === "Admin" ? (
          <DropdownMenuItem>Dashboard</DropdownMenuItem>
        ) : (
          " Courses"
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
