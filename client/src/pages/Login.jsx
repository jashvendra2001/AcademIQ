import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [signup, setsignUp] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });

  const naviagate = useNavigate();

  const [
    RegiterUser,
    {
      isLoading: isRegisterLoading,
      isSuccess: isRegisterSuccess,
      isError: isRegisterError,
      error: isRegistererror,
    },
  ] = useRegisterUserMutation();

  const [loginUser, { isLoading, isSuccess, isError, error }] =
    useLoginUserMutation();

  const handleChangeValue = (e, type) => {
    const { name, value } = e.target;

    if (type === "signup") {
      setsignUp({
        ...signup,
        [name]: value,
      });
    } else {
      setLogin({
        ...login,
        [name]: value,
      });
    }
  };

  const handleSignUp = async (type) => {
    if (type === "signup") {
      console.log(signup);
      await RegiterUser(signup);
      setsignUp({
        name: "",
        email: "",
        password: "",
      });
    } else {
      console.log(login);
      await loginUser(login);
      setLogin({
        email: "",
        password: "",
      });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      console.log("login successfully ready to go home page");
      naviagate("/");
    }
  }, [isSuccess]);
  return (
    <div className="parents w-full flex justify-center  h-full ">
      <Tabs defaultValue="Login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="SignUp">SignUp</TabsTrigger>
          <TabsTrigger value="Login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="SignUp">
          <Card>
            <CardHeader>
              <CardTitle>SignUp</CardTitle>
              <CardDescription>
                Make changes to your account here. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  name="name"
                  value={signup.name}
                  type="text"
                  onChange={(e) => handleChangeValue(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  name="email"
                  type="email"
                  value={signup.email}
                  onChange={(e) => handleChangeValue(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Password</Label>
                <Input
                  name="password"
                  type="password"
                  value={signup.password}
                  onChange={(e) => handleChangeValue(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSignUp("signup")}>
                Save changes
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="Login">
          <Card>
            <CardHeader>
              <CardTitle>Password</CardTitle>
              <CardDescription>
                Change your password here. After saving, you'll be logged out.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="current">Email</Label>
                <Input
                  id="current"
                  type="email"
                  name="email"
                  value={login.email}
                  onChange={(e) => handleChangeValue(e, "login")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="new"> password</Label>
                <Input
                  id="new"
                  type="password"
                  name="password"
                  value={login.password}
                  onChange={(e) => handleChangeValue(e, "login")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSignUp()}>Save password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
