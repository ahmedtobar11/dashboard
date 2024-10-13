import apiInstance from "../interceptor/axiosInstance";

const getAllGraduates = async () => {
  const response = await apiInstance.get("graduates/all");
  return response.data;
};

export default {
  getAllGraduates,
};