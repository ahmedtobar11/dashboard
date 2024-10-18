import Button from "../Components/ui/Button";

const Forbidden = () => {
  return (
    <div className="flex flex-col lg:flex-row-reverse items-center justify-center min-h-screen bg-main-light p-4 sm:p-8 lg:p-16">
      <div className="w-3/4 h-1/4 lg:w-1/2 max-w-2xl mx-auto lg:mx-0 mb-0">
        <div className="relative aspect-square">
          <div className="absolute inset-0 bg-main rounded-full filter blur-3xl opacity-40 animate-pulse"></div>
          <img
            src="403 Error Forbidden-rafiki.svg"
            alt="Access Denied"
            className="relative z-10 w-full h-full object-contain rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105"
          />
        </div>
      </div>
      <div className="w-full lg:w-1/2 text-center lg:text-left lg:pr-12 space-y-6 lg:space-y-10">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-extrabold text-main tracking-wide">
          Access Denied!
        </h1>
        <p className="text-base sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0 text-gray-700">
          You don't have permission to view this page. Please contact your administrator if you believe this is a mistake.
        </p>
        <div className="pt-4">
          <Button
            to="/"
            text="Back to Dashboard"
            variant="fill"
            size="lg"
            className="w-full sm:w-auto bg-accent text-white hover:bg-accent-dark transition-colors duration-300 shadow-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
