import apiInstance from "../interceptor/axiosInstance"; 

const getGraduates = async () => {
  const response = await apiInstance.get("graduates");
  return response.data;  
};

export default {
  getGraduates,
};