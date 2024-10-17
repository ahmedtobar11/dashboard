import apiInstance from "../interceptor/axiosInstance";

const getFilteredGradsSuperAdmin = async (queryParams = "") => {
  const response = await apiInstance.get("graduates/all", {
    params: queryParams,
  });
  return response.data;
};

const getFilteredGradsByBranch = async (queryParams = "") => {
  const response = await apiInstance.get("graduates/", {
    params: queryParams,
  });
  return response.data;
};

export default {
  getFilteredGradsSuperAdmin,
  getFilteredGradsByBranch,
};
