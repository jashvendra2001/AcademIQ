import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button } from "./components/ui/button";
import Login from "./pages/login";
import Navbar from "./pages/Navbar";
import Footer from "./pages/Footer";
import { Outlet } from "react-router-dom";
import Home from "./pages/home/Home";

function App() {
  return (
    <>
      <Navbar />

      <Outlet />

      <Footer />
    </>
  );
}

export default App;
