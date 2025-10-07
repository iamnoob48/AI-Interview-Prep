import React from "react";
import NavBar from "../componentsLib/LandingComps/NavBar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  if (!token) {
    navigate("/login");
    return;
  }
  return (
    <div>
      <div>
        <NavBar />
      </div>
    </div>
  );
}

export default Dashboard;
