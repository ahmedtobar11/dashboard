import apiInstance from "../interceptor/axiosInstance";

const login = async (adminData) => {
  const response = await apiInstance.post("auth/login", adminData);
  return response;
};

export default {
  login,
};
