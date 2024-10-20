import apiInstance from "../interceptor/axiosInstance";

const getAllRegistrationRequests = async () => {
  const response = await apiInstance.get("registration-requests/all");
  return response.data;
};

const getRegistrationRequestsByBranch = async () => {
  const response = await apiInstance.get("registration-requests/");
  return response.data;
};

const rejectRegistrationRequest = async (id) => {
  const response = await apiInstance.delete(
    `registration-requests/${id}?action=reject`
  );
  return response.data;
};

const acceptRegistrationRequest = async (id) => {
  const response = await apiInstance.delete(
    `registration-requests/${id}?action=accept`
  );
  return response.data;
};

export default {
  getAllRegistrationRequests,
  getRegistrationRequestsByBranch,
  rejectRegistrationRequest,
  acceptRegistrationRequest,
};
