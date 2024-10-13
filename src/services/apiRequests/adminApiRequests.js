import apiInstance from "../interceptor/axiosInstance";

export const createAdmin = async (adminData) => {
  const response = await apiInstance.post("admins", adminData);
  return response.data;
};

export const getAllAdmins = async () => {
  const response = await apiInstance.get("admins");
  return response.data;
};

export const deleteAdminById = async (id) => {
  const response = await apiInstance.delete(`admins/${id}`);
  return response.data;
};

export default {
  getAllAdmins,
  deleteAdminById,
  createAdmin,
};
