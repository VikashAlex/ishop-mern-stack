"use client";

import Lottie from "lottie-react";
import noDataAnimation from "@/../../public/animations/no-data.json";

export default function NoProductFound() {
  return (
    <div className="flex flex-col items-center justify-center h-80 text-center">
      <Lottie 
        animationData={noDataAnimation} 
        loop={true} 
        className="w-full h-full"
      />
     
    </div>
  );
}
