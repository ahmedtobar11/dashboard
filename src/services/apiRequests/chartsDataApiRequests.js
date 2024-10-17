import apiInstance from "../interceptor/axiosInstance";

const getChartsData = async () => {
  const response = await apiInstance.get("graduates/dashboard-data");
  return response;
};

export default {
  getChartsData,
};
