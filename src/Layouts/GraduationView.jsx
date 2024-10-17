import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBranchesAndTracks } from "../contexts/BranchesAndTracksContext";
import GraduatesFilterPanel from "../Components/ViewAndExportGraduates/GraduatesFilterPanel";
import GraduatesTable from "../Components/ViewAndExportGraduates/GraduatesTable";
import useGraduates from "../hooks/useGraduates";

const GRADUATES_PER_PAGE = 6;

const INITIAL_FILTERS = {
  fullName: "",
  cityOfBirth: "",
  branch: "",
  itiGraduationYear: "",
  preferredTeachingBranches: "",
  interestedInTeaching: "",
};

export const GraduatesView = () => {
  const { branches } = useBranchesAndTracks();
  const navigate = useNavigate();
  const location = useLocation();

  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRow, setExpandedRow] = useState(null);

  // Initialize filters from URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const newFilters = { ...INITIAL_FILTERS };

    Object.keys(INITIAL_FILTERS).forEach((key) => {
      const value = params.get(key);
      if (value) {
        newFilters[key] = decodeURIComponent(value);
      }
    });

    setFilters(newFilters);
  }, [location.search]);

  // Update URL with current filters
  const updateURL = useCallback(
    (newFilters) => {
      const params = new URLSearchParams();
      Object.keys(newFilters).forEach((key) => {
        if (newFilters[key]) {
          params.set(key, newFilters[key]);
        }
      });
      navigate(`${location.pathname}?${params.toString()}`, { replace: true });
    },
    [navigate, location.pathname]
  );

  // Handle filter changes
  const handleFilterChange = useCallback(
    (newFilters) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);
      updateURL(updatedFilters);
      setCurrentPage(1);
    },
    [updateURL, filters]
  );

  // Handle page changes
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  // Reset filters
  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    updateURL(INITIAL_FILTERS);
    setCurrentPage(1);
  }, [updateURL]);

  // Memoized query parameters
  const queryParams = useMemo(
    () => ({
      currentPage,
      itemsPerPage: GRADUATES_PER_PAGE,
      filters,
    }),
    [currentPage, filters]
  );

  // Fetch graduates data
  const { grads, loading, error, totalPages } = useGraduates(queryParams);

  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="container mx-auto py-4 lg:px-8">
      <div className="flex flex-col gap-6">
        <GraduatesFilterPanel
          filters={filters}
          branches={branches}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
        <GraduatesTable
          grads={grads}
          loading={loading}
          expandedRow={expandedRow}
          setExpandedRow={setExpandedRow}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default GraduatesView;
