import apiInstance from "../interceptor/axiosInstance";

const getAllTracks = async () => {
  const response = await apiInstance.get("tracks");
  return response.data;
};

export default {
  getAllTracks,
};
