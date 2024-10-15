import authApiRequests from "./apiRequests/authApiRequests";

const login = async (data, setAdmin) => {
  const response = await authApiRequests.login(data);

  localStorage.setItem("accessToken", response.data.accessToken);
  localStorage.setItem("admin", JSON.stringify(response.data.admin));

  setAdmin(response.admin);
};

const logout = async (setAdmin) => {
  await authApiRequests.logout();

  localStorage.removeItem("accessToken");
  localStorage.removeItem("admin");

  setAdmin(null);
};

export default {
  login,
  logout,
};
