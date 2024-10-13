import { useState, useEffect } from "react";
import TableRow from "../Components/ViewAndExportGraduates/TableRow";
import Loading from "../Components/ui/Loading";
import ExportButton from "../Components/ViewAndExportGraduates/ExportButton";
import { graduatesData } from '../../public/requestsData';
// import { getAllGraduates } from "../services/apiRequests/graduatesApiRequests";

function ViewAndExportGraduates() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);  
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
     fetchGrads();
  }, []);

  const  fetchGrads = async () => {
    try {
      setLoading(true);
      // const response = await getAllGraduates();
      // setData(response?.graduates || []);  
      setData(graduatesData);  
      // console.log(response.graduates);  
    } catch (error) {
      setError(error.message || "Something went wrong, Please try again later");
    } finally {
      setLoading(false);  
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div className="error-message">{error}</div>; }

  return (
    <div className="p-4">
      <div className="w-full my-7">
        <ExportButton data={data} />
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
            {data.map((row) => (
              <TableRow
                key={row.id}
                row={row}
                onExpandRow={setExpandedRow}
                isExpanded={expandedRow === row.id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ViewAndExportGraduates;
