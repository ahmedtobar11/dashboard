import { useState, useEffect } from "react";
import graduatesApiRequests from "../services/apiRequests/graduatesApiRequests";
import { useAdminContext } from "../contexts/AdminContext";

const useGraduates = (queryParams = {}) => {
  const { admin } = useAdminContext();
  const [grads, setGrads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  // Function to fetch all graduates for export
  const fetchAllGraduatesForExport = async (filters = {}) => {
    try {
      const params = {
        ...filters,
        limit: 10000, // Large number to fetch all
      };

      let response;

      if (admin?.role === "super admin") {
        response = await graduatesApiRequests.getFilteredGradsSuperAdmin(
          params
        );
      } else if (admin?.role === "admin") {
        response = await graduatesApiRequests.getFilteredGradsByBranch(params);
      }

      if (response && response.graduates) {
        return response.graduates;
      } else {
        return [];
      }
    } catch (err) {
      setError(err.message);
    }
  };

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
          ...filters,
        };

        let response;

        if (admin?.role === "super admin") {
          response = await graduatesApiRequests.getFilteredGradsSuperAdmin(
            params
          );
        } else if (admin?.role === "admin") {
          response = await graduatesApiRequests.getFilteredGradsByBranch(
            params
          );
        }

        if (
          response &&
          response.graduates &&
          response.paginationMetaData.pagesCount !== 0
        ) {
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

  return { grads, loading, error, totalPages, fetchAllGraduatesForExport };
};

export default useGraduates;
