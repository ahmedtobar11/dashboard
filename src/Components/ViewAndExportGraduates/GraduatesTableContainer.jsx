import { useState, useMemo } from "react";
import useGraduates from "../../hooks/useGraduates";
import Loading from "../ui/Loading";
import GraduatesTable from "./GraduatesTable";

const GraduatesTableContainer = ({
  currentPage,
  setCurrentPage,
  filters,
  itemsPerPage,
}) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const queryParams = useMemo(
    () => ({
      currentPage,
      itemsPerPage,
      filters,
    }),
    [currentPage, itemsPerPage, filters]
  );

  const { grads, loading, error, totalPages } = useGraduates(queryParams);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <Loading />;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <GraduatesTable
      grads={grads}
      loading={loading}
      expandedRow={expandedRow}
      setExpandedRow={setExpandedRow}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
    />
  );
};

export default GraduatesTableContainer;
