import { HoverEffect } from "@/components/ui/card-hover-effect";
import React from "react";

function Features() {
  const features = [
    {
      title: "Tailored Just For You",
      description:
        "Personalized learning paths adapt to your strengths and focus on areas where you need the most improvement.",
    },
    {
      title: "Learn at your own pace",
      description:
        "Flexible modules let you study anytime, anywhere—progress at a speed that works best for you.",
    },
    {
      title: "Capture your insights",
      description:
        "Take quick notes during practice sessions and track key learnings so nothing slips away.",
    },
    {
      title: "Understand the 'Why' behind Answers",
      description:
        "Go beyond memorization with AI explanations that break down reasoning and logic step by step.",
    },
    {
      title: "Save, Organize and Revisit",
      description:
        "Bookmark questions, build collections, and revisit your progress to reinforce long-term learning.",
    },
  ];
  return (
    <div>
      <h1 className="text-2xl font-extrabold text-center">
        Feature that make you shine
      </h1>
      <div className="max-w-9xl mx-auto px-8 ">
        <HoverEffect items={features} />
      </div>
    </div>
  );
}

export default Features;
