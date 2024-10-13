import apiInstance from "../interceptor/axiosInstance";

const getAllRegistrationRequests = async () => {
  const response = await apiInstance.get("registration-requests");
  return response.data;
};

export default {
  getAllRegistrationRequests,
};
