import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";
import tracksApiRequest from "../services/apiRequests/tracksApiRequest";
import branchApiRequest from "../services/apiRequests/branchApiRequest";

const BranchesAndTracksContext = createContext();

export const BranchesAndTracksProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);
  const [branches, setBranches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [tracksData, branchesData] = await Promise.all([
        tracksApiRequest.getAllTracks(),
        branchApiRequest.getAllBranches(),
      ]);
      setTracks(tracksData.tracks);
      setBranches(branchesData);
      console.log(tracksData);
      console.log(branchesData);
    } catch (err) {
      setError("Failed to fetch education data");
      console.error("Error fetching education data:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const value = {
    tracks,
    branches,
    isLoading,
    error,
    refetchData: fetchData,
  };

  return (
    <BranchesAndTracksContext.Provider value={value}>
      {children}
    </BranchesAndTracksContext.Provider>
  );
};

export const useBranchesAndTracks = () => useContext(BranchesAndTracksContext);
