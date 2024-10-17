import apiInstance from "../interceptor/axiosInstance";

const getChartsData = async () => {
    console.log('Fetching charts data...');

  const response = await apiInstance.get("graduates/dashboard-data");
  return response;
};


export default {
    getChartsData,
};
