import { useState, useEffect } from "react";
import TableRow from "../Components/ViewAndExportGraduates/TableRow";
import Loading from "../Components/ui/Loading";
import { requestsData } from "../../public/requestsData";
import ExportButton from "../Components/ViewAndExportGraduates/ExportButton";
function ViewAndExportGraduates() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    setData(requestsData);
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="p-4">
      <div className="w-full my-7">
        <ExportButton data={data} />
      </div>

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
