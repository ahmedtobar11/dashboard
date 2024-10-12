
import apiInstance from "../interceptor/axiosInstance";

const createAdmin = async (adminData) => {

    const response = await apiInstance.post("admins", adminData);
    return response.data;

};

export { createAdmin };
