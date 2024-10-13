import apiInstance from "../interceptor/axiosInstance";

const getAllBranches = async () => {
  const response = await apiInstance.get("branches");
  return response.data.branches;
};

export default {
  getAllBranches,
};
