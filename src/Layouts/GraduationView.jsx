import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useBranchesAndTracks } from "../contexts/BranchesAndTracksContext";
import GraduatesFilterPanel from "../Components/ViewAndExportGraduates/GraduatesFilterPanel";
import GraduatesTableContainer from "../Components/ViewAndExportGraduates/GraduatesTableContainer";

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
  }, [location.search]);

  const [filters, setFilters] = useState(initialFilters);
  const [unappliedFilters, setUnappliedFilters] = useState(initialFilters); // New state

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

    if (newSearch !== currentSearch) {
      navigate(`${location.pathname}?${newSearch}`, { replace: true });
    }
  }, [filters, navigate, location.pathname, location.search]);

  const handleFilterChange = useCallback((newFilters) => {
    setUnappliedFilters((prev) => ({ ...prev, ...newFilters }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setUnappliedFilters(INITIAL_FILTERS);
    setCurrentPage(1);
  }, []);

  const handleApplyFilters = useCallback(() => {
    setFilters(unappliedFilters);
    setCurrentPage(1);
  }, [unappliedFilters]);

  const filterPanelProps = useMemo(
    () => ({
      filters: unappliedFilters, // Use unappliedFilters instead of filters
      branches,
      onFilterChange: handleFilterChange,
      onReset: handleResetFilters,
      onApply: handleApplyFilters, // Pass the apply handler
    }),
    [
      unappliedFilters,
      branches,
      handleFilterChange,
      handleResetFilters,
      handleApplyFilters,
    ]
  );

  const tableContainerProps = useMemo(
    () => ({
      currentPage,
      setCurrentPage,
      filters,
      itemsPerPage: GRADUATES_PER_PAGE,
    }),
    [currentPage, filters]
  );

  return (
    <div className="container mx-auto py-4 lg:px-8 -z-20">
      <div className="flex flex-col gap-6">
        <GraduatesFilterPanel {...filterPanelProps} />
        <GraduatesTableContainer {...tableContainerProps} />
      </div>
    </div>
  );
};

export default GraduatesView;
