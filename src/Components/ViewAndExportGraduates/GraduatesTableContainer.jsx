import { useState, useMemo, useEffect } from "react";
import useGraduates from "../../hooks/useGraduates";
import Loading from "../ui/Loading";
import GraduatesTable from "./GraduatesTable";
import { useToast, TOAST_TYPES } from "../../hooks/useToast";
import Error from "../ui/Error";

const GraduatesTableContainer = ({
  currentPage,
  setCurrentPage,
  filters,
  itemsPerPage,
}) => {
  const [expandedRow, setExpandedRow] = useState(null);
  const { showToast, ToastContainer } = useToast();

  const queryParams = useMemo(
    () => ({
      currentPage,
      itemsPerPage,
      filters,
    }),
    [currentPage, itemsPerPage, filters]
  );

  const { grads, loading, error, totalPages, fetchAllGraduatesForExport } =
    useGraduates(queryParams);

  useEffect(() => {
    if (error) {
      showToast(error, TOAST_TYPES.ERROR);
    }
  }, [error, showToast]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) return <Loading />;
  if (error)
    return (
      <>
        <Error message={error}></Error>
        <ToastContainer />
      </>
    );

  return (
    <GraduatesTable
      grads={grads}
      loading={loading}
      expandedRow={expandedRow}
      setExpandedRow={setExpandedRow}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={handlePageChange}
      fetchAllGraduatesForExport={fetchAllGraduatesForExport}
      filters={filters}
    />
  );
};

export default GraduatesTableContainer;
