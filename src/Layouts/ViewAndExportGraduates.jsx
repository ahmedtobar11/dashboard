import { useState, useEffect } from "react";
import TableRow from "../Components/ViewAndExportGraduates/TableRow";
import Loading from "../Components/ui/Loading";
import ExportButton from "../Components/ViewAndExportGraduates/ExportButton";
import graduatesApiRequests from "../services/apiRequests/graduatesApiRequests";
import { useAdminContext } from "../contexts/AdminContext";

function ViewAndExportGraduates() {
  const { admin } = useAdminContext();

  const [grads, setGrads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);

  const fetchGrads = async () => {
    try {
      let response;
      if (admin?.role === "super admin") {
        response = await graduatesApiRequests.getAllGraduates();
      } else if (admin?.role === "admin") {
        response = await graduatesApiRequests.getGraduatesByBranch();
      }
      setGrads(response?.graduates);
    } catch (error) {
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGrads();
  }, [admin]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="w-full my-7">
        <ExportButton grads={grads} />
      </div>
      {/* <Filters /> */}
      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Student Info</th>
              <th>Track & Branch</th>
              <th>Education</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {grads?.map((grad) => (
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
    </div>
  );
}

export default ViewAndExportGraduates;
