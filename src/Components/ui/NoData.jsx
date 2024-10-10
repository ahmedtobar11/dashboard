import Button from "./Button";
import Nodata from "../../../public/Nodata.svg";

function NoData({ title, description, buttonText, buttonTo }) {
  return (
    <div
      className="flex flex-col lg:flex-row items-center justify-center min-h-screen bg-main-light  px-20"
    >
      <div className="text-center lg:text-left lg:w-1/2 lg:pr-12 space-y-20">
        <h1 className="text-8xl font-extrabold text-transparent bg-clip-text bg-main ">
          {title}
        </h1>
        <p className="mt-4 text-2xl lg:text-4xl font-bold text-gray-800 dark:text-text-dark">
          {description}
        </p>
        <div className="mt-8 space-y-4 lg:space-y-0 lg:space-x-4">
          <Button
            to={buttonTo}
            text={buttonText}
            variant="fill"
            size="lg"
            className="w-full lg:w-auto"
          />
        </div>
      </div>
      <div className="lg:w-1/2 mt-12 lg:mt-0 hidden lg:block ">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-main to-main-light  rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <img
            src={Nodata}
            alt=""
            className="relative z-10 w-full max-w-lg mx-auto rounded-lg shadow-2xl transform hover:scale-105 transition-transform duration-300"
          />
        </div>
      </div>
    </div>
  );
}

export default NoData;
