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

  // Separate state for text search
  const [searchText, setSearchText] = useState("");
  const [lastSearchText, setLastSearchText] = useState("");

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
    const [filterKey, filterValue] = Object.entries(newFilters)[0];

    if (filterKey === "fullName") {
      setSearchText(filterValue);
    } else {
      setFilters((prev) => ({ ...prev, ...newFilters }));
      setCurrentPage(1);
    }
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
    setSearchText("");
    setCurrentPage(1);
  }, []);

  const handleApplySearch = useCallback(() => {
    if (searchText.trim() === "" || searchText === lastSearchText) {
      return;
    }
    setFilters((prev) => ({ ...prev, fullName: searchText }));
    setLastSearchText(searchText);
    setCurrentPage(1);
  }, [searchText, lastSearchText]);

  const filterPanelProps = useMemo(
    () => ({
      filters: {
        ...filters,
        fullName: searchText,
      },
      branches,
      onFilterChange: handleFilterChange,
      onReset: handleResetFilters,
      onApplySearch: handleApplySearch,
    }),
    [
      filters,
      searchText,
      branches,
      handleFilterChange,
      handleResetFilters,
      handleApplySearch,
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
