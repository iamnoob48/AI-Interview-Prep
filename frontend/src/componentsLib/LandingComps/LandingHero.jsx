import React from "react";
import image from "./image.png";
function LandingHero() {
  return (
    <>
      <div>
        <section className="flex flex-col items-center justify-center text-center mt-24 px-6 ">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            Ace Interviews With <br />
            <span className="bg-gradient-to-r from-amber-600 to-amber-300 bg-clip-text text-transparent animate-text-shine">
              AI-Powered
            </span>
            Learning
          </h1>
          <p className="mt-4 text-lg text-gray-600 max-w-xl">
            Practice smarter with AI-driven feedback and boost your chances of
            landing your dream job.
          </p>
          <div className="mt-6">
            <a
              href="#"
              className="px-6 py-3 text-lg rounded-lg bg-orange-500 text-white font-semibold shadow-md hover:bg-orange-600 transition"
            >
              Start Preparing Now
            </a>
          </div>
        </section>
      </div>

      <div className="w-full min-h-full relative z-10 mt-30">
        <div>
          <section className="flex items-center justify-center mb-36">
            <img src={image} alt="Hero Image" className="w-[80vw] rounded-lg" />
          </section>
        </div>
      </div>
    </>
  );
}

export default LandingHero;
