/* eslint-disable no-unused-vars */
import axios from "axios";

export const loginSubmit = async (data, setIsLoading, setError) => {
console.log(data)
  try {
    setIsLoading(true);
    const response = await axios.post("/api/login", data);

  } catch (error) {
    setError(error.response?.data || "An error occurred. Please try again.");
  } finally {
    setIsLoading(false);
  }
};
