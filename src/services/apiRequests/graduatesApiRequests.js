import apiInstance from "../interceptor/axiosInstance";

const getFilteredGradsSuperAdmin = async (queryParams = "") => {
  const response = await apiInstance.get("graduates/all", {
    params: queryParams,
  });
  return response.data;
};

const getFilteredGradsByBranch = async () => {
  const response = await apiInstance.get("graduates/");
  return response.data;
};

export default {
  getFilteredGradsSuperAdmin,
  getFilteredGradsByBranch,
};
