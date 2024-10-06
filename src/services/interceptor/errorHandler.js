const handleError = (error) => {
  if (error.response) {
    return { message: error.response.data.error || error.response.data };
  }
  if (error.error) {
    return { message: error.error };
  }
  if (error.code === "ERR_NETWORK") {
    if (!navigator.onLine) {
      return {
        message: "Network Error, please check your internet connection",
      };
    }
    return { message: "Server is Down, please try again later" };
  }
  return { message: "Something went wrong, Please try again later" };
};

export default handleError;
