import React from "react";
import Button from "../Components/ui/Button";

const Forbidden = () => {
  return (
    <div className="flex flex-col py-24 px-28 lg:flex-row-reverse items-center justify-center min-h-screen bg-main-light">
      <div className="lg:w-1/2 mt-12 lg:mt-0">
        <div className="relative ">
          <div className="absolute inset-0 bg-main rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <img
            src="403 Error Forbidden-rafiki.svg"
            alt="Access Denied"
            className="relative z-10 w-full max-w-lg mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
      <div className="text-center lg:text-left lg:w-1/2 lg:pr-12 space-y-16">
        <p className="mt-4 text-2xl lg:text-8xl font-bold text-main">
          Access Denied!
        </p>
        <p className="mt-4 text-xl max-w-md mx-auto lg:mx-0">
          You do not have the necessary permissions to view this page.
        </p>
        <div className="mt-8 space-y-4 lg:space-y-0 lg:space-x-4">
          <Button
            to={"/"}
            text="Back to Dashboard"
            variant="fill"
            size="lg"
            className="w-full lg:w-auto"
          />
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
