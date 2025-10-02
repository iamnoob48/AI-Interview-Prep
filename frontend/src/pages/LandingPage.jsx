import React from "react";
import NavBar from "../componentsLib/LandingComps/NavBar";
import LandingHero from "../componentsLib/LandingComps/LandingHero";
import Features from "../componentsLib/LandingComps/Features";

function LandingPage() {
  return (
    <div className="">
      <NavBar />
      <LandingHero />
      <Features />
    </div>
  );
}

export default LandingPage;
