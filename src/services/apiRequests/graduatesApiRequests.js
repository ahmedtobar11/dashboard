import apiInstance from "../interceptor/axiosInstance";

export const getAllGraduates = async () => {
  const response = await apiInstance.get("graduates");
  return response.data;
}