import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";
import { LuUser } from "react-icons/lu";

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleClick = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  return (
    <div className="bg-gradient-to-br from-amber-200 to-white border-b-1 shadow-xl">
      <div className="flex justify-between p-6">
        <h1 className="text-2xl font-bold">
          Interview <span className="text-amber-500">Prep AI</span>
        </h1>

        <div className="flex gap-20">
          <button className="font-mono hover:text-gray-500 hover:cursor-pointer">
            Home
          </button>
          <button className="font-mono hover:text-gray-500 hover:cursor-pointer">
            Services
          </button>
          <button className="font-mono hover:text-gray-500 hover: cursor-pointer">
            About Us
          </button>
        </div>

        {!token ? (
          <div className="flex gap-5">
            <Button
              className="bg-amber-300 hover:cursor-pointer text-black"
              onClick={() => navigate("/login")}
            >
              Login
            </Button>
            <Button
              className="bg-gray-300 hover:cursor-pointer text-black"
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        ) : (
          <div>
            <Button onClick={handleClick}>
              <LuUser />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar;
