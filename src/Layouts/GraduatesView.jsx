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
  const [expandedRow, setExpandedRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Get initial filters from URL
  const initialFilters = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return Object.keys(INITIAL_FILTERS).reduce((acc, key) => {
      const value = params.get(key);
      return {
        ...acc,
        [key]: value ? decodeURIComponent(value) : INITIAL_FILTERS[key],
      };
    }, {});
  }, []);

  const [filters, setFilters] = useState(initialFilters);

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      }
    });

    const newSearch = params.toString();
    const currentSearch = location.search.replace(/^\?/, "");

    // Only update URL if the search params actually changed
    if (newSearch !== currentSearch) {
      navigate(`${location.pathname}?${newSearch}`, { replace: true });
    }
  }, [filters, navigate, location.pathname]);

  // Handle filter changes
  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
    setCurrentPage(1);
  }, []);

  // Handle page changes
  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage);
  }, []);

  // Reset filters
  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

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
