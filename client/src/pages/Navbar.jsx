import { FaChild } from "react-icons/fa";
import { Dropdown } from "../pages/Dropdown";
import { Button } from "@/components/ui/button";
import { MobileMenu } from "./MobileMenu";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [user, setUser] = useState(false);
  const userData = useSelector((item) => item.auth.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (userData?.email) {
      setUser(true);
    } else {
      setUser(false);
    }
  }, [userData?.email]);

  const handleLogin = () => {
    navigate("/Login");
  };
  return (
    <>
      <div className="main-nav w-full bg-gradient-to-r from-blue-500 to-indigo-600 py-4 hidden md:block shadow-lg py-2">
        <div className="nav max-w-7xl mx-auto text-white flex justify-between items-center">
          <div className="logo flex gap-1 items-center">
            <FaChild className="text-3xl" />
            <Link to="/">
              <h1 className="font-bold text-2xl tracking-wide">AcademIQ</h1>
            </Link>
          </div>
          <div className="rightNav flex justify-between items-center gap-4">
            <div className="menu text-lg">Explore</div>
            {user ? (
              <Dropdown />
            ) : (
              <div className="flex gap-4 text-lg">
                <Button
                  className="p-2 bg-slate-700 hover:bg-slate-800 rounded-md"
                  onClick={handleLogin}
                >
                  Login
                </Button>
                <Button className="p-2 bg-white text-black rounded-md hover:bg-gray-100 shadow-md">
                  Signup
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="block md:hidden">
        <MobileMenu />
      </div>
    </>
  );
}

export default Navbar;
