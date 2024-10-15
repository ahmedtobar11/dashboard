import { useState, useEffect } from "react";
import TableRow from "../Components/ViewAndExportGraduates/TableRow";
import Loading from "../Components/ui/Loading";
import ExportButton from "../Components/ViewAndExportGraduates/ExportButton";
import graduatesApiRequests from "../services/apiRequests/graduatesApiRequests";

function ViewAndExportGraduates() {
  const [grads, setGrads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchGrads = async () => {
    try {
      setLoading(true);
      const response = await graduatesApiRequests.getAllGraduates();
      setGrads(response?.graduates);
    } catch (error) {
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrads();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="container py-4 lg:px-8 -z-20">
      <div className="w-full my-7">
        <ExportButton grads={grads} />
      </div>
      <div className="shadow-md sm:rounded-lg">
        <table className="w-full text-sm md:text-lg  text-center">
          <thead className="text-xs md:text-lg lg:text-xl text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="md:px-3 py-3">Student Info</th>
              <th scope="col" className="md:px-3 py-3">Track & Branch</th>
              <th scope="col" className="md:px-3 py-3 hidden md:block">Education</th>
              <th scope="col" className="md:px-3 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {grads.map((grad) => (
              <TableRow
                key={grad._id}
                grad={grad}
                onExpandRow={setExpandedRow}
                isExpanded={expandedRow === grad._id}
              />
            ))}
          </tbody>
        </table>
      </div>
      {grads.length === 0 && !loading && !error && (
        <div className="text-center py-4">No graduates found.</div>
      )}
    </div>
  );
}

export default ViewAndExportGraduates;
