import apiInstance from "../interceptor/axiosInstance";

const getAllGraduates = async () => {
  const response = await apiInstance.get("graduates");
  return response.data;
};

export default {
  getAllGraduates,
};
