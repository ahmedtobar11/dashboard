import graduatesApiRequest from "./apiRequests/graduatesApiRequest";

export const handleTracks = async () => {
  try {
    const tracks = await graduatesApiRequest.fetchTracksData();
    return tracks;
  } catch (err) {
    console.log(err);
  }
};
// export const handleBranches = async () => {
//   try {
//     const branches = await graduatesApiRequest.fetchBranchesData();
//     return branches;
//   } catch (err) {
//     console.log(err);
//   }
// };
