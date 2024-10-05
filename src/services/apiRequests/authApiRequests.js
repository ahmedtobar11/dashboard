import axios from "axios";

const login = async (adminData) => {
  const response = await axios.post(
    "http://localhost:8080/api/v1/login",
    adminData
  );
  return response;
};

export default {
  login,
};
