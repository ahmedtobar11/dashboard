import apiInstance from "../interceptor/axiosInstance";
const fetchTracksData = async () => {
  const response = await apiInstance.get("tracks");
  const trackData = await response.data.tracks;
  return trackData;
};
// const fetchBranchesData = async () => {
//   const response = await apiInstance.get("branch");
//   const branchData = await response.data.branch;
//   return branchData;
// };
// const fetchUsersData = async () => {
//   const response = await apiInstance.get("users");
//   const usersData = await response.data.users;
//   return usersData;
// };

export default {
  fetchTracksData,
  // fetchBranchesData,
  // fetchUsersData,
};
