import { useState, useEffect } from "react";
import graduatesApiRequests from "../services/apiRequests/graduatesApiRequests";
import { useAdminContext } from "../contexts/AdminContext";

const useGraduates = (queryParams = {}) => {
  const { admin } = useAdminContext();
  const [grads, setGrads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchGrads = async () => {
      try {
        setLoading(true);
        setError("");

        const {
          currentPage = 1,
          itemsPerPage = 12,
          filters = {},
        } = queryParams;

        const params = {
          page: currentPage,
          limit: itemsPerPage,
        };

        // Adding filters if available
        if (filters.fullName) params.fullName = filters.fullName;
        if (filters.cityOfBirth) params.cityOfBirth = filters.cityOfBirth;
        if (filters.branch) params.branch = filters.branch;
        if (filters.itiGraduationYear)
          params.itiGraduationYear = filters.itiGraduationYear;
        if (filters.preferredTeachingBranches)
          params.preferredTeachingBranches = filters.preferredTeachingBranches;
        if (filters.interestedInTeaching !== undefined)
          params.interestedInTeaching = filters.interestedInTeaching;

        let response;

        // Handling different roles for admin
        if (admin?.role === "super admin") {
          response = await graduatesApiRequests.getFilteredGradsSuperAdmin(
            params
          );
        } else if (admin?.role === "admin") {
          const queryParams = {
            page: params.page,
            limit: params.limit,
            fullName: params.fullName,
            cityOfBirth: params.cityOfBirth,
            branch: params.branch,
            itiGraduationYear: params.itiGraduationYear,
            preferredTeachingBranches: params.preferredTeachingBranches,
            interestedInTeaching: params.interestedInTeaching,
          };
          response = await graduatesApiRequests.getFilteredGradsByBranch(
            queryParams
          );
        }

        if (response && response.graduates && response.graduates.length > 0) {
          setGrads(response.graduates);
          setTotalPages(response.paginationMetaData.pagesCount);
        } else {
          setGrads([]);
          setTotalPages(1);
        }
      } catch (err) {
        setError(
          "Failed to fetch graduates: " +
            (err.message || "Something went wrong, please try again later.")
        );
        setGrads([]);
        setTotalPages(1);
      }

      setLoading(false);
    };

    fetchGrads();
  }, [queryParams, admin]);

  return { grads, loading, error, totalPages };
};

export default useGraduates;
