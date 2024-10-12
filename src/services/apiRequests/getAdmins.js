import apiInstance from "../interceptor/axiosInstance";

export const getAdmin = async () => {
  const response = await apiInstance.get("admins");
  return response.data;
};

export const deleteAdminById = async (id) => {
  const response = await apiInstance.delete(`admins/${id}`);
  return response.data;
};