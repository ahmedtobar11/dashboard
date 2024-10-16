import apiInstance from "../interceptor/axiosInstance";

const getAllGraduates = async () => {
  const response = await apiInstance.get("graduates/all");
  return response.data;
};

const getGraduatesByBranch = async () => {
  const response = await apiInstance.get("graduates/");
  return response.data;
};

export default {
  getAllGraduates,
  getGraduatesByBranch,
};
